import { Prayer, PrayerProps } from './Prayer';

export type PrayerListProps = {
  prayers: PrayerProps[];
  currentPrayer?: number;
  progress?: number;
};

export const PrayerList = ({
  prayers,
  currentPrayer,
  progress = 0,
}: PrayerListProps): JSX.Element => (
  <div className="grid grid-cols-12 text-center">
    {prayers.map((prayer, index) => {
      let isCur = false;
      const finalClass = [];

      if (index === 1) {
        if (index !== currentPrayer) {
          finalClass.push('text-slate-400');
        }
      } else {
        if (index === currentPrayer) {
          isCur = true;
          finalClass.push(progress < 75 ? 'alert-success' : 'alert-danger');
        }
      }

      return (
        <Prayer
          classes={finalClass.join(' ')}
          prayer={prayer}
          current={isCur}
          index={index}
          key={index}
        />
      );
    })}
  </div>
);
