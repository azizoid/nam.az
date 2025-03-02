import { getDay } from "date-fns";
import { FaMosque } from "react-icons/fa6";

export const getSpecialDay = (date: Date, day: number) => {
  const weekday = getDay(date); // 5 means Friday

  const lastOddNights = [19, 21, 23, 25, 27, 29];
  const isQadrNight = lastOddNights.includes(day);
  const isFriday = weekday === 5;

  if (day === 30) return "Bayram";

  if (isQadrNight && isFriday) {
    return (
      <div className="flex items-center gap-2" >
        <FaMosque className="text-yellow-500 text-lg" />
        <span>Cümə </span>
      </div>
    );
  }

  if (isQadrNight) return <FaMosque className="text-yellow-500 text-lg" />;
  if (isFriday) return "Cümə";

  return "";
};