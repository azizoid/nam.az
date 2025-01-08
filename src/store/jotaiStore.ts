import { atom } from 'jotai'

interface NamazState {
  city: string | null;
  dayOfYear: number | null;
}

export const cityAtom = atom<string | null>(null)
export const dayOfYearAtom = atom<number | null>(null)

export const setNamazDataAtom = atom(
  null,
  (get, set, data: NamazState) => {
    set(cityAtom, data.city)
    set(dayOfYearAtom, data.dayOfYear)

    // Write to localStorage
    if (data.city !== null) {
      localStorage.setItem('namaz:city', data.city)
    }
  }
)