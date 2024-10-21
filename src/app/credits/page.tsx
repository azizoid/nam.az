// pages/credits.tsx
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiJest, SiGithub, SiMongodb, SiGooglemaps } from 'react-icons/si'

const Credits = () => (
  <div className="flex flex-col justify-center p-6 container mx-auto">
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">İstifadə Edilən Texnologiyalar</h2>
      <div className="grid grid-cols-3 gap-6 md:grid-cols-4">
        {/* Icons from react-icons with localized titles */}
        <div className="flex flex-col items-center">
          <SiNextdotjs size={50} />
          <p className="mt-2 text-center">Next.js</p>
        </div>
        <div className="flex flex-col items-center">
          <SiTypescript size={50} color="#3178c6" />
          <p className="mt-2 text-center">TypeScript</p>
        </div>
        <div className="flex flex-col items-center">
          <SiTailwindcss size={50} color="#38b2ac" />
          <p className="mt-2 text-center">Tailwind CSS</p>
        </div>
        <div className="flex flex-col items-center">
          <SiJest size={50} color="#c21325" />
          <p className="mt-2 text-center">Jest</p>
        </div>
        <div className="flex flex-col items-center">
          <SiGithub size={50} />
          <p className="mt-2 text-center">GitHub</p>
        </div>
        <div className="flex flex-col items-center">
          <SiMongodb size={50} color="#47A248" />
          <p className="mt-2 text-center">MongoDB</p>
        </div>
        <div className="flex flex-col items-center">
          <SiGooglemaps size={50} color="#4285F4" />
          <p className="mt-2 text-center">Google Maps API</p>
        </div>
      </div>
    </div>

    <div>
      <h2 className="mb-4 text-xl font-semibold">Təşəkkürlər</h2>

      <p className="mb-4">
        Arxa fon şəkli
        <a href="https://www.freepik.com/free-vector/flat-design-polygonal-background_13164433.htm?log-in=google#query=svg%20background&position=8&from_view=keyword&track=ais_hybrid&uuid=39027e76-5726-48d7-a263-9d380c0091b5"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-blue-500 underline">
          freepik
        </a> tərəfindən hazırlanıb.
      </p>
      <p className="mb-4">
        Namaz vaxtı skripti
        <a href="http://www.praytimes.org"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-blue-500 underline">
          Hamid Zarrabi-Zadeh
        </a> tərəfindən hazırlanıb.
      </p>
    </div>
  </div>
)

export default Credits