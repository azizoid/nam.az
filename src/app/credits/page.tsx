// pages/credits.tsx
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiJest, SiGithub, SiMongodb, SiGooglemaps } from 'react-icons/si'

const Credits = () => (
  <div className="container mx-auto flex flex-col justify-center p-6">
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">İstifadə Edilən Texnologiyalar</h2>
      <div className="grid grid-cols-3 gap-6 md:grid-cols-4">
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
        <div className="flex flex-col items-center opacity-50">
          <SiMongodb size={50} color="#47A248" />
          <p className="mt-2 text-center">MongoDB</p>
        </div>
        <div className="flex flex-col items-center">
          <SiGooglemaps size={50} color="#4285F4" />
          <p className="mt-2 text-center">Google Maps API</p>
        </div>
      </div>
    </div>
  </div>
)

export default Credits