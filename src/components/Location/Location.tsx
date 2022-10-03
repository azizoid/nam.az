import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { Clock } from './Clock/Clock';

export type LocationProps = {
  location: string;
  tarix: string;
  hijri?: string;
  dd: number;
  changeDd: (dd: number) => void;
};

export const Location = ({
  location,
  tarix,
  hijri,
  dd,
  changeDd,
}: LocationProps): JSX.Element => (
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
        {tarix}, <span className="whitespace-nowrap">{hijri}</span>
      </small>
    </div>

    <button className="btn text-blue-300" onClick={() => changeDd(dd + 1)}>
      <MdNavigateNext />
    </button>
  </div>
);
