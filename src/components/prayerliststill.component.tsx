import { TPrayerList } from "../assist/types";

import { MdBrightness7 } from "react-icons/md";

export const PrayerListStill = ({ prayers }: TPrayerList):JSX.Element => (
  <div className="row" id="times">
    {prayers.map((prayer, index) => (
        <div className="col-sm-12 col-md-4 alert alert-light text-muted">
          <div className="row">
            <h6 className="col-7 col-md-12 align-self-center">{prayer.title}</h6>

            <div className="col-5 col-md-12">
              <h4>{prayer.time}</h4>

              {index === 1 && (
                <MdBrightness7  />
              )}
            </div>
          </div>
        </div>
      )
    )}
  </div>
);
