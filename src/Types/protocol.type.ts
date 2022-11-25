import { Animated, View } from 'react-native'
import React from 'react'

export type TreatmentTypes = 'strengthGain' | 'resistanceGain' | 'painTreatment' | 'custom'

export type StimulationTypes = 'synchronous' | 'alternated'

export type Protocol = {
  protocolId?: string
  patientId: string
  createdBy?: string
  createdAt?: number // milisegundos
  name: string
  description?: string
  channels: Channel[]
  parameters: Parameters
  initialDate: number // milisegundos
  finalDate: number // milisegundos
  selectedDays: number[]
  selectedFrequency: number
  warnPatient: boolean
  warnProfessional: boolean
}

// usam tipo number | string pois os TextInputs usam necessariamente string para digitar
export type Parameters = {
  treatmentType: TreatmentTypes
  stimulationType: StimulationTypes
  riseTime: string | number
  fallTime: string | number
  sustainTime: string | number
  ton: string | number
  toff: string | number
  numberOfStimulus: string | number
  treatmentTime: string | number
  frequency: string | number
  pulseWidth?: string | number
  maxIntensity?: number | string
  targetIntensity?: number | string
  initialIntensity?: number | string
}

export type Channel = {
  channelNumber: number
  muscleName: string
  pulseWidth: number | string
  maxIntensity: number | string
  targetIntensity: number | string
  initialIntensity: number | string
  electrode: Electrode
  selected?: boolean
  stimulating?: boolean
  animation?: Animated.Value
  intensity?: number
  images: {
    uri: string[]
    sources: string[]
    base64: string[]
    description?: string
  }
  graphImageUrl?: string
  graphImageRef?: React.RefObject<View>
}

export type Electrode = {
  type: 'ReBELT' | 'Auto Adesivo' | 'Silicone Carbonado' | 'Metálico'
  format: 'Retangular' | 'Circular'
  width?: string
  height?: string
  diameter?: string
  selected?: boolean
  rebeltSize?: string
}

// parâmetros default por tipo de tratamento
export const DEFAULT_PARAMETERS: { [key in TreatmentTypes]: Parameters } = {
  strengthGain: {
    treatmentType: 'strengthGain',
    stimulationType: 'synchronous',
    riseTime: 0,
    fallTime: 0,
    sustainTime: 0,
    ton: 5.0,
    toff: 10.0,
    numberOfStimulus: 0,
    treatmentTime: 1800,
    frequency: 60,
    pulseWidth: 300, // us
    maxIntensity: 0,
    targetIntensity: 0,
    initialIntensity: 0,
  },
  resistanceGain: {
    treatmentType: 'resistanceGain',
    stimulationType: 'synchronous',
    riseTime: 0,
    fallTime: 0,
    sustainTime: 0,
    ton: 5.0,
    toff: 10.0,
    numberOfStimulus: 0,
    treatmentTime: 3600,
    frequency: 20,
    pulseWidth: 500,
    maxIntensity: 0,
    targetIntensity: 0,
    initialIntensity: 0,
  },
  painTreatment: {
    treatmentType: 'painTreatment',
    stimulationType: 'synchronous',
    riseTime: 1.0,
    fallTime: 1.0,
    sustainTime: 0,
    ton: 5.0,
    toff: 5.0,
    numberOfStimulus: 0,
    treatmentTime: 1800,
    frequency: 6,
    pulseWidth: 500,
    maxIntensity: 0,
    targetIntensity: 0,
    initialIntensity: 0,
  },
  custom: {
    treatmentType: 'custom',
    stimulationType: 'synchronous',
    riseTime: 0,
    fallTime: 0,
    sustainTime: 0,
    ton: 0,
    toff: 0,
    numberOfStimulus: 0,
    treatmentTime: 0,
    frequency: 0,
    pulseWidth: 0,
    maxIntensity: 0,
    targetIntensity: 0,
    initialIntensity: 0,
  },
}

export const DEFAULT_ELECTRODE_VALUE: Electrode = {
  type: 'Auto Adesivo',
  format: 'Retangular',
  width: '3',
  height: '5',
  diameter: '3',
  rebeltSize: '5x5',
  selected: false,
}

export const DEFAULT_CHANNEL_VALUE = {
  channelNumber: 0,
  muscleName: '',
  pulseWidth: 0,
  maxIntensity: 30,
  targetIntensity: 15,
  initialIntensity: 15,
  electrode: DEFAULT_ELECTRODE_VALUE,
  selected: false,
}

export const PROTOCOL_INITIAL_VALUE: Protocol = {
  patientId: '',
  name: '',
  description: '',
  createdBy: '',
  createdAt: Date.now(),
  channels: [],
  parameters: DEFAULT_PARAMETERS.strengthGain,
  initialDate: Date.now(),
  finalDate: Date.now(),
  selectedDays: [],
  selectedFrequency: 0,
  warnPatient: false,
  warnProfessional: false,
}

export const PROTOCOL_EXAMPLE_VALUE: Protocol = {
  patientId: 'id123',
  name: 'Ganho de força Semanal',
  description: 'Protocolo para ganho de força semana do paciente de exemplo.',
  createdBy: 'Dra. Jéssica Alba',
  createdAt: new Date('03 Jan 2022 10:56').valueOf(),
  channels: [
    {
      channelNumber: 1,
      muscleName: 'Tibial Anterior',
      pulseWidth: 1200,
      maxIntensity: 30,
      targetIntensity: 15,
      initialIntensity: 15,
      electrode: {
        type: 'ReBELT',
        format: 'Retangular',
        rebeltSize: '9x5',
      },
      images: {
        base64: [],
        uri: [],
        sources: ['2022-01-24T17-30-14.721Z108.jpg'],
        description: 'Descrição da imagem 1',
      },
      intensity: 0,
    },
    {
      channelNumber: 2,
      muscleName: 'Tibial Posterior',
      pulseWidth: 1600,
      maxIntensity: 30,
      targetIntensity: 15,
      initialIntensity: 15,
      electrode: {
        type: 'Auto Adesivo',
        format: 'Retangular',
        width: '5',
        height: '3',
      },
      images: {
        uri: [],
        sources: ['2022-01-24T17-30-25.031Z923.jpg'],
        base64: [],
        description: 'Descrição da imagem 2222',
      },
      intensity: 0,
    },
    {
      channelNumber: 4,
      muscleName: 'Vasto Lateral',
      pulseWidth: 2500,
      maxIntensity: 30,
      targetIntensity: 15,
      initialIntensity: 15,
      electrode: {
        type: 'Auto Adesivo',
        format: 'Retangular',
        width: '5',
        height: '3',
      },
      images: {
        uri: [],
        sources: ['2022-01-24T17-30-35.397Z609.jpg'],
        base64: [],
        description: 'Descrição da imagem 4444',
      },
      intensity: 0,
    },
  ],
  parameters: DEFAULT_PARAMETERS.strengthGain,
  initialDate: new Date('01 Jan 2022').valueOf(),
  finalDate: new Date('31 Feb 2022').valueOf(),
  selectedDays: [0, 1, 5],
  selectedFrequency: 1,
  warnPatient: true,
  warnProfessional: true,
}

export const ELECTRODE_TYPES_LIST = ['Auto Adesivo', 'ReBELT', 'Silicone Carbonado', 'Metálico']

export const REBELT_SIZES_LIST = ['5x5', '9x5', '13x5']

export const ELECTRODE_FORMAT_LIST = ['Retangular', 'Circular']

export const MAXIMUM_INTENSITY: number = 120
