import { TLocation } from "../../assist/types";
import {
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import classnames from 'classnames'

import Clock from "../clock.component";

import styles from "./Location.module.css"

const Location = ({ location, tarix, dd, changeDd }: TLocation):JSX.Element => (
  <div className="d-flex align-items-center justify-content-center">
    <button
      className={classnames("btn", "btn-link", styles.locationNavBtn)}
      onClick={() => changeDd(dd - 1)}
    >
      <MdNavigateBefore />
    </button>
    <div className="text-center col-md-5" id="location">
      <h1 className="nowis d-none d-md-block">
        <Clock />
      </h1>
      <h1>{location}</h1>
      <small>{tarix}</small>
      {/* <br />
      <small>{hijri}</small> */}
    </div>
    <button
      className={classnames("btn", "btn-link", styles.locationNavBtn)}
      onClick={() => changeDd(dd + 1)}
    >
      <MdNavigateNext />
    </button>
  </div>
);

export default Location;
