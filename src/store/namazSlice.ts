import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NamazState {
  city: number | null;
  dayOfYear: number | null;
}

const initialState: NamazState = {
  city: null,
  dayOfYear: null,
}

export const namazSlice = createSlice({
  name: 'namaz',
  initialState,
  reducers: {
    setNamazData: (state, action: PayloadAction<NamazState>) => {
      state.city = action.payload.city
      state.dayOfYear = action.payload.dayOfYear

      // NOTE: whenever we change the city, we write it to the localStorage to be able to read on the next homepage load
      localStorage.setItem('city', String(action.payload.city))
    }
  },
})

export const { setNamazData } = namazSlice.actions

export const selectNamazData = (state: { namaz: NamazState }) => state.namaz
