import { version } from '../../../package.json'

export const Footer = () => (
  <nav className="w-full bg-gray-700 py-3 text-slate-300">
    <ol className="container mx-4 flex px-0 md:mx-auto">
      <li className="mr-6" aria-current="page">
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
      <li className="mr-6">
        <a href="/credits" target="_blank">
          Təşəkkürlər
        </a>
      </li>
      <li className="ml-auto">v{version}</li> {/* Pushes the version to the right */}
    </ol>
  </nav>
)