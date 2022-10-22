import { useEffect, useState , useRef} from "react";
import styles from '../styles/map.module.css';

const Map = ({ mapCords }) => {
    const ref = useRef();
    const [map, setMap] = useState();

    const ZOOM = 9;

    useEffect(() => {
      if (ref.current && !map) {
        const newMap = new window.google.maps.Map(ref.current, {
          zoom: ZOOM,
          center: mapCords,
        });

        const mapOverlay = new google.maps.ImageMapType({
          getTileUrl: function (coord, zoom) {
            return `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=${process.env.NEXT_PUBLIC_AQICN_API_KEY}`;
          },
          name: 'Air Quality',
        });
        newMap.overlayMapTypes.insertAt(0, mapOverlay);

        setMap(newMap);
      }
    }, [ref, map, mapCords]);

    return <div ref={ref} className={styles.map}></div>;
  }

export default Map;