import { TreatmentTypes, StimulationTypes, CHARACTERISTICS, Electrode } from '@/Types'
import { ThemeColors } from '@/Theme/theme.type'

let translation = {
  strengthGain: '',
  resistanceGain: '',
  painTreatment: '',
  custom: '',
  synchronous: '',
  alternated: '',
  notDefined: '',
  noPain: '',
  slightPain: '',
  moderatePain: '',
  intensePain: '',
  maximumPain: '',
  zero: '',
  trace: '',
  bad: '',
  regular: '',
  good: '',
  normal: '',
  stiffness: '',
  incomplete: '',
  complete: '',
  noRedness: '',
  slightlyRed: '',
  red: '',
  veryRed: '',
  purpleOrYellow: '',
  type1: '',
  type2: '',
  type3: '',
  type4: '',
  type5: '',
  monday: '',
  tuesday: '',
  wednesday: '',
  thursday: '',
  friday: '',
  saturday: '',
  sunday: '',
  knobButton: '',
  plusMinus: '',
}

export const formatTreatmentTypeToCode = (treatmentInLanguage: string): TreatmentTypes => {
  switch (treatmentInLanguage) {
    case translation.strengthGain:
      return 'strengthGain'
    case translation.resistanceGain:
      return 'resistanceGain'
    case translation.painTreatment:
      return 'painTreatment'
    case translation.custom:
      return 'custom'
    default:
      return 'custom'
  }
}

export const formatTreatmentTypeToLanguage = (treatmentType: TreatmentTypes): string => {
  switch (treatmentType) {
    case 'strengthGain':
      return translation.strengthGain
    case 'painTreatment':
      return translation.painTreatment
    case 'resistanceGain':
      return translation.resistanceGain
    case 'custom':
      return translation.custom
    default:
      return treatmentType
  }
}

export const formatStimulationTypeToCode = (
  stimulationTypeInLanguage: string
): StimulationTypes => {
  switch (stimulationTypeInLanguage) {
    case translation.synchronous:
      return 'synchronous'
    case translation.alternated:
      return 'alternated'
    default:
      return 'alternated'
  }
}

export const formatStimulationTypeToLanguage = (stimulationType: StimulationTypes): string => {
  switch (stimulationType) {
    case 'synchronous':
      return translation.synchronous
    case 'alternated':
      return translation.alternated
    default:
      return stimulationType
  }
}

export const formatPainText = (number: number) => {
  if (number === -1) {
    return translation.notDefined
  } else if (number === 0) {
    return translation.noPain
  } else if (number === 1 || number === 2 || number === 3) {
    return translation.slightPain
  } else if (number === 4 || number === 5 || number === 6) {
    return translation.moderatePain
  } else if (number === 7 || number === 8 || number === 9) {
    return translation.intensePain
  } else if (number === 10) {
    return translation.maximumPain
  }
}

export const formatMRCText = (number: number) => {
  if (number === -1) {
    return translation.notDefined
  } else if (number === 0) {
    return number.toString() + ' - ' + translation.zero
  } else if (number === 1) {
    return number.toString() + ' - ' + translation.trace
  } else if (number === 2) {
    return number.toString() + ' - ' + translation.bad
  } else if (number === 3) {
    return number.toString() + ' - ' + translation.regular
  } else if (number === 4) {
    return number.toString() + ' - ' + translation.good
  } else if (number === 5) {
    return number.toString() + ' - ' + translation.normal
  }
}

export const formatADMText = (number: number) => {
  if (number === -1) {
    return translation.notDefined
  } else if (number === 0) {
    return translation.stiffness
  } else if (number === 1) {
    return translation.incomplete
  } else {
    return translation.complete
  }
}

export const formatEAMText = (number: number) => {
  if (number === -1) {
    return translation.notDefined
  } else if (number === 2) {
    return '1+'
  } else if (number > 2) {
    return number - 1
  } else {
    return number
  }
}

export const formatSkinText = (number: number) => {
  if (number === -1) {
    return translation.notDefined
  } else if (number === 0) {
    return translation.noRedness
  } else if (number === 1) {
    return translation.slightlyRed
  } else if (number === 2) {
    return translation.red
  } else if (number === 3) {
    return translation.veryRed
  } else if (number === 4) {
    return translation.purpleOrYellow
  }
}

export const formatInducedForceText = (number: number) => {
  if (number === -1) {
    return translation.notDefined
  } else if (number === 0) {
    return translation.type1
  } else if (number === 1) {
    return translation.type2
  } else if (number === 2) {
    return translation.type3
  } else if (number === 3) {
    return translation.type4
  } else if (number === 4) {
    return translation.type5
  }
}

export const formatSecondsToClock = (seconds: number) => {
  const hours: number = Math.floor(seconds / 60 / 60)
  const mins: number = Math.floor((seconds / 60) % 60)
  const secs: number = Math.floor(seconds % 60)

  const displayHours = hours < 10 ? `0${hours}` : hours
  const displayMins = mins < 10 ? `0${mins}` : mins
  const displaySecs = secs < 10 ? `0${secs}` : secs

  return {
    displayHours,
    displayMins,
    displaySecs,
  }
}

export const formatSliderRange = (value: number, maxValue: number, minValue: number = 0) => {
  if (value < 0) {
    return minValue
  } else if (value > maxValue) {
    return maxValue
  } else {
    return value
  }
}

export const formatMilisecondsToStringClock = (miliseconds: number) => {
  const formatNumberTo2Digits = (n: number, z = 2) => ('00' + n).slice(-z)

  const ms = miliseconds % 1000
  miliseconds = (miliseconds - ms) / 1000
  const secs = miliseconds % 60
  miliseconds = (miliseconds - secs) / 60
  const mins = miliseconds % 60
  const hrs = (miliseconds - mins) / 60

  return (
    formatNumberTo2Digits(hrs) +
    ':' +
    formatNumberTo2Digits(mins) +
    ':' +
    formatNumberTo2Digits(secs) +
    '.' +
    formatNumberTo2Digits(ms, 3)
  )
}

export const formatSecondsToStringClock = (seconds: number) => {
  const formatNumberTo2Digits = (n: number, z = 2) => ('00' + n).slice(-z)

  const secs = seconds % 60
  seconds = (seconds - secs) / 60
  const mins = seconds % 60
  const hrs = (seconds - mins) / 60

  return (
    formatNumberTo2Digits(hrs) +
    'h ' +
    formatNumberTo2Digits(mins) +
    'min ' +
    formatNumberTo2Digits(secs) +
    's '
  )
}

export const formatClockToSeconds = (secs: number, mins: number, hours: number) => {
  if (isNaN(secs) || isNaN(mins) || isNaN(hours)) {
    throw 'Non numeric arguments sent to formatSecondsToClock'
  }

  const convertedHours = hours * 60 * 60
  const convertedMinutes = mins * 60

  const totalTime = convertedHours + convertedMinutes + secs

  return totalTime
}

export const formatToOneDecimal = (digit: string) =>
  digit.indexOf('.') > 0
    ? digit.split('.').length >= 1
      ? digit.split('.')[0] + '.' + digit.split('.')[1].substring(-1, 1)
      : digit
    : digit

const uuidRegexValidator: RegExp =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

/**
 * Ordena o UUID do serviço que o ble-manager lê para ficar igual ao feito no firmware.
   Funciona para os dois sentidos: tanto do app para o firmware quanto do firmware para o App
 */
export const orderUUID = (uuid: string) => {
  // verifica se é UUID mesmo
  if (!uuidRegexValidator.test(uuid)) {
    throw `INVALID_UUID: ${uuid}`
  }

  const orderedUuid: string[] | undefined = uuid
    .replace(/-/g, '')
    .match(/.{1,2}/g)
    ?.reverse()

  if (orderedUuid) {
    orderedUuid.splice(4, 0, '-')
    orderedUuid.splice(7, 0, '-')
    orderedUuid.splice(10, 0, '-')
    orderedUuid.splice(13, 0, '-')

    return orderedUuid.join('')
  } else {
    throw `INVALID_UUID: ${orderedUuid}`
  }
}

export const isValidUUID = (testString: string) => uuidRegexValidator.test(testString)

export const convertNumberToBytes = (num: number): number[] => {
  let buffer = Array(4).fill(0)

  for (let i = buffer.length - 1; i >= 0; --i) {
    const byte = num & 0xff
    buffer[i] = byte
    num = (num - byte) / 256
  }

  return buffer
}

export const convertBytesToNumber = (byteArr: number[]): number => {
  let value = 0

  if (byteArr) {
    for (let i = 0; i < byteArr.length; ++i) {
      value += byteArr[i] * Math.pow(256, i)
    }
  }

  return value
}

export const formatSelectedDays = (selectedDays: number[]) => {
  let formattedDays: string = ''

  const daysOfWeekList = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]

  selectedDays.forEach((day, index) => {
    //@ts-ignore
    formattedDays += translation[daysOfWeekList[day]]
    formattedDays += index === selectedDays.length - 1 ? '' : ', '
  })

  return formattedDays
}

export const getCharacteristicKeyByUuid = (uuid: string): string => {
  if (!uuid) {
    throw 'BAD ARGUMENT: Characteristic UUID is empty.'
  }

  for (const service in CHARACTERISTICS) {
    if (service === 'LED') {
      if (CHARACTERISTICS[service] === uuid) {
        return `${service}`
      }
    }

    for (const characteristc in CHARACTERISTICS[service]) {
      if (CHARACTERISTICS[service][characteristc] === uuid) {
        return `${service} - ${characteristc}`
      }
    }
  }

  // se não encontrou, verifica nos serviços por canal
  for (let i = 1; i <= 8; ++i) {
    const channelCharacteristics = CHARACTERISTICS.NTH_CHANNEL_STIMULATION(i)

    for (const characteristc in channelCharacteristics) {
      if (channelCharacteristics[characteristc] === uuid) {
        return `CHANNEL_${i} - ${characteristc}`
      }
    }
  }


  return `NOT_FOUND - ${uuid}`
}

export const getChannelColorByNumber = (Colors: ThemeColors, index: number) => {
  if (index === 1 || index === 2) {
    return Colors.channelOneTwo
  } else if (index === 3 || index === 4) {
    return Colors.channelTreeFour
  } else if (index === 5 || index === 6) {
    return Colors.channelFiveSix
  } else if (index === 7 || index === 8) {
    return Colors.channelSevenEigth
  } else {
    return Colors.channelOneTwo
  }
}

export const formatStimulationInterfaceTypeToLanguage = (stimuationInterface: string) => {
  switch (stimuationInterface) {
    case 'knobButton':
      return translation.knobButton
    case 'plusMinus':
      return translation.plusMinus
    default:
      return translation.plusMinus
  }
}

export const formatElectrodeToText = (electrode: Electrode): string => {
  if (electrode.type === 'ReBELT') {
    return `${electrode.rebeltSize} cm`
  }

  switch (electrode.format) {
    case 'Retangular':
      return `${electrode.width ?? 3}cm X ${electrode.height ?? 5}cm`
    case 'Circular':
      return `Diâmetro ${electrode.diameter ?? 3}cm`
  }
}

