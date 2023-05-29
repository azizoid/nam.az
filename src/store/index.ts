import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { namazSlice } from './namazSlice'

export const store = configureStore({
  reducer: {
    namaz: namazSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
