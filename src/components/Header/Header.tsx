import cities from 'assist/cities';

export type HeaderProps = {
  changeCity: (city: number) => void;
  city: number;
};

export const Header = ({ changeCity, city }: HeaderProps): JSX.Element => (
  <div className="bg-gray-100 py-2 px-2">
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
          className="mr-2"
        />
        Nam.az
      </a>

      <div className="flex flex-col">
        <select
          className="border-green-400 bg-green-50 text-sm rounded-md"
          aria-label="Haradasınız?"
          onChange={e => changeCity(Number(e.target.value))}
          value={city}
        >
          {cities.map((cityTitle, index) => (
            <option value={index} key={index}>
              {cityTitle}
            </option>
          ))}
        </select>

        <small>
          Bakı, Gəncə, <u>Şuşa</u> və digər
        </small>
      </div>
    </nav>
  </div>
);
