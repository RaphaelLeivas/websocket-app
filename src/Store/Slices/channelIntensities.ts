import { createSlice } from '@reduxjs/toolkit'
import { CHANNEL_INTENSITIES_INITIAL_VALUE } from '@/Types'

const slice = createSlice({
  name: 'channelIntensities',
  initialState: CHANNEL_INTENSITIES_INITIAL_VALUE,
  reducers: {
    updateChannelIntesities: (state, { payload: { newIntensities } }) => {
      if (typeof newIntensities !== 'undefined') {
        return newIntensities
      }
    },
    clearChannelIntensities: () => CHANNEL_INTENSITIES_INITIAL_VALUE,
  },
})

export const { updateChannelIntesities, clearChannelIntensities } = slice.actions

export default slice.reducer
