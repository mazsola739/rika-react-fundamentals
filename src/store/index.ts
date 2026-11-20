import {
  combineReducers,
  configureStore,
  type ThunkAction,
  type UnknownAction,
} from '@reduxjs/toolkit'
import { authorsReducer } from './authorsSlice.ts'
import { coursesReducer } from './coursesSlice.ts'
import { userReducer } from './userSlice.ts'

/** The store of the course's model: user, courses and authors, each with its own reducer. */
const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  authors: authorsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState })

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<Result = void> = ThunkAction<Result, RootState, unknown, UnknownAction>
