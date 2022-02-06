export const Footer = (): JSX.Element => (
  <nav className="py-4 bg-gray-700 text-slate-300">
    <ol className="container mx-auto w-lg flex">
      <li className="active mr-6" aria-current="page">
        &copy; {new Date().getFullYear()}
      </li>
      <li className="mr-6">
        <a href="https://www.nam.az">Nam.az</a>
      </li>
      <li className="mr-6">
        <a
          href="https://www.quran.az"
          rel=" noopener noreferrer"
          target="_blank"
        >
          Quran.az
        </a>
      </li>
    </ol>
  </nav>
);
