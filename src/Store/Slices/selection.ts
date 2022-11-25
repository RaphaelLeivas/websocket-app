import { createSlice } from '@reduxjs/toolkit'
import { SELECTION_INITIAL_VALUE } from '@/Types'

const slice = createSlice({
  name: 'selection',
  initialState: SELECTION_INITIAL_VALUE,
  reducers: {
    updateSelection: (state, { payload: { type, selection } }) => {
      if (typeof type !== 'undefined' && typeof selection !== 'undefined') {
        state[type] = selection
      }
    },
    clearSelection: () => SELECTION_INITIAL_VALUE,
  },
})

export const { updateSelection, clearSelection } = slice.actions

export default slice.reducer
