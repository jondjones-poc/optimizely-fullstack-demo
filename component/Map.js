import { useEffect, useState , useRef} from "react";
import styles from '../styles/map.module.css';

const Map = ({ center }) => {
    const ref = useRef();
    const [map, setMap] = useState();

    const ZOOM = 9;

    useEffect(() => {
      if (ref.current && !map) {
        const newMap = new window.google.maps.Map(ref.current, {
          zoom: ZOOM,
          center,
        });

        const waqiMapOverlay = new google.maps.ImageMapType({
          getTileUrl: function (coord, zoom) {
            return `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=048e54287f392c2201f6510fe84702b46744ea6c`;
          },
          name: 'Air Quality',
        });
        newMap.overlayMapTypes.insertAt(0, waqiMapOverlay);

        setMap(newMap);
      }
    }, [ref, map, center]);

    return <div ref={ref} className={styles.map}></div>;
  }

export default Map;