import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { Clock } from './Clock/Clock';
import Link from 'next/link';

export type LocationProps = {
  city: number;
  location: string;
  tarix: string;
  hijri?: string;
  dayOfYear: number;
};

export const Location = ({
  city,
  location,
  tarix,
  hijri,
  dayOfYear,
}: LocationProps) => {
  console.log(dayOfYear)
  return (
    <div className="flex justify-around align-middle">
      <Link href={`/${city}/${dayOfYear - 1}`} className="btn text-blue-300">
        <MdNavigateBefore />
      </Link>
      {/* <button className="btn text-blue-300" onClick={() => navigate(dayOfYear - 1)}>
        <MdNavigateBefore />
      </button> */}

      <div className="flex flex-col space-y-2 text-center text-3xl font-semibold">
        <h2 className="text-slate-300">
          <Clock />
        </h2>

        <h2>{location}</h2>

        <small className="text-sm font-normal">
          {tarix}, <span className="whitespace-nowrap">{hijri}</span>
        </small>
      </div>

      {/* <button className="btn text-blue-300" onClick={() => navigate(dayOfYear + 1)}>
        <MdNavigateNext />
      </button> */}
      <Link href={`/${city}/${dayOfYear + 2}`} className="btn text-blue-300">
        <MdNavigateNext />
      </Link>
    </div >
  )
};
