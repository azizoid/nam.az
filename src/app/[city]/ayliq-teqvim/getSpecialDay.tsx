import { FaMosque } from 'react-icons/fa6'

import { getDay } from 'date-fns'

export const getSpecialDay = (date: Date, day: number) => {
  const weekday = getDay(date) // 5 means Friday

  const lastOddNights = [19, 21, 23, 25, 27, 29]
  const isQadrNight = lastOddNights.includes(day)
  const isFriday = weekday === 5

  if (day === 30) return 'Bayram'

  if (isQadrNight && isFriday) {
    return (
      <div className="flex flex-col gap-0" >
        <FaMosque className="text-yellow-500 text-lg m-auto" />
        <span>Cümə</span>
      </div>
    )
  }

  if (isQadrNight) return <FaMosque className="text-yellow-500 text-lg m-auto" />
  if (isFriday) return 'Cümə'

  return ''
}