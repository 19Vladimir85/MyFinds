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
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import { Icon, Style } from 'ol/style.js';

const formatCoord = (coord: number[]): string => {
  return coord.join(',');
};

const parseCoord = (coord: string): number[] => {
  return coord.split(',').map(parseFloat);
};

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
  const finds = useSelector((store: RootState) => store.findReducer.finds);

  const features = Object.entries(finds).map(([coord, find]) => {
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src:
          find.img || 'https://openlayers.org/en/latest/examples/data/icon.png',
      }),
    });
    const dot = new Feature({ geometry: new Point(parseCoord(coord)) });
    dot.setStyle(iconStyle);
    return dot;
  });

  useEffect(() => {
    if (!mapRef.current) return;
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({ features }),
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
      // const hdms = toStringHDMS(toLonLat(pos));
      // popup.setPosition(pos);
      // if (popupRef.current) popupRef.current.innerHTML = `<p>${hdms}</p>`;
      // map.addOverlay(popup);
      console.log(formatCoord(pos));
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        console.log(feature.getGeometry()?.getExtent());
      });
      onClick(formatCoord(pos));
    });
    return () => {
      map.setTarget(undefined);
    };
  }, [finds]);

  return (
    <>
      <div ref={mapRef} style={{ height: 550, width: 550 }}></div>
      <div ref={popupRef} style={stylePopup} className="ol-popup"></div>
    </>
  );
};
