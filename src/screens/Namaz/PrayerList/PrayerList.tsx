import { Prayer, PrayerProps } from './Prayer'

export type PrayerListProps = {
  prayers: PrayerProps[];
  currentPrayer?: number;
};

export const PrayerList = ({ prayers, currentPrayer }: PrayerListProps) => (
  <div className="grid grid-cols-12 text-center">
    {prayers.map((prayer, index) => {
      const isCur = index === currentPrayer && index !== 1
      const classes = isCur ? 'alert-success' : index === 1 ? 'text-slate-400' : ''

      return (
        <Prayer
          classes={classes}
          prayer={prayer}
          current={isCur}
          index={index}
          key={prayer.id}
        />
      )
    })}
  </div>
)
