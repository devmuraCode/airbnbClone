import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import 'leaflet/dist/leaflet.css';
import { FC } from 'react';

interface TProps {
  center: LatLngExpression;
}
const Map:FC<TProps> = (props) => {
  const { center } = props;
  return (
    <MapContainer center={center || [51.505, -0.09]} zoom={13} style={{ width: '100%', height: '50vh' }}>
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
