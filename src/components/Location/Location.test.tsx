import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockDate from 'mockdate';

import Location from './Location';

const mockDate = Date.parse('2021-12-06T01:14:36.710Z');

MockDate.set(mockDate);

const mockProps = {
  location: 'Bakı',
  tarix: 'Şənbə, 2 aprel 2022',
  dd: 93,
  changeDd: jest.fn(),
};

test('renders Location', async () => {
  const { container, getByText } = render(<Location {...mockProps} />);

  const city = getByText('Bakı');

  expect(city).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});
