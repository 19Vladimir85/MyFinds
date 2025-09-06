import { useEffect, useState } from 'react';
import { Map } from './components/Map/Map';
import { Modal } from './components/Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store/store';
import { FindCard } from './components/FindCard/FindCard';
import { FindList } from './components/FindList/FindList';
import styles from './App.module.css';
import { setRightColumnType } from './store/slices/appSlice';
import { addFind } from './store/slices/findsSlice';
import { formatCoord } from './components/Map/Map';
import { toLonLat } from 'ol/proj';

export interface IUserPosition {
  lat: number;
  long: number;
}

function App() {
  const [currantCoordinate, setCurrantCoordinate] = useState('');
  const [currentFindID, setCurrentFindID] = useState<string>('');
  const [userPosition, setUserPosition] = useState<IUserPosition>();
  const [currantLocation, setCurrantLocation] = useState<string>('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserPosition({ lat: latitude, long: longitude });
    });
  }, []);
  const find = useSelector(
    (store: RootState) => store.findReducer.finds[currentFindID]
  );

  const rightColumnType = useSelector(
    (store: RootState) => store.appReducer.rightColumnType
  );

  const dispatch = useDispatch();

  const handleMarkerClick = (coordinate: string) => {
    setCurrentFindID(coordinate);
    dispatch(setRightColumnType('card'));
  };

  const handleMapClick = (coordinate: number[]) => {
    setCurrantCoordinate(formatCoord(coordinate));
    const correctCoord = toLonLat(coordinate);
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${correctCoord[1]}&lon=${correctCoord[0]}`;
    fetch(url)
      .then((res) => res.json())
      .then((value) => setCurrantLocation(value.display_name));

    dispatch(setRightColumnType('modal'));
  };

  const handleResetState = () => {
    setCurrentFindID('');
    dispatch(setRightColumnType('list'));
  };
  return (
    <div className={styles.body}>
      <h1>Карта находок</h1>
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          <Map
            onMarkerClick={handleMarkerClick}
            onClick={handleMapClick}
            onReset={handleResetState}
            userPosition={userPosition}
          />
        </div>
        <div className={styles.rightColumn}>
          {rightColumnType === 'card' && (
            <FindCard {...find} onClose={handleResetState} />
          )}
          {rightColumnType === 'modal' && (
            <Modal
              coordinate={currantCoordinate}
              location={currantLocation}
              onClose={() => dispatch(setRightColumnType('list'))}
              onSubmit={(find) => dispatch(addFind(find))}
            />
          )}
          {rightColumnType === 'list' && <FindList />}
        </div>
      </div>
    </div>
  );
}

export default App;
