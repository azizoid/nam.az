import { render } from '@testing-library/react';
import React from 'react';
import { PrayerList } from './PrayerList';

const mock = [
  { id: 1, title: 'Fəcr namazı', time: '-:-', rakat: 2, ago: '1 minute ago' },
  { id: 2, title: 'Günəş', time: '-:-', rakat: 0, ago: '2 minutes ago' },
  { id: 3, title: 'Zöhr namazı', time: '-:-', rakat: 4, ago: '3 minutes ago' },
  { id: 4, title: 'Əsr namazı', time: '-:-', rakat: 4, ago: '4 minutes ago' },
  {
    id: 5,
    title: 'Məğrib namazı',
    time: '-:-',
    rakat: 3,
    ago: '5 minutes ago',
  },
  { id: 6, title: 'İşa namazı', time: '-:-', rakat: 4, ago: '6 minutes ago' },
];

test('renders PrayerList component', async () => {
  const { container, findAllByText } = render(
    <PrayerList prayers={mock} currentPrayer={2} />
  );

  const prayers = await findAllByText(/namazı/);
  expect(prayers).toHaveLength(5);

  expect(container).toMatchSnapshot();
});
