import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Role } from '../../server/types.ts'
import { type Credentials, services } from '../api/services.ts'
import type { AppThunk, RootState } from './index.ts'

/** localStorage key of the login token: the visitor stays logged in after a reload. */
export const TOKEN_KEY = 'rika-react-fundamentals:token'

export function loadToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveToken(token: string) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Private mode or blocked storage: the login lasts until the page is closed.
  }
}

export type UserState = {
  isAuth: boolean
  name: string
  email: string
  token: string
  role: Role | ''
  /** A token was found at start-up and /users/me has not answered yet. */
  checking: boolean
}

const loggedOutState = (): UserState => ({
  isAuth: false,
  name: '',
  email: '',
  token: '',
  role: '',
  checking: false,
})

/** Logs in, then asks /users/me for the role, which the login answer does not contain. */
export const login = createAsyncThunk('user/login', async (credentials: Credentials) => {
  const { result: token } = await services.login(credentials)
  const { name, email, role } = await services.me(token)
  saveToken(token)
  return { token, name, email, role }
})

/** At start-up: whose is the saved token? A token that no longer works is forgotten. */
export const fetchCurrentUser = createAsyncThunk<
  Awaited<ReturnType<typeof services.me>>,
  void,
  { state: RootState }
>('user/fetchCurrentUser', async (_, { getState }) => {
  try {
    return await services.me(getState().user.token)
  } catch (error) {
    saveToken('')
    throw error
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: (): UserState => {
    const token = loadToken()
    return { ...loggedOutState(), token, checking: Boolean(token) }
  },
  reducers: {
    loggedOut: loggedOutState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (_, { payload }) => ({
        ...payload,
        isAuth: true,
        checking: false,
      }))
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => ({
        ...state,
        isAuth: true,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        checking: false,
      }))
      .addCase(fetchCurrentUser.rejected, loggedOutState)
  },
})

export const { loggedOut } = userSlice.actions
export const userReducer = userSlice.reducer

/** Logs out at once on the page, then tells the backend to forget the token. */
export const logout = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
  const { token } = getState().user
  dispatch(loggedOut())
  saveToken('')
  if (token) await services.logout(token).catch(() => undefined)
}
