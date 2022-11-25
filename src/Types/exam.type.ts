export type Exam = {
  examId?: string
  patientId: string
  equipmentId: string
  operatedBy: string
  dateStart: number
  dateEnd: number
  type: EXAM_TYPES
  examData: ExamData[]
}

export type ExamData = {
  muscleName: string
  channel: number
  instrument: EXAM_INSTRUMENTS
  maxIntensity: number,
  rheobase: number
  chronaxie: number
  accommodation: number
}

export enum EXAM_INSTRUMENTS {
  ELECTRODE = 1,
  REPEN = 2,
}

export enum EXAM_TYPES {
  TREATMENT = 0,
	TDE = 1,
	TWITCH = 2,
	TETANIC = 3,
	CID = 4,
	RECOVERY = 5,
	RESULT = 6,
	PATIENT = 7,
}
