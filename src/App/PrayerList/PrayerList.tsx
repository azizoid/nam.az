import { Prayer, PrayerProps } from './Prayer';

export type PrayerListProps = {
  prayers: PrayerProps[];
  currentPrayer?: number;
  progress?: number;
};

export const PrayerList = ({ prayers, currentPrayer }: PrayerListProps) => (
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
          finalClass.push('alert-success');
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
