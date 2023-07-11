import { useState } from 'react'

import { useInterval } from '@/utilities/useInterval'

import styles from './Clock.module.css'

const date2date = () =>
  new Date().toLocaleTimeString('az', {
    timeZone: 'Asia/Baku',
    hour12: false,
  })

export const Clock = () => {
  const [date, setDate] = useState(() => date2date())

  useInterval(() => {
    setDate(date2date())
  }, 1000)

  return <p className={styles.clock}>{date}</p>
}
