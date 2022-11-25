import { Protocol, PROTOCOL_INITIAL_VALUE } from './protocol.type'

export type PreTreatmentEval = {
  channelNumber: number
  MRC?: number
  EAM?: number
  ADM?: number
  functionalGoal?: number
  amplitudeAngle?: number
}

export type PostTreatmentEval = {
  channelNumber: number
  MRC?: number
  EAM?: number
  ADM?: number
  weightUsed?: number
  amplitudeAngle?: number
  inducedForce?: number
  skinColor?: number
}

export type Treatment = {
  protocol: Protocol
  startedAt: number // milisegundos
  finishedAt: number // milisegundos
  equipmentId: string
  operatedBy: string

  preEVA: number
  preNotes?: string
  patientWeight: number
  postEVA: number
  postNotes?: string

  preTreatmentEvals: PreTreatmentEval[]
  postTreatmentEvals: PostTreatmentEval[]

  treatmentFinished: boolean
  interruptionTimestamps?: number[] // segundos após início do tratamento dos tempos que houve pausa
  graphData?: GraphData
  milisecondsLeft?: number // registra quanto tempo falta de tratamento
}

export const TREATMENT_INITIAL_VALUE: Treatment = {
  protocol: PROTOCOL_INITIAL_VALUE,
  startedAt: Date.now(), // milisegundos
  finishedAt: Date.now(), // milisegundos
  equipmentId: '',
  operatedBy: '',

  preNotes: '',
  preEVA: 0,
  patientWeight: 0,
  postNotes: '',
  postEVA: 0,

  preTreatmentEvals: [],
  postTreatmentEvals: [],

  treatmentFinished: false,
  interruptionTimestamps: [],
  graphData: [],
}

export enum TREATMENT_STATUS {
  NOT_STARTED = 0,
  RUNNING = 1,
  PAUSED = 2,
  FINISHED = 3,
}

export type GraphData = {
  stimulus: number
  intensity: number
}[][]

export const EXAMPLE_GRAPH_DATA: GraphData = [
  [
    { stimulus: 1, intensity: 30 },
    { stimulus: 2, intensity: 30 },
    { stimulus: 3, intensity: 30 },
    { stimulus: 4, intensity: 50 },
    { stimulus: 5, intensity: 50 },
    { stimulus: 6, intensity: 50 },
    { stimulus: 7, intensity: 50 },
    { stimulus: 8, intensity: 30 },
    { stimulus: 9, intensity: 30 },
    { stimulus: 10, intensity: 10 },
    { stimulus: 11, intensity: 10 },
    { stimulus: 12, intensity: 10 },
  ],
  [
    { stimulus: 1, intensity: 10 },
    { stimulus: 2, intensity: 15 },
    { stimulus: 3, intensity: 20 },
    { stimulus: 4, intensity: 30 },
    { stimulus: 5, intensity: 30 },
    { stimulus: 6, intensity: 40 },
    { stimulus: 7, intensity: 50 },
    { stimulus: 8, intensity: 55 },
    { stimulus: 9, intensity: 55 },
    { stimulus: 10, intensity: 55 },
    { stimulus: 11, intensity: 55 },
    { stimulus: 12, intensity: 55 },
    { stimulus: 13, intensity: 55 },
    { stimulus: 14, intensity: 55 },
    { stimulus: 15, intensity: 55 },
    { stimulus: 16, intensity: 55 },
  ],
  [
    { stimulus: 1, intensity: 25 },
    { stimulus: 2, intensity: 25 },
    { stimulus: 3, intensity: 25 },
    { stimulus: 4, intensity: 20 },
    { stimulus: 5, intensity: 20 },
    { stimulus: 6, intensity: 10 },
    { stimulus: 7, intensity: 10 },
    { stimulus: 8, intensity: 10 },
    { stimulus: 9, intensity: 10 },
    { stimulus: 10, intensity: 15 },
    { stimulus: 11, intensity: 15 },
    { stimulus: 12, intensity: 15 },
    { stimulus: 13, intensity: 15 },
    { stimulus: 14, intensity: 15 },
  ],
]

export const CONTINUOS_PRESS_DELAY = 600
export const INTENSITY_DEBOUNCE_DELAY = 200
export const PLAY_PAUSE_DEBOUNCE_DELAY = 1500

