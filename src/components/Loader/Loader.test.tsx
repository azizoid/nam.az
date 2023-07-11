import React from 'react'

import { render } from '@testing-library/react'

import { Loader } from './Loader'

test('renders Loader component', () => {
  const { container } = render(<Loader />)

  expect(container).toMatchSnapshot()
})
