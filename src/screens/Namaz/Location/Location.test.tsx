import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import MockDate from 'mockdate'

import { Location, LocationProps } from './Location'

const mockDate = Date.parse('2021-12-06T01:14:36.710Z')

MockDate.set(mockDate)

const mockProps: LocationProps = {
  city: 1,
  location: 'Bakı',
  tarix: 'Şənbə, 2 aprel 2022',
  dayOfYear: 93,
}

test('renders Location', async () => {
  const { container } = render(<Location {...mockProps} />)

  const city = screen.getByText('Bakı')

  expect(city).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})
