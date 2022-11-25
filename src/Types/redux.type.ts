import { User, Protocol, Equipment, Treatment, TREATMENT_STATUS } from '@/Types'

export type ReduxStore = {
  session: User
  connection: {
    bluetooth: boolean
    internet: boolean
    advancedWithoutBleConnection: boolean
    simulatingConnection: boolean
  }
  addProtocol: Protocol
  device: Equipment
  treatment: Treatment
  selection: { patientId: string; protocolId: string; treatmentId: string }
  appStatus: {
    openDrawer: boolean
    canGoBack: boolean
    treatmentStatus: TREATMENT_STATUS
    lastSync: number
    lastSentBluetoothCommand: number
    synchronizing: boolean
    missedNotify: string
    stimulationInstant: 'first' | 'second' | 'third' | ''
    logMessage: string
  }
  settings: {
    appVersion: string
    currentLanguage: string
    shouldSyncImages: boolean
    shouldGeneralSync: boolean
    interfaceType: 'knobButton' | 'plusMinus'
    intensityFactor: number
  }
  channelIntensities: number[]
}

export const INTERFACE_TYPES_LIST = [
  'plusMinus',
  'knobButton',
]

export const INTERFACE_INTENSITY_FACTORS = [
  1, // incremeta de 1mA em 1mA ; 2mA/360° no Knob button
  2, // incremeta de 2mA em 2mA ; 3mA/360° no Knob button
  3, // incremeta de 3mA em 3mA ; 4mA/360° no Knob button
]

export const SETTINGS_INITIAL_VALUE = {
  appVersion: 'v0.0',
  currentLanguage: 'pt',
  shouldSyncImages: true,
  shouldGeneralSync: true,
  interfaceType: 'plusMinus',
  intensityFactor: 1,
}

export const APP_STATUS_INITIAL_VALUE = {
  openDrawer: false,
  canGoBack: true,
  treatmentStatus: TREATMENT_STATUS.NOT_STARTED,
  lastSync: Date.now(),
  lastSentBluetoothCommand: Date.now(),
  synchronizing: false,
  missedNotify: '',
  stimulationInstant: '',
  logMessage: '',
}

export const CONNECTION_INITIAL_VALUE = {
  bluetooth: false,
  internet: false,
  advancedWithoutBleConnection: false,
  simulatingConnection: false,
}

export const SELECTION_INITIAL_VALUE = {
  patientId: '',
  protocolId: '',
  treatmentId: '',
}

export const CHANNEL_INTENSITIES_INITIAL_VALUE = [0]
