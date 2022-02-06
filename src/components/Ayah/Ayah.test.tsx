import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Ayah from './Ayah';

test('renders App', async () => {
  const { container } = render(<Ayah />);
  expect(container).toMatchSnapshot();
});
