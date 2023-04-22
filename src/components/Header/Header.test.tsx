import { fireEvent, render } from '@testing-library/react'

import { Header, HeaderProps } from './Header'

const mockProp: HeaderProps = {
  city: 2,
  changeCity: jest.fn(),
}

test('renders PrayerList component', () => {
  const { container, getByRole } = render(<Header {...mockProp} />)

  const citiesList = getByRole('combobox', { name: 'Haradasınız?' })

  fireEvent.change(citiesList)

  expect(mockProp.changeCity).toHaveBeenCalled()

  expect(container).toMatchSnapshot()
})
