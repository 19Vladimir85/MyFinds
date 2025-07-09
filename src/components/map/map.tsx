import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay.js';
import { toLonLat } from 'ol/proj';
import { toStringHDMS } from 'ol/coordinate';

const stylePopup = {
  position: 'absolute',
  backgroundColor: 'white',
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid black',
  transform: 'translate(-50%, -100%)',
  pointerEvents: 'none',
  width: '220px',
  color: 'black',
};

interface IMap {
  onClick: (coordinate: string) => void;
}

export const MapComponent: React.FC<IMap> = ({ onClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapRef.current) return;
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    const popup = new Overlay({
      element: popupRef.current!,
    });
    map.on('click', (event) => {
      const pos = event.coordinate;
      const hdms = toStringHDMS(toLonLat(pos));
      popup.setPosition(pos);
      if (popupRef.current) popupRef.current.innerHTML = `<p>${hdms}</p>`;
      map.addOverlay(popup);
      onClick(hdms);
      console.log(pos, hdms);
    });
    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ height: 350, width: 350 }}></div>
      <div ref={popupRef} style={stylePopup} className="ol-popup"></div>
    </>
  );
};
