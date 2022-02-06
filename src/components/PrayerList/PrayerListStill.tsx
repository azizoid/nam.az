import { MdBrightness7 } from 'react-icons/md';
import { PrayerListProps } from './PrayerList';

export const PrayerListStill = ({ prayers }: PrayerListProps): JSX.Element => (
  <div className="grid grid-cols-12 text-center">
    {prayers.map((prayer, index) => (
      <div className="col-span-4 alert text-slate-400" key={index}>
        <h6 className="col-7 col-md-12 align-self-center">{prayer.title}</h6>

        <h4 className="text-2xl">{prayer.time}</h4>

        <div className="flex justify-center">
          {index === 1 && <MdBrightness7 />}
        </div>
      </div>
    ))}
  </div>
);
