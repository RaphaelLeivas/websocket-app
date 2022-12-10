import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native'
import BleManager from 'react-native-ble-manager'

import {
  PeripheralType,
  SCAN_TIME_IN_SECONDS,
  SCAN_ALLOW_DUPLICATES,
  CHARACTERISTICS,
} from '@/Types'
import { orderUUID, convertNumberToBytes, convertBytesToNumber, getCharacteristicKeyByUuid, delay } from '@/Utils'
import { store } from '@/Store'
import { setConnectionStatus, updateAppStatus } from '@/Store/Slices'
import { Log } from '@/Services'

const BleManagerModule = NativeModules.BleManager

// controle de eventos disparados pela biblitoca react-native-ble-manager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

// controle de eventos disparados por nós para as telas do app receberem
let bleEmitter = new NativeEventEmitter(NativeModules.Emitter)

let finishedScan: EmitterSubscription | null = null
let notifySubscription: EmitterSubscription | null = null
let lostConnectionSubscription: EmitterSubscription | null = null

// callback dos eventos notify, são setados pela camada Communication
let handleChronometerNotifyCallback: ((value: any) => void) | null = null

const init = async () => {
  await BleManager.start({ showAlert: false })
  await BleManager.enableBluetooth()

  finishedScan = bleManagerEmitter.addListener('BleManagerStopScan', handleScanFinished)
}

const remove = () => {
  if (finishedScan) {
    finishedScan.remove()
  }
  if (notifySubscription) {
    notifySubscription.remove()
  }
  if (lostConnectionSubscription) {
    lostConnectionSubscription.remove()
  }
}

const startScan = async () => {
  await BleManager.enableBluetooth()

  BleManager.scan([], SCAN_TIME_IN_SECONDS, SCAN_ALLOW_DUPLICATES)
    .catch((err) => console.error('Error while attempting to start scanning.', err))
}

// retorna Promise para o front usar e conseguir fazer validação
const connectToDevice = (peripheralId: string) => {
  if (!peripheralId) {
    throw 'BluetoothDriver exception thrown: peripheralId is undefined!'
  }

  lostConnectionSubscription = bleManagerEmitter.addListener(
    'BleManagerDisconnectPeripheral',
    handleLostConnection
  )

  return BleManager.connect(peripheralId)
}

const disconnectFromDevice = (peripheralId: string) => {
  if (!peripheralId) {
    throw 'BluetoothDriver exception thrown: peripheralId is undefined!'
  }

  if (lostConnectionSubscription) {
    lostConnectionSubscription.remove()
  }

  return BleManager.disconnect(peripheralId)
}

const getConnectedDevices = () => {
  return BleManager.getConnectedPeripherals([])
}

const retrieveServices = (peripheralId: string) => {
  if (!peripheralId) {
    throw 'BluetoothDriver exception thrown: peripheralId is undefined!'
  }

  return BleManager.retrieveServices(peripheralId)
}

const writeToDevice = async (
  peripheralId: string | null,
  serviceUUID: string,
  characteristicUUID: string,
  data: number
) => {
  if (!peripheralId) {
    throw 'BluetoothDriver exception thrown: peripheralId is undefined!'
  }

  store.dispatch(
    updateAppStatus({ type: 'lastSentBluetoothCommand', status: Date.now() })
  )

  // await BleManager.retrieveServices(peripheralId)

  Log.create(`[BluetoothDriver]: Writing to ${getCharacteristicKeyByUuid(characteristicUUID)} value ${data}`)

  BleManager.writeWithoutResponse(
    peripheralId,
    orderUUID(serviceUUID),
    orderUUID(characteristicUUID),
    convertNumberToBytes(data)
  )

  await delay(50)
}

const writeSyncToDevice = (
  peripheralId: string | null,
  serviceUUID: string,
  characteristicUUID: string,
  data: number
) => {
  if (!peripheralId) {
    throw 'BluetoothDriver exception thrown: peripheralId is undefined!'
  }

  store.dispatch(
    updateAppStatus({ type: 'lastSentBluetoothCommand', status: Date.now() })
  )

  // await BleManager.retrieveServices(peripheralId)

  Log.create(`[BluetoothDriver]: Writing to ${getCharacteristicKeyByUuid(characteristicUUID)} value ${data}`)

  return BleManager.writeWithoutResponse(
    peripheralId,
    orderUUID(serviceUUID),
    orderUUID(characteristicUUID),
    convertNumberToBytes(data)
  )
}

const readFromDevice = async (
  peripheralId: string | null,
  serviceUUID: string,
  characteristicUUID: string
) => {
  if (!peripheralId) {
    throw 'BluetoothDriver exception thrown: peripheralId is undefined!'
  }

  await BleManager.retrieveServices(peripheralId)

  return BleManager.read(peripheralId, orderUUID(serviceUUID), orderUUID(characteristicUUID))
}

const isDeviceConnected = async (peripheralId: string | null) => {
  if (!peripheralId) {
    throw 'BluetoothDriver exception thrown: peripheralId is undefined!'
  }

  return BleManager.isPeripheralConnected(peripheralId, [])
}

const subscribeToCharacteristic = async (
  peripheralId: string | null,
  serviceUUID: string,
  characteristicUUID: string,
  notifyCallback: (value: any) => void
) => {
  if (!peripheralId) {
    throw 'BluetoothDriver exception thrown: peripheralId is undefined!'
  }

  await BleManager.retrieveServices(peripheralId)

  await BleManager.startNotification(
    peripheralId,
    orderUUID(serviceUUID),
    orderUUID(characteristicUUID)
  )

  handleChronometerNotifyCallback = notifyCallback
}

const unsubscribeFromCharacteristic = async (
  peripheralId: string | null,
  serviceUUID: string,
  characteristicUUID: string
) => {
  if (!peripheralId) {
    throw 'BluetoothDriver exception thrown: peripheralId is undefined!'
  }

  await BleManager.retrieveServices(peripheralId)

  await BleManager.stopNotification(
    peripheralId,
    orderUUID(serviceUUID),
    orderUUID(characteristicUUID)
  )

  handleChronometerNotifyCallback = null
  removeNotifyEventSubscription()
}

const addNotifyEventSubscription = async () => {
  notifySubscription = bleManagerEmitter.addListener(
    'BleManagerDidUpdateValueForCharacteristic',
    handleNotify
  )
}

const removeNotifyEventSubscription = async () => {
  notifySubscription?.remove()
}

export default {
  init,
  remove,
  startScan,
  connectToDevice,
  disconnectFromDevice,
  retrieveServices,
  getConnectedDevices,
  writeToDevice,
  readFromDevice,
  subscribeToCharacteristic,
  unsubscribeFromCharacteristic,
  addNotifyEventSubscription,
  removeNotifyEventSubscription,
  bleEmitter,
  writeSyncToDevice,
  isDeviceConnected,
}

// Executada após o bluetooth disparar evento BleManagerStopScan - após finalizar o scan
const handleScanFinished = async () => {
  const discoveredPeripherals: PeripheralType[] = await BleManager.getDiscoveredPeripherals()

  // pega somente os OmniCare dentro que os que descobriu
  // const peripheralList: PeripheralType[] = discoveredPeripherals.filter(
  //   (peripheral) => peripheral.name === 'OmniCare'
  // )

  // envia para as telas
  bleEmitter.emit('sendPeripheralList', discoveredPeripherals)
}

const handleNotify = async ({ characteristic, value }) => {
  switch (orderUUID(characteristic)) {
    case CHARACTERISTICS.CHRONOMETER.READ_TIME_NOTIFY:
      if (!Array.isArray(value)) {
        console.warn('Bad argument: expected byte array as chronometer notify event.')
        break
      }

      handleChronometerNotifyCallback?.(convertBytesToNumber(value))
      break

    default:
      console.warn('Characteristic not found in notify callback')
  }
}

const handleLostConnection = () => {
  console.log('>>>> DISCONNECT EVENT FIRED <<<<')
  store.dispatch(setConnectionStatus({ type: 'bluetooth', status: false }))
}
