import { coordinates } from '@/assets/coordinates'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { generateRamadanPrayerTimes } from './generateRamadanPrayerTimes'
import { getSpecialDay } from './getSpecialDay'

type CityProps = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return coordinates.map((city) => ({ city: city.slug }))
}

const CityAyliqTeqvimPage = async (props: CityProps) => {
  const { city } = await props.params
  const prayerTimes = await generateRamadanPrayerTimes(city)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <div className="w-full max-w-4xl bg-white rounded-lg border shadow-lg overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 text-center">
              <TableHead className="w-12 text-center">Gün</TableHead>
              <TableHead className="text-center">Fəcr</TableHead>
              <TableHead className="text-center">Günəş</TableHead>
              <TableHead className="text-center">Zöhr</TableHead>
              <TableHead className="text-center">Əsr</TableHead>
              <TableHead className="text-center">Məğrib</TableHead>
              <TableHead className="text-center">İşa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prayerTimes.map(({ d, prayers, date }, index) => (
              <TableRow
                key={index}
                className={`text-sm text-center transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-blue-100`}
              >
                <TableCell className="font-medium flex flex-col">
                  <span>{index + 1}</span>
                  <span className="text-xs">{getSpecialDay(date, d)}</span>
                </TableCell>
                <TableCell>{prayers[0]}</TableCell>
                <TableCell>{prayers[1]}</TableCell>
                <TableCell>{prayers[2]}</TableCell>
                <TableCell>{prayers[3]}</TableCell>
                <TableCell>{prayers[4]}</TableCell>
                <TableCell>{prayers[5]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CityAyliqTeqvimPage