// types
export type { RoleTypes, User } from './session.type'
export type { SnackbarType } from './snackbar.type'
export type {
  TreatmentTypes,
  StimulationTypes,
  Parameters,
  Protocol,
  Electrode,
  Channel,
} from './protocol.type'
export type { PeripheralType, PeripheralInfoType, Equipment } from './bluetooth.type'
export type { ReduxStore } from './redux.type'
export type { Treatment, GraphData, PreTreatmentEval, PostTreatmentEval } from './treatment.type'
export type { FormInput } from './formData.type'
export type { Exam, ExamData } from './exam.type'

// enums
export { TREATMENT_STATUS } from './treatment.type'
export { EXAM_INSTRUMENTS, EXAM_TYPES } from './exam.type'

// constantes
export {
  DEFAULT_PARAMETERS,
  MAXIMUM_INTENSITY,
  DEFAULT_ELECTRODE_VALUE,
  ELECTRODE_FORMAT_LIST,
  ELECTRODE_TYPES_LIST,
  REBELT_SIZES_LIST,
  DEFAULT_CHANNEL_VALUE,
  PROTOCOL_INITIAL_VALUE,
  PROTOCOL_EXAMPLE_VALUE,
} from './protocol.type'
export {
  SCAN_TIME_IN_SECONDS,
  SCAN_ALLOW_DUPLICATES,
  SERVICES,
  CHARACTERISTICS,
  DEVICE_INITIAL_VALUE,
  EXAMPLE_DEVICE,
  LED_COLORS,
  EQUIPMENT_NUMBER_OF_CHANNELS,
  COMMUNICATION_COMMANDS_DEBOUNCE,
} from './bluetooth.type'
export { USER_INITIAL_VALUE } from './session.type'
export {
  TREATMENT_INITIAL_VALUE,
  EXAMPLE_GRAPH_DATA,
  CONTINUOS_PRESS_DELAY,
  INTENSITY_DEBOUNCE_DELAY,
  PLAY_PAUSE_DEBOUNCE_DELAY,
} from './treatment.type'
export {
  SETTINGS_INITIAL_VALUE,
  APP_STATUS_INITIAL_VALUE,
  CONNECTION_INITIAL_VALUE,
  SELECTION_INITIAL_VALUE,
  CHANNEL_INTENSITIES_INITIAL_VALUE,
} from './redux.type'
export {
  INTERFACE_TYPES_LIST,
  INTERFACE_INTENSITY_FACTORS,
} from './redux.type'
