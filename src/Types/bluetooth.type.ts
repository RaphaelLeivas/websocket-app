import { Peripheral, PeripheralInfo } from 'react-native-ble-manager'

export type PeripheralType = Peripheral
export type PeripheralInfoType = PeripheralInfo

export const SCAN_TIME_IN_SECONDS: number = 3
export const SCAN_ALLOW_DUPLICATES: boolean = false

export type Equipment = {
  id?: string
  equipmentTypeId: number
  bluetoothAddress: string
  numberOfChannels: number
  blocked: boolean
}

export const DEVICE_INITIAL_VALUE: Equipment = {
  equipmentTypeId: 102,
  numberOfChannels: 8,
  blocked: false,
  bluetoothAddress: '',
}

export const EXAMPLE_DEVICE: Equipment = {
  equipmentTypeId: 102,
  numberOfChannels: 8,
  blocked: false,
  bluetoothAddress: '',
}

// UUIDs dos serviços
export const SERVICES = {
  NTH_CHANNEL_STIMULATION: (n: number) => `a58c0f61-814c-484b-0${n}00-4a1f8f5ef9b6`,
  GENERAL_STIMULATION: 'af7c4b15-34ec-433a-0000-02aab0dad948',
  INFORMATION: '186aa869-026d-0000-ba76-c4db44532ddb',
  LED: '66c43a55-c384-0000-abfc-64425219bacf',
  PEN_STIMULATION: '3b905aec-f955-0000-af69-10385f3f3011',
  KNOB_ACCEL: '2527dc4d-2dd5-0000-bf0a-d1affe3e872f',
  PROTECTIONS: '06d973cb-4635-0000-a070-13991b697903',
  PROBLEMS_INFORMATION: '06fb95c4-a57b-485c-0000-ebceb7f2fd36',
  CHRONOMETER: 'cf0e54c0-c63a-11ec-9d00-0242ac120002',
}

// UUIDs das características
export const CHARACTERISTICS = {
  NTH_CHANNEL_STIMULATION: (n: number) => ({
    STIMULATION_TYPE: `a58c0f61-814c-484b-0${n}01-4a1f8f5ef9b6`,
    INTENSITY: `a58c0f61-814c-484b-0${n}02-4a1f8f5ef9b6`,
    FREQUENCY: `a58c0f61-814c-484b-0${n}03-4a1f8f5ef9b6`,
    PULSE_WIDTH: `a58c0f61-814c-484b-0${n}04-4a1f8f5ef9b6`,
    RISE_TIME: `a58c0f61-814c-484b-0${n}05-4a1f8f5ef9b6`,
    FALL_TIME: `a58c0f61-814c-484b-0${n}06-4a1f8f5ef9b6`,
    SUSTAIN_TIME: `a58c0f61-814c-484b-0${n}07-4a1f8f5ef9b6`,
    SHOULD_STIMULATE: `a58c0f61-814c-484b-0${n}08-4a1f8f5ef9b6`,
    ANGLE_STIMULATION_BEGIN: `a58c0f61-814c-484b-0${n}09-4a1f8f5ef9b6`,
    ANGLE_STIMULATION_END: `a58c0f61-814c-484b-0${n}0A-4a1f8f5ef9b6`,
    ANGLE_DAMPING_STIMULATION_BEGIN: `a58c0f61-814c-484b-0${n}0C-4a1f8f5ef9b6`,
    ANGLE_DAMPING_STIMULATION_END: `a58c0f61-814c-484b-0${n}0D-4a1f8f5ef9b6`,
    IS_STIMULATING_NOW: `a58c0f61-814c-484b-0${n}0E-4a1f8f5ef9b6`,
  }),
  GENERAL_STIMULATION: {
    START_STOP_STIMULATION: 'af7c4b15-34ec-433a-0001-02aab0dad948',
    INTERRUPT_STIMULATION: 'af7c4b15-34ec-433a-0002-02aab0dad948',
    IS_STIMULATING_NOW: 'af7c4b15-34ec-433a-0003-02aab0dad948',
  },
  INFORMATION: {
    NUMBER_OF_CHANNELS: '186aa869-026d-0001-ba76-c4db44532ddb',
    HAS_IHM: '186aa869-026d-0001-ba76-c4db44532ddb',
    DEVICE_TYPE: '186aa869-026d-0002-ba76-c4db44532ddb',
    HARDWARE_VERSION: '186aa869-026d-0003-ba76-c4db44532ddb',
    FIRMWARE_VERSION: '186aa869-026d-0004-ba76-c4db44532ddb',
    MANUFACTURER: '186aa869-026d-0003-ba76-c4db44532ddb',
  },
  LED: '66c43a55-c384-0001-abfc-64425219bacf',
  PEN: {
    BTN_PEN_INCREASE: '3b905aec-f955-0001-af69-10385f3f3011',
    BTN_PEN_DECREASE: '3b905aec-f955-0002-af69-10385f3f3011',
    BTN_PEN_ON_OFF: '3b905aec-f955-0003-af69-10385f3f3011',
    PEN_LED: '3b905aec-f955-0004-af69-10385f3f3011',
  },
  KNOB_ACCEL: {
    KNOB_VALUE: '2527dc4d-2dd5-0001-bf0a-d1affe3e872f',
    ACCEL_VALUE: '2527dc4d-2dd5-0002-bf0a-d1affe3e872f',
  },
  PROTECTIONS: {
    EMERGENCY_BUTTON: '06d973cb-4635-0001-a070-13991b697903',
    WATCHDOG: '06d973cb-4635-0002-a070-13991b697903',
    LOOSE_ELECTRODE: '06d973cb-4635-0003-a070-13991b697903',
  },
  PROBLEMS_INFORMATION: {
    DAC_PROBLEM: '06fb95c4-a57b-485c-0001-ebceb7f2fd36',
    IO_EXPANDER_PROBLEM: '06fb95c4-a57b-485c-0002-ebceb7f2fd36',
    STIMULATION_PROBLEM: '06fb95c4-a57b-485c-0003-ebceb7f2fd36',
    DISPLAY_PROBLEM: '06fb95c4-a57b-485c-0004-ebceb7f2fd36',
    ACCEL_NOT_FOUND_PROBLEM: '06fb95c4-a57b-485c-0005-ebceb7f2fd36',
    BATTERY_CHARGER_NOT_FOUND_PROBLEM: '06fb95c4-a57b-485c-0006-ebceb7f2fd36',
  },
  CHRONOMETER: {
    SET_TIME: 'cf0e54c0-c63a-11ec-9d02-0242ac120002',
    READ_TIME_NOTIFY: 'cf0e54c0-c63a-11ec-9d01-0242ac120002',
    PLAY_PAUSE: 'cf0e54c0-c63a-11ec-9d03-0242ac120002',
    STOP: 'cf0e54c0-c63a-11ec-9d04-0242ac120002',
  },
}

export const LED_COLORS = {
  red: 0,
  green: 1,
  blue: 2,
  cian: 3,
  magent: 4,
  yellow: 5,
  off: 6,
}

export const EQUIPMENT_NUMBER_OF_CHANNELS: { [key: number]: number } = {
  0: 2,
  1: 4,
  2: 6,
  3: 8,
}

export const COMMUNICATION_COMMANDS_DEBOUNCE = 500 // milisegundos

