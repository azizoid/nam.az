import React, { useState, useEffect } from 'react';

import styles from './Clock.module.scss';

const date2date = () =>
  new Date().toLocaleTimeString('az', {
    timeZone: 'Asia/Baku',
    hour12: false,
  });

export const Clock = () => {
  const [date, setDate] = useState(date2date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  });

  const tick = () => {
    setDate(date2date());
  };

  return <p className={styles.clock}>{date}</p>;
};
