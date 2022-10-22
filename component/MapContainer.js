import Map from "../component/Map";
import { Wrapper } from '@googlemaps/react-wrapper'

import styles from '../styles/map.module.css';

const MapContainer = ({ center, address }) => {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
console.log('MapContainer', apiKey)
    return (
      <section className={styles.container}>
        <Wrapper apiKey={apiKey}>
            <Map center={center} />
        </Wrapper>
      </section>
    );
  }

export default MapContainer;