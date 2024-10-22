import { create } from 'zustand'

interface NamazState {
  city: string | null;
  dayOfYear: number | null;
}

interface NamazActions {
  setNamazData: (data: NamazState) => void;
}

export const useNamazStore = create<NamazState & NamazActions>((set) => ({
  city: localStorage.getItem('namaz:city') || null, // Load from localStorage on init
  dayOfYear: null,
  setNamazData: (data: NamazState) => {
    set({ city: data.city, dayOfYear: data.dayOfYear })

    // Write to localStorage
    localStorage.setItem('namaz:city', String(data.city))
  }
}))