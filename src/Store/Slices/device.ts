import { createSlice } from '@reduxjs/toolkit'
import { DEVICE_INITIAL_VALUE } from '@/Types'

const slice = createSlice({
  name: 'device',
  initialState: DEVICE_INITIAL_VALUE,
  reducers: {
    updateDevice: (state, { payload: { device } }) => {
      if (typeof device !== 'undefined') {
        state = Object.assign(state, device)
      }
    },
    clearDevice: () => DEVICE_INITIAL_VALUE,
  },
})

export const { updateDevice, clearDevice } = slice.actions

export default slice.reducer
