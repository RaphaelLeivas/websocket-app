export type RoleTypes = 'patient' | 'professional' | 'visuri' | ''

export type User = {
  id: string
  name: string
  role: RoleTypes
  email: string
  token: string | null
}

export const USER_INITIAL_VALUE: User = {
  id: '',
  name: '',
  role: '',
  email: '',
  token: null,
}
