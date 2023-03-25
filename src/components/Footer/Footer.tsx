export const Footer = () => (
  <nav className="sticky top-[100vh] w-full py-3 bg-gray-700 text-slate-300">
    <ol className="w-lg flex px-0 mx-4 md:mx-auto container">
      <li className="active mr-6" aria-current="page">
        &copy; {new Date().getFullYear()}
      </li>
      <li className="mr-6">
        <a href="https://www.nam.az">Nam.az</a>
      </li>
      <li className="mr-6">
        <a href="https://www.quran.az" target="_blank">
          Quran.az
        </a>
      </li>
    </ol>
  </nav>
);
