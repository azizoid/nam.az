import React from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from '@react-google-maps/api';
import { faMapPin as faMosque } from '@fortawesome/free-solid-svg-icons';

import { coordinates } from '../../assist/coordinates';

const containerStyle = {
  width: '100%',
  height: '75%',
};

const center = {
  lat: 40.1431,
  lng: 47.5769,
};

export type MapProps = {
  selectedCity: number;
  setShowModal: (v: boolean) => void;
  onClick: (city: number) => void;
};

export const Map = React.memo(
  ({ selectedCity, onClick, setShowModal }: MapProps) => {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    });

    if (isLoaded) {
      const icon = {
        path: faMosque.icon[4] as string,
        fillColor: 'red',
        fillOpacity: 1,
        strokeWeight: 0.1,
        scale: 0.04,
        anchor: new window.google.maps.Point(
          faMosque.icon[0] / 2,
          faMosque.icon[1]
        ),
      };
      return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
          <Polyline
            path={[center, { lat: 21.4225, lng: 39.8262 }]}
            options={{ strokeColor: 'red' }}
          />
          {coordinates.map(({ id, city, lat, lng }) => (
            <Marker
              key={id}
              position={{ lat, lng }}
              title={city}
              onClick={() => {
                onClick(id);
                setShowModal(false);
              }}
              icon={icon}
            />
          ))}
        </GoogleMap>
      );
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
    );
  }
);
