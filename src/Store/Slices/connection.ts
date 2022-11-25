import { createSlice } from '@reduxjs/toolkit'
import { CONNECTION_INITIAL_VALUE } from '@/Types'

const slice = createSlice({
  name: 'connection',
  initialState: CONNECTION_INITIAL_VALUE,
  reducers: {
    setConnectionStatus: (state, { payload: { type, status } }) => {
      if (typeof type !== 'undefined' && typeof status !== 'undefined') {
        state[type] = status
      }
    },
    clearConnection: () => CONNECTION_INITIAL_VALUE,
  },
})

export const { setConnectionStatus, clearConnection } = slice.actions

export default slice.reducer
