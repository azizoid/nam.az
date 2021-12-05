import { shallow } from "enzyme";

import Ayah from "./Ayah";

it("expect to render ayah component", () => {
  const wrapper = shallow(<Ayah />);
  expect(wrapper).toMatchSnapshot();
});
