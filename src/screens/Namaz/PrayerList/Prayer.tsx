import { MdBrightness7 } from 'react-icons/md'

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
  prayer: { title, time, ago },
  classes,
  current,
  index,
}: PrayerContainerProps) => (
  <div className={`prayer alert ${classes}`}>
    <h6 className="w-full text-right md:w-auto">{title}</h6>

    <div className="flex w-full flex-col md:w-auto">
      <h4 className="text-2xl">{time}</h4>

      <div className="flex justify-center">
        {!current ? (
          index === 1 ? (
            <MdBrightness7 className="text-yellow-400" />
          ) : (
            <small>{ago}</small>
          )
        ) : (
          <span className="badge badge-yellow">
            Zaman varkən,
            <br />
            Namazını qıl!
          </span>
        )}
      </div>
    </div>
  </div>
)
