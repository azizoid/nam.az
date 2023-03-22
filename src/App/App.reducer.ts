import { format, getDayOfYear, isLeapYear } from 'date-fns';
import { readLocalStorage, selectCity } from 'utility';

const newDate = new Date();
const dayOfYear = getDayOfYear(newDate);
export const today =
  dayOfYear + (dayOfYear > 59 ? (isLeapYear(newDate) ? 1 : 2) : 0);

const [readCity, writeCity] = readLocalStorage<number>('city', 1);

export type StateProps = {
  city: number;
  location: string;
  currentPrayer: number;
  nowis: string;
  tarix: string;
  hijri: string;
  today: number;
  progress: number;
  ramadan: number;
  prayers: ApiPrayerProps[];
};

type ApiPrayerProps = {
  id: number;
  time: string;
  rakat: number;
  ago: string;
  title: string;
};

export const AppInitialState: StateProps = {
  city: readCity,
  location: '',
  currentPrayer: 5,
  nowis: format(newDate, 'HH:mm'),
  tarix: '',
  hijri: '',
  today: today,
  progress: 0,
  ramadan: 0,
  prayers: [
    { id: 1, time: '-:-', rakat: 2, ago: '', title: 'Sübh namazı' },
    { id: 2, time: '-:-', rakat: 0, ago: '', title: 'Gün çıxır' },
    { id: 3, time: '-:-', rakat: 4, ago: '', title: 'Zöhr namazı' },
    { id: 4, time: '-:-', rakat: 4, ago: '', title: 'Əsr namazı' },
    { id: 5, time: '-:-', rakat: 3, ago: '', title: 'Məğrib namazı' },
    { id: 6, time: '-:-', rakat: 4, ago: '', title: 'İşa namazı' },
  ],
};

export type ActionProps = {
  type: 'init' | 'location' | 'dayOfTheYear';
  payload: Partial<StateProps> | string | number;
};

// The reducer function
export const AppReducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        ...(typeof action.payload === 'object' && action.payload),
      };
    case 'location':
      const cityToNumber = Number(action.payload);

      writeCity(cityToNumber);

      const changeCityTo = selectCity(cityToNumber);

      return {
        ...state,
        location: String(changeCityTo),
        city: cityToNumber,
        today,
      };
    case 'dayOfTheYear': {
      return { ...state, today: Number(action.payload), progress: 0 };
    }

    default:
      throw new Error();
  }
};
