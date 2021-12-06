import classNames from 'classnames';

import styles from './Progress.module.scss';

export type ProgressProps = {
  bar: number;
};

export const Progress = ({ bar }: ProgressProps): JSX.Element => (
  <div className={styles.progress}>
    <div
      className={classNames(
        styles.progress,
        bar > 75 ? 'bg-danger' : 'bg-info'
      )}
      role="progressbar"
      style={{ width: bar + '%' }}
      aria-valuenow={bar}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  </div>
);
