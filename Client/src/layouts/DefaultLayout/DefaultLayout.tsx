import Header from '~/layouts/Components/Header';

interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="d-flex">{children}</div>
    </div>
  );
}

export default DefaultLayout;
