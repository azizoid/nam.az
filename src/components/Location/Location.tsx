import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import classNames from 'classnames';

import { Clock } from './Clock/Clock';

import styles from './Location.module.scss';

export type LocationProps = {
  location: string;
  tarix: string;
  hijri: string;
  dd: number;
  changeDd: (dd: number) => void;
};

const Location = ({
  location,
  tarix,
  dd,
  changeDd,
}: LocationProps): JSX.Element => (
  <div
    className={classNames(
      'd-flex',
      'align-items-center',
      'justify-content-center'
    )}
  >
    <button
      className={classNames('btn', 'btn-link', styles.locationNavBtn)}
      onClick={() => changeDd(dd - 1)}
    >
      <MdNavigateBefore />
    </button>

    <div className={classNames('text-center', 'col-md-5', styles.location)}>
      <h2 className={classNames('d-none', 'd-md-block', styles.nowis)}>
        <Clock />
      </h2>

      <h2>{location}</h2>

      <small>{tarix}</small>
      {/* <br />
      <small>{hijri}</small> */}
    </div>

    <button
      className={classNames('btn', 'btn-link', styles.locationNavBtn)}
      onClick={() => changeDd(dd + 1)}
    >
      <MdNavigateNext />
    </button>
  </div>
);

export default Location;
