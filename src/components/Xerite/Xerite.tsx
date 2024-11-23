import React from 'react'

import {
  GoogleMap,
  MarkerF as Marker,
  MarkerProps,
  useJsApiLoader,
} from '@react-google-maps/api'

import { coordinates } from '@/assets/coordinates'

const containerStyle = {
  width: '100%',
  height: '75%',
}

const center = {
  lat: 40.1431,
  lng: 47.5769,
}

export type XeriteProps = {
  selectedCity?: string;
  onClick: (city: string) => void;
};

export const Xerite = ({ selectedCity, onClick }: XeriteProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    language: 'az',
    region: 'az',
  })

  if (isLoaded) {
    const icon: MarkerProps['icon'] = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'white',
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: "red",
      scale: 6,
    }

    return (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8} options={{ streetViewControl: false }}>
        {coordinates.map(({ city, lat, lng, slug }) => (
          <Marker
            key={slug}
            position={{ lat, lng }}
            title={city}
            onClick={() => onClick(slug)}
            {...(selectedCity !== slug && { icon: icon })}
          />
        ))}
      </GoogleMap>
    )
  }

  return (
    <select
      className="rounded-md border-green-400 bg-green-50 text-sm"
      aria-label="Haradasınız?"
      onChange={e => onClick(e.target.value)}
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
