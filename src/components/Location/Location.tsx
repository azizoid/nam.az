import moment from 'moment-hijri';
moment.locale('az');
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { hijriMonthList } from '../../assist/hijriMonthList';
import { numberSuffixAz } from '../../utility/numberSuffixAz/numberSuffixAz';

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
  const momentTarix = moment(tarix);

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
          {hijriMonthList[Number(momentTarix.format('iM')) - 1]} ayı{', '}
          {numberSuffixAz(Number(momentTarix.format('iD')))} gün{', '}
          {numberSuffixAz(Number(momentTarix.format('iYYYY')))} il
          <br />
          {tarix}
        </small>
      </div>

      <button className="btn text-blue-300" onClick={() => changeDd(dd + 1)}>
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Location;
