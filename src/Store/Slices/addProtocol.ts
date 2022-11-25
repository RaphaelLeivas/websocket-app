import { createSlice } from '@reduxjs/toolkit'
import { PROTOCOL_INITIAL_VALUE } from '@/Types'

const slice = createSlice({
  name: 'addProtocol',
  initialState: PROTOCOL_INITIAL_VALUE,
  reducers: {
    updateProtocol: (state, { payload: { newValuesObject } }) => {
      if (typeof newValuesObject !== 'undefined') {
        state = Object.assign(state, newValuesObject) // junta o estado anterior com o novo
      }
    },
    clearProtocol: () => PROTOCOL_INITIAL_VALUE,
  },
})

export const { updateProtocol, clearProtocol } = slice.actions

export default slice.reducer
