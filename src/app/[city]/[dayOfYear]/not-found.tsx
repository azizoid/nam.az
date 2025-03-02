import { Link } from '@/components/Link'

export const CityDayNotFound = () => <div className="alert alert-danger">
  <div>
    <h1>Şəhər və ya tarıx tapılmadı</h1>
    <p>Zəhmət olmasa <Link href="/">baş səhifəyə keçin</Link></p>
  </div>
</div>

export default CityDayNotFound
