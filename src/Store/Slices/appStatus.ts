import { createSlice } from '@reduxjs/toolkit'
import { APP_STATUS_INITIAL_VALUE } from '@/Types'

const slice = createSlice({
  name: 'appStatus',
  initialState: APP_STATUS_INITIAL_VALUE,
  reducers: {
    updateAppStatus: (state, { payload: { type, status } }) => {
      if (typeof type !== 'undefined' && typeof status !== 'undefined') {
        state[type] = status
      }
    },
    clearAppStatus: () => APP_STATUS_INITIAL_VALUE,
  },
})

export const { updateAppStatus, clearAppStatus } = slice.actions

export default slice.reducer
