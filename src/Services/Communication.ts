//@ts-ignore
import { bytesToString } from 'convert-string'
import { BluetoothDriver } from '@/Drivers'
import { store } from '@/Store'
import {
  SERVICES,
  CHARACTERISTICS,
  LED_COLORS,
  Protocol,
  TREATMENT_STATUS,
  GraphData,
  Parameters,
  Channel,
  EQUIPMENT_NUMBER_OF_CHANNELS,
  COMMUNICATION_COMMANDS_DEBOUNCE,
  MAXIMUM_INTENSITY,
} from '@/Types'
import { clearDevice, updateTreatment, updateAppStatus, setConnectionStatus } from '@/Store/Slices'
import { convertBytesToNumber, formatMilisecondsToStringClock } from '@/Utils'
import { Log } from '@/Services'

let equipmentPeripheralId: string | null = store.getState().device.bluetoothAddress ?? null

const { bleEmitter } = BluetoothDriver

const initialize = async () => {
  return BluetoothDriver.init()
}

const remove = async () => {
  return BluetoothDriver.remove()
}

const connectToDevice = async (peripheralId: string) => {
  await BluetoothDriver.connectToDevice(peripheralId)

  const numberOfChannels = await BluetoothDriver.readFromDevice(
    peripheralId,
    SERVICES.INFORMATION,
    CHARACTERISTICS.INFORMATION.NUMBER_OF_CHANNELS
  )

  const manufacturer = await BluetoothDriver.readFromDevice(
    peripheralId,
    SERVICES.INFORMATION,
    CHARACTERISTICS.INFORMATION.MANUFACTURER
  )

  // const firmwareVersion = await BluetoothDriver.readFromDevice(
  //   peripheralId,
  //   SERVICES.INFORMATION,
  //   CHARACTERISTICS.INFORMATION.FIRMWARE_VERSION
  // )

  // const hardwareVersion = await BluetoothDriver.readFromDevice(
  //   peripheralId,
  //   SERVICES.INFORMATION,
  //   CHARACTERISTICS.INFORMATION.HARDWARE_VERSION
  // )

  // const serial = await BluetoothDriver.readFromDevice(
  //   peripheralId,
  //   SERVICES.INFORMATION,
  //   CHARACTERISTICS.INFORMATION.SERIAL
  // )

  equipmentPeripheralId = peripheralId

  await BluetoothDriver.addNotifyEventSubscription()

  // seta LED verde
  await lightLed('green')

  return {
    bluetoothAddress: peripheralId,
    numberOfChannels: EQUIPMENT_NUMBER_OF_CHANNELS[convertBytesToNumber(numberOfChannels)],
    manufacturer: bytesToString(manufacturer),

    firmwareVersion: '',
    hardwareVersion: '',
    serial: '',

    /* Descomentar abaixo quando for implementado no FW */
    // firmwareVersion: bytesToString(firmwareVersion),
    // hardwareVersion: bytesToString(hardwareVersion),
    // serial: bytesToString(serial),
  }
}

const disconnectFromDevice = async (peripheralId: string) => {
  equipmentPeripheralId = null
  await BluetoothDriver.removeNotifyEventSubscription()
  return BluetoothDriver.disconnectFromDevice(peripheralId)
}

const getAllConnectedPeripherals = async () => {
  return BluetoothDriver.getConnectedDevices()
}

const disconnectFromAllDevices = async () => {
  try {
    const connectedPeripherals = await getAllConnectedPeripherals()

    // desconecta de todos
    for (const peripheral of connectedPeripherals) {
      console.log('Disconnecting from: ', peripheral.id)
      await disconnectFromDevice(peripheral.id)
    }

    equipmentPeripheralId = null

    // limpa o reducer
    store.dispatch(clearDevice())
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at disconnectFromAllDevices ${JSON.stringify(err)}`, true)
  }
}

const startScan = async () => {
  return BluetoothDriver.startScan()
}

const stimulateNthChannel = async (channelNumber: number) => {
  try {
    await BluetoothDriver.writeToDevice(
      equipmentPeripheralId,
      SERVICES.NTH_CHANNEL_STIMULATION(channelNumber),
      CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channelNumber).SHOULD_STIMULATE,
      1
    )
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at stimulateNthChannel ${JSON.stringify(err)}`, true)
  }
}

const isChannelStimulating = async (channelNumber: number) => {
  try {
    const data = await BluetoothDriver.readFromDevice(
      equipmentPeripheralId,
      SERVICES.NTH_CHANNEL_STIMULATION(channelNumber),
      CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channelNumber).IS_STIMULATING_NOW
    )

    return convertBytesToNumber(data)
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at isChannelStimulating ${JSON.stringify(err)}`, true)
  }
}

const isChannelHabilitated = async (channelNumber: number) => {
  try {
    const data = await BluetoothDriver.readFromDevice(
      equipmentPeripheralId,
      SERVICES.NTH_CHANNEL_STIMULATION(channelNumber),
      CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channelNumber).SHOULD_STIMULATE
    )

    return convertBytesToNumber(data)
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at isChannelStimulating ${JSON.stringify(err)}`, true)
  }
}

const isGeneralStimulating = async () => {
  try {
    const data = await BluetoothDriver.readFromDevice(
      equipmentPeripheralId,
      SERVICES.GENERAL_STIMULATION,
      CHARACTERISTICS.GENERAL_STIMULATION.IS_STIMULATING_NOW
    )

    return convertBytesToNumber(data)
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at isGeneralStimulating ${JSON.stringify(err)}`, true)
  }
}

const lightLed = async (ledColor: keyof typeof LED_COLORS) => {
  try {
    await BluetoothDriver.writeToDevice(
      equipmentPeripheralId,
      SERVICES.LED,
      CHARACTERISTICS.LED,
      LED_COLORS[ledColor]
    )
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at lightLed ${JSON.stringify(err)}`, true)
  }
}

const sendOneStimulus = async (parameters: Parameters, channels: Channel[]) => {
  try {
    const channelIntensities = store.getState().channelIntensities

    for (const [index, channel] of channels.entries()) {
      if (!channel.selected) {
        continue
      }

      if (
        isNaN(Number(parameters.frequency)) ||
        isNaN(Number(parameters.riseTime)) ||
        isNaN(Number(parameters.fallTime)) ||
        isNaN(Number(parameters.ton)) ||
        isNaN(channelIntensities[index]) ||
        isNaN(Number(channels[index].pulseWidth))
      ) {
        throw 'Non numeric argument sent to sendOneStimulus'
      }

      const calculatedSustainTime =
        Number(parameters.ton) - Number(parameters.riseTime) - Number(parameters.fallTime)

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channels[index].channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channels[index].channelNumber).STIMULATION_TYPE,
        2
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channels[index].channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channels[index].channelNumber).INTENSITY,
        channelIntensities[index] ?? 0
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channels[index].channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channels[index].channelNumber).FREQUENCY,
        Number(parameters.frequency)
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channels[index].channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channels[index].channelNumber).PULSE_WIDTH,
        Number(channels[index].pulseWidth)
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channels[index].channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channels[index].channelNumber).RISE_TIME,
        Number(parameters.riseTime) * 1000
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channels[index].channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channels[index].channelNumber).FALL_TIME,
        Number(parameters.fallTime) * 1000
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channels[index].channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channels[index].channelNumber).SUSTAIN_TIME,
        calculatedSustainTime * 1000
      )

      if (channelIntensities[index]) {
        await setChannelToStimulate(channel.channelNumber)
      } else {
        await setChannelToIdle(channel.channelNumber)
      }
    }

    await startStimulation()
    await lightLed('cian')
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at sendOneStimulus ${JSON.stringify(err)}`, true)
  }
}

const updateChannelIntensity = async (newIntensity: number, channelNumber: number) => {
  const now = Date.now()
  const lastSentBluetoothCommand = store.getState().appStatus.lastSentBluetoothCommand

  if (now - lastSentBluetoothCommand < COMMUNICATION_COMMANDS_DEBOUNCE) {
    return
  }

  try {
    await BluetoothDriver.writeToDevice(
      equipmentPeripheralId,
      SERVICES.NTH_CHANNEL_STIMULATION(channelNumber),
      CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channelNumber).INTENSITY,
      newIntensity > MAXIMUM_INTENSITY ? MAXIMUM_INTENSITY : newIntensity
    )
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at updateChannelIntensity ${JSON.stringify(err)}`, true)
  }
}

const setChannelToStimulate = async (channelNumber: number) => {
  try {
    // const formattedMilisecondsLeft = milisecondsLeft ? formatMilisecondsToStringClock(milisecondsLeft) : 'NOT INFORMED'
    // verifica se esta estimulando antes
    // const stimulatingBefore = await isChannelStimulating(channelNumber)
    // Log.create(`Reading from CHANNEL_${channelNumber} - IS_STIMULATING_NOW value ${stimulatingBefore} AT ${formattedMilisecondsLeft}`)

    await BluetoothDriver.writeToDevice(
      equipmentPeripheralId,
      SERVICES.NTH_CHANNEL_STIMULATION(channelNumber),
      CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channelNumber).SHOULD_STIMULATE,
      1
    )

    // verifica se esta estimulando depois
    // const stimulatingAfter = await isChannelStimulating(channelNumber)
    // Log.create(`Reading from CHANNEL_${channelNumber} - IS_STIMULATING_NOW value ${stimulatingAfter} AT ${formattedMilisecondsLeft}`)
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at setChannelToStimulate ${JSON.stringify(err)}`, true)
  }
}

const setChannelToIdle = async (channelNumber: number) => {
  try {
    // verifica se esta estimulando antes
    // const stimulatingBefore = await isChannelStimulating(channelNumber)
    // Log.create(`Reading from CHANNEL_${channelNumber} - IS_STIMULATING_NOW value ${stimulatingBefore}`)

    await BluetoothDriver.writeToDevice(
      equipmentPeripheralId,
      SERVICES.NTH_CHANNEL_STIMULATION(channelNumber),
      CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channelNumber).SHOULD_STIMULATE,
      0
    )

    // verifica se esta estimulando depois
    // const stimulatingAfter = await isChannelStimulating(channelNumber)
    // Log.create(`Reading from CHANNEL_${channelNumber} - IS_STIMULATING_NOW value ${stimulatingAfter}`)

  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown setChannelToIdle ${JSON.stringify(err)}`, true)
  }
}

const startStimulation = async () => {
  try {
    await BluetoothDriver.writeToDevice(
      equipmentPeripheralId,
      SERVICES.GENERAL_STIMULATION,
      CHARACTERISTICS.GENERAL_STIMULATION.START_STOP_STIMULATION,
      1
    )
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at startStimulation ${JSON.stringify(err)}`, true)
  }
}

const stopStimulation = async () => {
  try {
    await BluetoothDriver.writeToDevice(
      equipmentPeripheralId,
      SERVICES.GENERAL_STIMULATION,
      CHARACTERISTICS.GENERAL_STIMULATION.START_STOP_STIMULATION,
      0
    )
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at stopStimulation ${JSON.stringify(err)}`, true)
  }
}

const interruptStimulation = async () => {
  try {
    await BluetoothDriver.writeToDevice(
      equipmentPeripheralId,
      SERVICES.GENERAL_STIMULATION,
      CHARACTERISTICS.GENERAL_STIMULATION.INTERRUPT_STIMULATION,
      1
    )

    await BluetoothDriver.writeToDevice(
      equipmentPeripheralId,
      SERVICES.GENERAL_STIMULATION,
      CHARACTERISTICS.GENERAL_STIMULATION.START_STOP_STIMULATION,
      0
    )
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at interruptStimulation ${JSON.stringify(err)}`, true)
  }
}

const finishTreatment = async () => {
  // envia o gráfico ao reducer
  store.dispatch(
    updateTreatment({
      newValuesObject: {
        graphData: graphArray,
      },
    })
  )

  // seta o LED verde
  await lightLed('green')
}

const unsubscribeFromChronometer = async () => {
  await BluetoothDriver.unsubscribeFromCharacteristic(
    equipmentPeripheralId,
    SERVICES.CHRONOMETER,
    CHARACTERISTICS.CHRONOMETER.READ_TIME_NOTIFY
  )

  // limpa os timestamp associados
  stimulationInstants = []
}

const unsubscribeFromAllNotifcations = async () => {
  await unsubscribeFromChronometer()

  await BluetoothDriver.removeNotifyEventSubscription()
}

const playChronometer = async () => {
  await BluetoothDriver.writeToDevice(
    equipmentPeripheralId,
    SERVICES.CHRONOMETER,
    CHARACTERISTICS.CHRONOMETER.PLAY_PAUSE,
    1
  )
}

const pauseChronometer = async () => {
  await BluetoothDriver.writeToDevice(
    equipmentPeripheralId,
    SERVICES.CHRONOMETER,
    CHARACTERISTICS.CHRONOMETER.PLAY_PAUSE,
    0
  )
}

const configureChronometer = async (treatmentDuration: number) => {
  await BluetoothDriver.addNotifyEventSubscription()

  await BluetoothDriver.writeToDevice(
    equipmentPeripheralId,
    SERVICES.CHRONOMETER,
    CHARACTERISTICS.CHRONOMETER.PLAY_PAUSE,
    0 // cronometro começa pausado, sem enviar notify
  )

  await BluetoothDriver.writeToDevice(
    equipmentPeripheralId,
    SERVICES.CHRONOMETER,
    CHARACTERISTICS.CHRONOMETER.SET_TIME,
    treatmentDuration
  )

  await BluetoothDriver.subscribeToCharacteristic(
    equipmentPeripheralId,
    SERVICES.CHRONOMETER,
    CHARACTERISTICS.CHRONOMETER.READ_TIME_NOTIFY,
    handleChronometerNotify
  )
}

let graphArray: GraphData = []
let numberOfRealizedStimulus: { channelNumber: number; stimulus: number }[] = []

let lastReceived: number = 0

let stimulationInstants: {
  timestamp: number
  type: 'first' | 'second' | 'third' | ''
}[] = []

const updateGraphArray = (index: number, stimulusNumber: number, intensity: number) => {
  for (const [graphIndex] of graphArray.entries()) {
    if (graphIndex !== index) {
      continue
    }

    graphArray[graphIndex] = [
      ...graphArray[graphIndex],
      { intensity: intensity, stimulus: stimulusNumber },
    ]
  }
}

const increaseNumberOfRealizedStimulus = (index: number) => {
  numberOfRealizedStimulus[index] = {
    channelNumber: numberOfRealizedStimulus[index].channelNumber,
    stimulus: numberOfRealizedStimulus[index].stimulus + 1,
  }
}

const configureStimulationParameters = async (protocol: Protocol) => {
  try {
    if (
      isNaN(Number(protocol.parameters.frequency)) ||
      isNaN(Number(protocol.parameters.riseTime)) ||
      isNaN(Number(protocol.parameters.fallTime)) ||
      isNaN(Number(protocol.parameters.treatmentTime)) ||
      isNaN(Number(protocol.parameters.sustainTime))
    ) {
      throw 'Non numeric argument sent to configureStimulationParameters'
    }

    // primeira coisa é configurar o cronometro
    await configureChronometer(Number(protocol.parameters.treatmentTime) * 1000 + 1000)

    // configura os parâmetros de cada canal
    for (const channel of protocol.channels) {
      if (isNaN(Number(channel.pulseWidth))) {
        throw 'Non numeric pulse width'
      }

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channel.channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channel.channelNumber).STIMULATION_TYPE,
        2
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channel.channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channel.channelNumber).INTENSITY,
        Number(channel.initialIntensity)
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channel.channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channel.channelNumber).FREQUENCY,
        Number(protocol.parameters.frequency)
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channel.channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channel.channelNumber).PULSE_WIDTH,
        Number(channel.pulseWidth)
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channel.channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channel.channelNumber).RISE_TIME,
        Number(protocol.parameters.riseTime) * 1000
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channel.channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channel.channelNumber).FALL_TIME,
        Number(protocol.parameters.fallTime) * 1000
      )

      await BluetoothDriver.writeToDevice(
        equipmentPeripheralId,
        SERVICES.NTH_CHANNEL_STIMULATION(channel.channelNumber),
        CHARACTERISTICS.NTH_CHANNEL_STIMULATION(channel.channelNumber).SUSTAIN_TIME,
        Number(protocol.parameters.sustainTime) * 1000
      )
    }

    // agora preenche a estrutura que salva os momentos corretos de estimulação
    // parâmetros
    const Ton = Number(protocol.parameters.ton) * 1000
    const Toff = Number(protocol.parameters.toff) * 1000
    const treatmentDurationInMiliseconds = Number(protocol.parameters.treatmentTime) * 1000
    const Tpulse = Ton + Toff

    for (let i = treatmentDurationInMiliseconds; i >= 0; i = i - 100) {
      const isFirstInstant = i % Tpulse === 0
      const isSecondInstant = i % Tpulse === Tpulse - 1 * Ton
      const isThirdInstant = i % Tpulse === Tpulse - 2 * Ton && !isFirstInstant

      if (isFirstInstant) {
        stimulationInstants.push({ timestamp: i, type: 'first' })
      } else if (isSecondInstant) {
        stimulationInstants.push({ timestamp: i, type: 'second' })
      } else if (isThirdInstant) {
        stimulationInstants.push({ timestamp: i, type: 'third' })
      }
    }

    // reset nas variáveis da classe de controle
    lastReceived = treatmentDurationInMiliseconds
    store.dispatch(
      updateAppStatus({
        type: 'stimulationInstant',
        status: '',
      })
    )

    numberOfRealizedStimulus = []
    for (const channel of protocol.channels) {
      numberOfRealizedStimulus.push({
        channelNumber: channel.channelNumber,
        stimulus: 0,
      })
    }
    graphArray = Array(protocol.channels.length).fill([])
  } catch (err) {
    await Log.create(`[Communication Exception]: Thrown at configureStimulationParameters  ${JSON.stringify(err)}`, true)
  }
}

const bluetoothStressTest = (value: number) => {
  BluetoothDriver.writeSyncToDevice(
    equipmentPeripheralId,
    SERVICES.NTH_CHANNEL_STIMULATION(2),
    CHARACTERISTICS.NTH_CHANNEL_STIMULATION(2).RISE_TIME,
    value * 1000
  )
}

const checkDeviceConnection = async () => {
  const isConnected = await BluetoothDriver.isDeviceConnected(equipmentPeripheralId)

  if (!isConnected) {
    store.dispatch(setConnectionStatus({ type: 'bluetooth', status: false }))
  }
}

const handleChronometerNotify = async (milisecondsLeft: number) => {
  if (milisecondsLeft % 1000 === 0) {
    // envia só de 1000 em 1000 ms para o tsx
    store.dispatch(
      updateTreatment({
        newValuesObject: {
          milisecondsLeft: milisecondsLeft,
        },
      })
    )
  }

  if (milisecondsLeft === 0) {
    store.dispatch(
      updateAppStatus({
        type: 'treatmentStatus',
        status: TREATMENT_STATUS.FINISHED,
      })
    )

    return
  }

  const timestamp = stimulationInstants.find((instant) => instant.timestamp === milisecondsLeft)
  const treatmentData = store.getState().treatment
  const stimulationType = treatmentData.protocol.parameters.stimulationType

  let isFirstInstant = timestamp ? timestamp.type === 'first' : false
  let isSecondInstant = timestamp ? timestamp.type === 'second' : false
  let isThirdInstant = timestamp ? timestamp.type === 'third' : false

  // verificação do timestamp que chega
  if (lastReceived - milisecondsLeft !== 100) {
    // perdeu um, para cada intervalo de 100ms até chegar no de agora, verifica se um
    // deles é um momento crítico (envio de comando BLE ou comando de atualziar relógio)
    for (
      let testTimestamp = lastReceived - 100;
      testTimestamp >= milisecondsLeft;
      testTimestamp = testTimestamp - 100
    ) {
      // primeira coisa é verificar se era um timestamp de atualizar o relógio no tsx
      if (testTimestamp % 1000 === 0) {
        store.dispatch(
          updateTreatment({
            newValuesObject: {
              milisecondsLeft: testTimestamp,
            },
          })
        )
      }

      const previousTimestamp = stimulationInstants.find(
        (instant) => instant.timestamp === testTimestamp
      )

      if (!previousTimestamp) {
        continue
      }

      if (previousTimestamp) {
        // era momento crítico
        Log.create(`
          MISSED CRITICAL TIMER NOTIFY EVENT
          last received = ${formatMilisecondsToStringClock(lastReceived)}
          current = ${formatMilisecondsToStringClock(milisecondsLeft)}
        `)

        switch (previousTimestamp.type) {
          case 'first':
            isFirstInstant = true
            break

          case 'second':
            isSecondInstant = true
            break

          case 'third':
            isThirdInstant = true
            break

          default:
            break
        }
      }
    }
  }

  lastReceived = milisecondsLeft

  if (!isFirstInstant && !isSecondInstant && !isThirdInstant) {
    return
  }

  try {
    const channelIntensities = store.getState().channelIntensities

    // primeiro momento
    if (isFirstInstant) {
      Log.create(`
        STARTING FIRST INSTANT AT: ${formatMilisecondsToStringClock(milisecondsLeft)}
      `)

      store.dispatch(
        updateAppStatus({
          type: 'stimulationInstant',
          status: 'first',
        })
      )

      switch (stimulationType) {
        case 'synchronous': {
          for (const [index, channel] of treatmentData.protocol.channels.entries()) {
            increaseNumberOfRealizedStimulus(index)
            updateGraphArray(
              index,
              numberOfRealizedStimulus[index].stimulus,
              channelIntensities[index] ?? 0
            )

            // não habilita o canal se a intensidade estiver em zero
            if (channelIntensities[index]) {
              await setChannelToStimulate(channel.channelNumber)
            } else {
              await setChannelToIdle(channel.channelNumber)
            }
          }

          break
        }

        case 'alternated': {
          for (const [index, channel] of treatmentData.protocol.channels.entries()) {
            // desativa segundo grupo
            if (channel.channelNumber % 2 === 0) {
              await setChannelToIdle(channel.channelNumber)
            }


            // ativa primeiro grupo
            if (channel.channelNumber % 2 !== 0) {
              increaseNumberOfRealizedStimulus(index)
              updateGraphArray(
                index,
                numberOfRealizedStimulus[index].stimulus,
                channelIntensities[index] ?? 0
              )

              // não habilita o canal se a intensidade estiver em zero
              if (channelIntensities[index]) {
                await setChannelToStimulate(channel.channelNumber)
              } else {
                await setChannelToIdle(channel.channelNumber)
              }
            }

          }

          break
        }
      }

      await lightLed('cian')
      await startStimulation()

      // verifica se esta estimulando geral
      const generalStimulating = await isGeneralStimulating()
      Log.create(`Reading from GENERAL_STIMULATION - IS_STIMULATING_NOW value ${generalStimulating} AT ${formatMilisecondsToStringClock(milisecondsLeft)}`)
    }

    // segundo momento
    if (isSecondInstant) {
      Log.create(`
        STARTING SECOND INSTANT AT: ${formatMilisecondsToStringClock(milisecondsLeft)}
      `)

      store.dispatch(
        updateAppStatus({
          type: 'stimulationInstant',
          status: 'second',
        })
      )

      switch (stimulationType) {
        case 'synchronous': {
          for (const channel of treatmentData.protocol.channels) {
            await setChannelToIdle(channel.channelNumber)
          }
          await lightLed('green')
          break
        }

        case 'alternated': {
          for (const [index, channel] of treatmentData.protocol.channels.entries()) {
            // desativa primeiro grupo
            if (channel.channelNumber % 2 !== 0) {
              await setChannelToIdle(channel.channelNumber)
            }


            // estimula segundo grupo
            if (channel.channelNumber % 2 === 0) {
              increaseNumberOfRealizedStimulus(index)
              updateGraphArray(
                index,
                numberOfRealizedStimulus[index].stimulus,
                channelIntensities[index] ?? 0
              )

              // não habilita o canal se a intensidade estiver em zero
              if (channelIntensities[index]) {
                await setChannelToStimulate(channel.channelNumber)
              } else {
                await setChannelToIdle(channel.channelNumber)
              }
            }

          }

          await lightLed('cian')
          await startStimulation()

          break
        }
      }

      // verifica se esta estimulando geral
      const generalStimulating = await isGeneralStimulating()
      Log.create(`Reading from GENERAL_STIMULATION - IS_STIMULATING_NOW value ${generalStimulating} AT ${formatMilisecondsToStringClock(milisecondsLeft)}`)
    }

    // terceiro momento
    if (isThirdInstant) {
      Log.create(`
        STARTING THIRD INSTANT AT: ${formatMilisecondsToStringClock(milisecondsLeft)}
      `)

      store.dispatch(
        updateAppStatus({
          type: 'stimulationInstant',
          status: 'third',
        })
      )

      switch (stimulationType) {
        case 'alternated': {
          for (const channel of treatmentData.protocol.channels) {
            // desativa segundo grupo
            if (channel.channelNumber % 2 === 0) {
              await setChannelToIdle(channel.channelNumber)
            }
          }

          await lightLed('green')
          break
        }
      }

      // verifica se esta estimulando geral
      const generalStimulating = await isGeneralStimulating()
      Log.create(`Reading from GENERAL_STIMULATION - IS_STIMULATING_NOW value ${generalStimulating} AT ${formatMilisecondsToStringClock(milisecondsLeft)}`)
    }
  } catch (error) {
    await Log.create(`[Communication Exception]: Thrown at handleChronometerNotify ${JSON.stringify(error)}`, true)
  }
}

export default {
  initialize,
  remove,
  connectToDevice,
  disconnectFromDevice,
  startScan,
  getAllConnectedPeripherals,
  disconnectFromAllDevices,
  stimulateNthChannel,
  lightLed,
  configureStimulationParameters,
  interruptStimulation,
  updateChannelIntensity,
  setChannelToStimulate,
  setChannelToIdle,
  startStimulation,
  stopStimulation,
  finishTreatment,
  unsubscribeFromChronometer,
  unsubscribeFromAllNotifcations,
  playChronometer,
  pauseChronometer,
  configureChronometer,
  sendOneStimulus,
  isChannelStimulating,
  isGeneralStimulating,
  isChannelHabilitated,
  bleEmitter,
  bluetoothStressTest,
  checkDeviceConnection,
}
