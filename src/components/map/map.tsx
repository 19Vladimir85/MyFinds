import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import MapOl from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import { Icon, Style } from 'ol/style.js';
import { type IUserPosition } from '../../App';
import { fromLonLat } from 'ol/proj';

export const formatCoord = (coord: number[]): string => {
  return coord.join(',');
};

const parseCoord = (coord: string): number[] => {
  return coord.split(',').map(parseFloat);
};

interface IMap {
  onClick: (coordinate: number[]) => void;
  onMarkerClick: (coordinate: string) => void;
  onReset: () => void;
  userPosition?: IUserPosition;
}

export const Map: React.FC<IMap> = ({
  onClick,
  onMarkerClick,
  onReset,
  userPosition,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
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
    const dot = new Feature({
      geometry: new Point(parseCoord(coord)),
    });
    dot.setStyle(iconStyle);
    return dot;
  });

  useEffect(() => {
    if (!mapRef.current) return;
    const center = userPosition
      ? fromLonLat([userPosition.long, userPosition.lat])
      : [0, 0];
    const map = new MapOl({
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
        center: center,
        zoom: 7,
      }),
    });
    map.on('click', (event) => {
      onReset();
      const pos = event.coordinate;
      let flag = true;
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const geometry = feature.getGeometry();
        if (geometry instanceof Point) {
          onMarkerClick(formatCoord(geometry.getCoordinates()));
          flag = false;
        }
      });
      if (flag) onClick(pos);
    });
    return () => {
      map.setTarget(undefined);
    };
  }, [finds, userPosition]);

  return <div ref={mapRef} style={{ height: 650, width: 750 }}></div>;
};
