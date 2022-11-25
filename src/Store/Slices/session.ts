import { createSlice } from '@reduxjs/toolkit'
import { USER_INITIAL_VALUE } from '@/Types'

const slice = createSlice({
  name: 'session',
  initialState: USER_INITIAL_VALUE,
  reducers: {
    login: (state, { payload: { user } }) => {
      if (typeof user !== 'undefined') {
        state.id = user.id
        state.name = user.name
        state.email = user.email
        state.role = user.role
        state.token = user.token
      }
    },
    logout: () => USER_INITIAL_VALUE,
  },
})

export const { login, logout } = slice.actions

export default slice.reducer
