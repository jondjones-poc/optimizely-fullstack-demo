import Map from "../component/Map";
import { Wrapper } from '@googlemaps/react-wrapper'

import styles from '../styles/map.module.css';

const MapContainer = ({ mapCords, featureDecisionData }) => {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const displayPooleStoreDetails = featureDecisionData?.ruleKey?.indexOf('poole') > -1;

  return (
    <div  className={styles.container}>
      <section className={styles.box}>
          Your nearest stores:
      </section>
      <section className={styles.box}>
       <div className={styles.mapArea}>
          <Wrapper apiKey={apiKey}>
              <Map mapCords={mapCords} />
          </Wrapper>
        </div>
      </section>
      {displayPooleStoreDetails &&
        <section className={styles.box}>
          <strong>Your Local store:</strong> Culliford Cres, Canford Heath, Poole BH17 9DW. Hours:  Open ⋅ Closes 11PM
        </section>
      }
    </div>
  );
}

export default MapContainer;