import { createSlice } from '@reduxjs/toolkit'
import { TREATMENT_INITIAL_VALUE } from '@/Types'

const slice = createSlice({
  name: 'treatment',
  initialState: TREATMENT_INITIAL_VALUE,
  reducers: {
    updateTreatment: (state, { payload: { newValuesObject } }) => {
      if (typeof newValuesObject !== 'undefined') {
        state = Object.assign(state, newValuesObject) // junta o estado anterior com o novo
      }
    },
    clearTreatment: () => TREATMENT_INITIAL_VALUE,
  },
})

export const { updateTreatment, clearTreatment } = slice.actions

export default slice.reducer
