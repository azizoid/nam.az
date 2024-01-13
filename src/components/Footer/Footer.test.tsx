import { render } from '@testing-library/react'

import MockDate from 'mockdate'

import { Footer } from './Footer'

const mockDate = Date.parse('2023-12-06T01:14:36.710Z')

MockDate.set(mockDate)

test('renders Footer component', () => {
  const { container } = render(<Footer />)

  expect(container).toMatchSnapshot()
})
