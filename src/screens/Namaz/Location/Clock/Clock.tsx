import { useEffect, useState } from 'react'

import styles from './Clock.module.css'

const date2date = () =>
  new Date().toLocaleTimeString('az', {
    timeZone: 'Asia/Baku',
    hour12: false,
  })

export const Clock = () => {
  const [date, setDate] = useState(date2date())

  const tick = () => {
    setDate(date2date())
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)

    return () => {
      clearInterval(timerID)
    }
  })

  return <p className={styles.clock}>{date}</p>
}
