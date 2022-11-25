import { createSlice } from '@reduxjs/toolkit'
import { SETTINGS_INITIAL_VALUE } from '@/Types'

const slice = createSlice({
  name: 'settings',
  initialState: SETTINGS_INITIAL_VALUE,
  reducers: {
    updateSettings: (state, { payload: { type, info } }) => {
      if (typeof type !== 'undefined' && typeof info !== 'undefined') {
        state[type] = info
      }
    },
    clearAppInfo: () => SETTINGS_INITIAL_VALUE,
  },
})

export const { updateSettings, clearAppInfo } = slice.actions

export default slice.reducer
