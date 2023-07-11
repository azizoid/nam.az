import { fireEvent, render } from '@testing-library/react'

import { Header } from './Header'

test.skip('renders PrayerList component', () => {
  const { container, getByRole } = render(<Header />)

  const citiesList = getByRole('combobox', { name: 'Haradasınız?' })

  fireEvent.change(citiesList)

  expect(container).toMatchSnapshot()
})
