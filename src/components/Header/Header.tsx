import cities from '../../assist/cities';

export type HeaderProps = {
  changeCity: (city: number) => void;
  city: number;
};

export const Header = ({ changeCity, city }: HeaderProps): JSX.Element => (
  <nav className="flex justify-between container mx-auto">
    <a
      className="py-2 flex items-center content-start text-gray-500 hover:opacity-75"
      href="/"
    >
      <img
        src="/favicon.png"
        width="30"
        height="30"
        alt="nam.az"
        className="mr-3"
      />
      Nam.az
    </a>

    <ul className="flex flex-col items-center">
      <li>
        <select
          className="
          border-green-400 
          bg-green-50 
          text-sm 
          rounded-md 

          "
          aria-label="Haradasınız?"
          onChange={e => changeCity(Number(e.target.value))}
          value={city}
        >
          {cities.map((city, index) => (
            <option value={index} key={index}>
              {city}
            </option>
          ))}
        </select>
      </li>
      <li>
        <small>
          Bakı, Gəncə, <u>Şuşa</u> və digər
        </small>
      </li>
    </ul>
  </nav>
);
