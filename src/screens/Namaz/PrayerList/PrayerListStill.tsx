import { MdBrightness7 } from 'react-icons/md'

import { PrayerListProps } from './PrayerList'

export const PrayerListStill = ({ prayers }: PrayerListProps) => (
  <div className="grid grid-cols-12 text-center">
    {prayers.map((prayer, index) => (
      <div className="prayer alert text-slate-400" key={index}>
        <h6>{prayer.title}</h6>

        <div className="flex flex-col">
          <h4 className="text-2xl">{prayer.time}</h4>

          <div className="flex justify-center">
            {index === 1 && <MdBrightness7 />}
          </div>
        </div>
      </div>
    ))}
  </div>
)
