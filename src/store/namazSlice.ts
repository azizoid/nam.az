import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NamazState {
  city: number | null;
  dayOfYear: number | null;
}

const initialState: NamazState = {
  city: null,
  dayOfYear: null,
};

export const namazSlice = createSlice({
  name: 'namaz',
  initialState,
  reducers: {
    setNamazData: (state, action: PayloadAction<NamazState>) => {
      state.city = action.payload.city;
      state.dayOfYear = action.payload.dayOfYear;
    },
    setCity: (state, action: PayloadAction<Pick<NamazState, 'city'>>) => {
      state.city = action.payload.city
    }
  },
});

export const { setNamazData, setCity } = namazSlice.actions;

export const selectNamazData = (state: { namaz: NamazState }) => state.namaz;
