import { MdBrightness7 } from 'react-icons/md';

export type PrayerProps = {
  id: number;
  title: string;
  time: string;
  rakat: number;
  ago: string;
};

export type PrayerContainerProps = {
  prayer: PrayerProps;
  classes: string;
  current: boolean;
  index: number;
};

export const Prayer = ({
  prayer,
  classes,
  current,
  index,
}: PrayerContainerProps): JSX.Element => (
  <div className={`col-span-4 alert ${classes}`}>
    <h6 className="col-7 col-md-12 align-self-center">{prayer.title}</h6>

    <h4 className="text-2xl">{prayer.time}</h4>

    <div className="flex justify-center">
      {!current ? (
        index !== 1 ? (
          <small>{prayer.ago}</small>
        ) : (
          <MdBrightness7 className="text-yellow-400" />
        )
      ) : (
        <span className="badge badge-yellow">Zaman varkən, Namazını qıl</span>
      )}
    </div>
  </div>
);
