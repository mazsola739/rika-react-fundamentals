import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Author } from '../../server/types.ts'
import { services } from '../api/services.ts'
import type { LoadStatus } from './coursesSlice.ts'
import type { RootState } from './index.ts'

export type AuthorsState = {
  items: Author[]
  status: LoadStatus
}

const initialState: AuthorsState = { items: [], status: 'idle' }

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', () => services.getAuthors())

export const addAuthor = createAsyncThunk<Author, string, { state: RootState }>(
  'authors/addAuthor',
  (name, { getState }) => services.addAuthor(name, getState().user.token),
)

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAuthors.fulfilled, (state, { payload }) => {
        state.items = payload
        state.status = 'ready'
      })
      .addCase(fetchAuthors.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(addAuthor.fulfilled, (state, { payload }) => {
        state.items.push(payload)
      })
  },
})

export const authorsReducer = authorsSlice.reducer
