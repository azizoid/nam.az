import { render } from '@testing-library/react'

import { Footer } from './Footer'

test('renders Footer component', () => {
  const { container } = render(<Footer />)

  expect(container).toMatchSnapshot()
})
