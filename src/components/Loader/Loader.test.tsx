import React from 'react'

import { render } from '@testing-library/react'

import { Loader } from './Loader'

test('renders PrayerList component', () => {
  const { container } = render(<Loader />)

  expect(container).toMatchSnapshot()
})
