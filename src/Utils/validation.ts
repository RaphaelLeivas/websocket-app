import { Channel, Electrode, Parameters, Protocol } from '@/Types'

let translation = {
  emptyName: '',
  errorRiseTime: '',
  errorFallTime: '',
  errorSustainTime: '',
  errorTonTime: '',
  errorToffTime: '',
  errorTimeOfTreatment: '',
  errorFrequency: '',
  errorStimulationType: '',
  pulseWidthInChannel: '',
  invalid: '',
  errorPulseWidth: '',
  errorMaxAndTargetIntensity: '',
  errorMaxIntensity: '',
  errorElectrodeWidth: '',
  errorElectrodeHeight: '',
  errorElectrodeDiameter: '',
  errorSelectedDays: '',
  errorDailyFrequency: '',
  errorInitialDate: '',
  errorToff: '',
  invalidMaxIntensity: '',
  invalidInitialIntensity: '',
  invalidTargetIntensity: '',
  errorInitialIntensityTargetIntensity: '',
  errorInitialIntensityMaxIntensity: '',
  synchronousNotSupported1: '',
  synchronousNotSupported2: '',
}

/**
 * @param dateString string com a data em formato 'dd/mm/yyyy'
 * @returns booleano indicando se a data é valida (true) ou não (false)
 */
export const isValidDate = (dateString: string) => {
  // verifica o padrão via regex
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false
  }

  const parts = dateString.split('/')
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const year = parseInt(parts[2], 10)

  // Verifica os intervalos numéricos
  if (year < 1000 || year > 3000 || month === 0 || month > 12) {
    return false
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // Ajustes para ano bissexto
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29
  }

  // Por fim, verifica os intervalos de dias corrigidos com ano bissexto
  return day > 0 && day <= monthLength[month - 1]
}

/**
 * @param dateString date string em dd/mm/yyyy
 * @returns date string em yyyy/mm/dd. (ISO 8061)
 * Precisa disso pois o Moment trabalha bem com esse formato para parsear Date.
 */
export const formatToISODate = (dateString: string) => {
  // verifica o padrão via regex
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return '1970/01/01'
  }

  const dateArray = dateString.split('/')
  return dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0]
  // retorna em yyyy/mm/dd -> padrão ISO 8061 que o moment usa
}

export const validateProtocol = (protocol: Protocol) => {
  if (!protocol.name.length) {
    throw translation.emptyName
  }

  validateParameters(protocol.parameters)
  validateChannels(protocol.channels)
  validateElectrodes(protocol.channels.map((channel) => channel.electrode))
  validateProtocolDates(protocol)
}

export const validateParameters = (parameters: Parameters) => {
  if (
    parameters.riseTime === '' ||
    Number(parameters.riseTime) < 0 ||
    isNaN(Number(parameters.riseTime))
  ) {
    throw translation.errorRiseTime
  } else if (
    parameters.fallTime === '' ||
    Number(parameters.fallTime) < 0 ||
    isNaN(Number(parameters.fallTime))
  ) {
    throw translation.errorFallTime
  } else if (
    parameters.sustainTime === '' ||
    Number(parameters.sustainTime) < 0 ||
    isNaN(Number(parameters.sustainTime))
  ) {
    throw translation.errorSustainTime
  } else if (
    parameters.ton === '' ||
    Number(parameters.ton) <= 0 ||
    isNaN(Number(parameters.ton))
  ) {
    throw translation.errorTonTime
  } else if (
    parameters.toff === '' ||
    (parameters.stimulationType === 'alternated' && Number(parameters.toff) <= 0) ||
    isNaN(Number(parameters.toff))
  ) {
    throw translation.errorToffTime
  } else if (Number(parameters.treatmentTime) <= 0 || isNaN(Number(parameters.treatmentTime))) {
    throw translation.errorTimeOfTreatment
  } else if (
    parameters.frequency === '' ||
    Number(parameters.frequency) < 1 ||
    Number(parameters.frequency) > 100 ||
    isNaN(Number(parameters.frequency))
  ) {
    throw translation.errorFrequency
  } else if (!parameters.stimulationType) {
    throw translation.errorStimulationType
  } else if (
    Number(parameters.toff) < Number(parameters.ton) &&
    parameters.stimulationType === 'alternated'
  ) {
    throw translation.errorToff
  }
}

export const validateChannels = (channels: Channel[]) => {
  for (const channel of channels) {
    if (
      channel.pulseWidth === '' ||
      Number(channel.pulseWidth) === 0 ||
      isNaN(Number(channel.pulseWidth))
    ) {
      throw translation.pulseWidthInChannel + channel.channelNumber + ' ' + translation.invalid
    } else if (Number(channel.pulseWidth) < 50 || Number(channel.pulseWidth) > 20000) {
      throw translation.errorPulseWidth
    } else if (Number(channel.maxIntensity) < Number(channel.targetIntensity)) {
      throw translation.errorMaxAndTargetIntensity
    } else if (Number(channel.maxIntensity) > 120) {
      throw translation.errorMaxIntensity
    } else if (isNaN(Number(channel.maxIntensity)) || Number(channel.maxIntensity) <= 0) {
      throw translation.invalidMaxIntensity
    } else if (isNaN(Number(channel.targetIntensity)) || Number(channel.targetIntensity) <= 0) {
      throw translation.invalidTargetIntensity
    } else if (isNaN(Number(channel.initialIntensity)) || Number(channel.initialIntensity) < 0 || channel.initialIntensity === '') {
      throw translation.invalidInitialIntensity
    } else if (Number(channel.initialIntensity) > Number(channel.targetIntensity)) {
      throw translation.errorInitialIntensityTargetIntensity
    } else if (Number(channel.initialIntensity) > Number(channel.maxIntensity)) {
      throw translation.errorInitialIntensityMaxIntensity
    }
  }
}

export const validateElectrodes = (electrodes: Electrode[]) => {
  for (const electrode of electrodes) {
    if (electrode.format === 'Retangular' && electrode.type !== 'ReBELT') {
      if (
        electrode.width === '' ||
        Number(electrode.width) === 0 ||
        isNaN(Number(electrode.width))
      ) {
        throw translation.errorElectrodeWidth
      } else if (
        electrode.height === '' ||
        Number(electrode.height) === 0 ||
        isNaN(Number(electrode.height))
      ) {
        throw translation.errorElectrodeHeight
      }
    } else if (electrode.format === 'Circular' && electrode.type !== 'ReBELT') {
      if (
        electrode.diameter === '' ||
        Number(electrode.diameter) === 0 ||
        isNaN(Number(electrode.diameter))
      ) {
        throw translation.errorElectrodeDiameter
      }
    }
  }
}

const validateProtocolDates = (protocol: Protocol) => {
  if (!protocol.selectedDays.length) {
    throw translation.errorSelectedDays
  }

  if (protocol.selectedFrequency === undefined) {
    throw translation.errorDailyFrequency
  } else if (protocol.initialDate > protocol.finalDate) {
    throw translation.errorInitialDate
  }
}

export const validateSynchronousStimulation = (channels: Channel[], onlySelectedChannels: boolean = false) => {
  let channelNumbers: number[]

  if (onlySelectedChannels) {
    channelNumbers = channels.filter((channel) => channel.selected).map((channel) => channel.channelNumber)
  } else {
    channelNumbers = channels.map((channel) => channel.channelNumber)
  }

  for (const channelNumber of channelNumbers) {
    if (
      channelNumber % 2 !== 0 &&
      channelNumbers.find((number) => number === channelNumber + 1)
    ) {
      throw translation.synchronousNotSupported1 +
      ` ${channelNumber}, ${channelNumber + 1} ` +
      translation.synchronousNotSupported2
    }
  }
}
