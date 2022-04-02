import moment from 'moment-hijri';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { hijriMonthList } from '../../assist/hijriMonthList';

import { Clock } from './Clock/Clock';

export type LocationProps = {
  location: string;
  tarix: string;
  hijri: string;
  dd: number;
  changeDd: (dd: number) => void;
};

const Location = ({
  location,
  tarix,
  dd,
  changeDd,
}: LocationProps): JSX.Element => {
  const hijri = moment(tarix);

  return (
    <div className="flex justify-around align-middle">
      <button className="btn text-blue-300" onClick={() => changeDd(dd - 1)}>
        <MdNavigateBefore />
      </button>

      <div className="flex flex-col space-y-2 text-center text-3xl font-semibold">
        <h2 className="text-slate-300">
          <Clock />
        </h2>

        <h2>{location}</h2>

        <small className="text-sm font-normal">
          {hijriMonthList[Number(hijri.format('iM')) - 1]} ayı{', '}
          {hijri.format('iD, iYYYY')} / {tarix}
        </small>
      </div>

      <button className="btn text-blue-300" onClick={() => changeDd(dd + 1)}>
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Location;
