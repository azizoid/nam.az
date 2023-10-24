import { fireEvent, render, screen } from '@testing-library/react'

import { Header } from './Header'

// Typescript example:
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...props: any[]) => {
    const dynamicModule = jest.requireActual('next/dynamic')
    const dynamicActualComp = dynamicModule.default
    const RequiredComponent = dynamicActualComp(props[0])
    RequiredComponent.preload ? RequiredComponent.preload() : RequiredComponent.render.preload()
    return RequiredComponent
  }
}))

jest.mock('@/components/MapModal/MapModal', () => {
  return {
    __esModule: true, // this property makes it work
    default: ({ open }: { open: boolean }) => (
      <div data-testid="mockMapModal">
        {open ? 'MapModal is open' : 'MapModal is closed'}
      </div>
    ),
  }
})

describe('Header component', () => {
  it('should not render mock MapModal initially', async () => {
    render(<Header />)

    const mapModal = screen.queryByTestId('mockMapModal')
    expect(mapModal).toHaveTextContent('MapModal is closed')
  })

  it('should render mock MapModal when button is clicked', async () => {
    render(<Header />)

    const button = screen.getByText(/Xəritə/)
    fireEvent.click(button)

    const mapModal = screen.queryByTestId('mockMapModal')
    expect(mapModal).toHaveTextContent('MapModal is open')
  })
})
