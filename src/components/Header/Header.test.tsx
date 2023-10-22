import { act, fireEvent, render, screen } from '@testing-library/react';
import { Header } from './Header'; // Replace with the actual import

// Mock the dynamically imported MapModal component
jest.mock('@/components/MapModal/MapModal', 
  () =>  ({ open }:{ open: boolean }) => (
      <div data-testid="mockMapModal">
        {open ? 'MapModal is open' : 'MapModal is closed'}
      </div>
    )
  )

describe('Header component', () => {
  it('should not render mock MapModal initially', async () => {
    await act(async () => {
      render(<Header />);
    });
    const mapModal = screen.queryByTestId('mockMapModal');
    expect(mapModal).toHaveTextContent('MapModal is closed');
  });

  it('should render mock MapModal when button is clicked', async () => {
    await act(async () => {
      render(<Header />);
    });
    
    const button = screen.getByText(/Xəritə/);
    fireEvent.click(button);
    
    const mapModal = screen.queryByTestId('mockMapModal');
    expect(mapModal).toHaveTextContent('MapModal is open');
  });
});
