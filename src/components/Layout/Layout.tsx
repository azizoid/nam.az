import { Footer, Header } from '@/components';

type LayoutProps = {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {

  const changeCity = (newCity: number) => {
    // dispatch({ type: 'location', payload: newCity });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header changeCity={changeCity} city={1} />

      {children}

      <Footer />
    </div>
  );
};
