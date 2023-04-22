import React from 'react'

import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import {
  GoogleMap,
  MarkerF as Marker,
  useJsApiLoader,
} from '@react-google-maps/api'

import { coordinates } from '@/assist/coordinates'

const containerStyle = {
  width: '100%',
  height: '75%',
}

const center = {
  lat: 40.1431,
  lng: 47.5769,
}

export type XeriteProps = {
  selectedCity?: number;
  onClick: (city: number) => void;
};

export const Xerite = ({ selectedCity, onClick }: XeriteProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    language: 'az',
  })

  if (isLoaded) {
    const icon = {
      path: faMapPin.icon[4] as string,
      fillColor: 'red',
      fillOpacity: 1,
      strokeWeight: 0.1,
      scale: 0.04,
      anchor: new window.google.maps.Point(
        faMapPin.icon[0] / 2,
        faMapPin.icon[1]
      ),
    }
    return (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {coordinates.map(({ id, city, lat, lng }) => (
          <Marker
            key={id}
            position={{ lat, lng }}
            title={city}
            onClick={() => onClick(id)}
            icon={icon}
          />
        ))}
      </GoogleMap>
    )
  }

  return (
    <select
      className="border-green-400 bg-green-50 text-sm rounded-md"
      aria-label="Haradasınız?"
      onChange={e => onClick(Number(e.target.value))}
      value={selectedCity}
    >
      {coordinates.map(({ id, city }) => (
        <option value={id} key={id}>
          {city}
        </option>
      ))}
    </select>
  )
}
