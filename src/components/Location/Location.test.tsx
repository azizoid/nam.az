import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockDate from 'mockdate';

import Location from './Location';

import { format, getDayOfYear } from 'date-fns';

const mockDate = Date.parse('2021-12-06T01:14:36.710Z');

MockDate.set(mockDate);

const mockProps = {
  location: 'Bakı',
  currentPrayer: -1,
  nowis: format(mockDate, 'HH:mm'),
  tarix: format(mockDate, 'EEEE, d MMMM yyyy'),
  hijri: '',
  dd: getDayOfYear(mockDate) + 1,
  progress: 0,
  ramadan: 0,
  changeDd: jest.fn(),
};

test('renders App', async () => {
  const { container, getByText } = render(<Location {...mockProps} />);

  const city = getByText('Bakı');

  expect(city).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});
