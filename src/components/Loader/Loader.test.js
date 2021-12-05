import { shallow } from "enzyme";

import React from "react";
import Loader from "./Loader";

it("expect to render loader component", () => {
  const wrapper = shallow(<Loader />);
  expect(wrapper).toMatchSnapshot();
});
