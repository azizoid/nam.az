import { Footer, Header } from '@/components';

type LayoutProps = {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      {children}

      <Footer />
    </div>
  );
};
