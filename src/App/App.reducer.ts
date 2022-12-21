import { format, getDayOfYear, isLeapYear } from 'date-fns';
import { selectCity } from 'utility';

const newDate = new Date();
const today = getDayOfYear(newDate) + (isLeapYear(newDate) ? 0 : 1);

export type StateProps = {
  city?: number;
  location: string;
  currentPrayer: number;
  nowis: string;
  tarix: string;
  hijri: string;
  today: number;
  progress: number;
  ramadan: number;
};

export const AppInitialState: StateProps = {
  city: 1,
  location: 'Bakı',
  currentPrayer: 5,
  nowis: format(newDate, 'HH:mm'),
  tarix: '',
  hijri: '',
  today: today,
  progress: 0,
  ramadan: 0,
};

type ActionProps = {
  type: 'init' | 'location' | 'dayOfTheYear' | 'chaneCity'; //| 'currentPrayer' | 'hijri' | 'tarix' | 'progress' ;
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
      const changeCityTo = selectCity(Number(action.payload));
      return {
        ...state,
        location: String(changeCityTo),
        city: Number(action.payload),
        today,
      };
    case 'dayOfTheYear':
      return { ...state, today: Number(action.payload) };
    // case 'currentPrayer':
    //   return { ...state, currentPrayer: Number(action.payload) };
    // case 'hijri':
    //   return { ...state, hijri: String(action.payload) };
    // case 'tarix':
    //   return { ...state, tarix: String(action.payload) };
    // case 'progress':
    //   return { ...state, progress: Number(action.payload) };

    default:
      throw new Error();
  }
};
