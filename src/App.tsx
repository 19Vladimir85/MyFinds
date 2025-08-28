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

export interface IUserPosition {
  lat: number;
  long: number;
}

function App() {
  const [currantCoordinate, setCurrantCoordinate] = useState('');
  const [currentFindID, setCurrentFindID] = useState<string>('');
  const [userPosition, setUserPosition] = useState<IUserPosition>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
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

  const handleMapClick = (coordinate: string) => {
    setCurrantCoordinate(coordinate);

    dispatch(setRightColumnType('modal'));
  };

  const handleResetState = () => {
    setCurrentFindID('');
    console.log('+++');
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
