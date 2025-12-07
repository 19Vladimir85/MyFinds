import { useEffect, useState } from 'react';
import { Map, formatCoord } from '../../components/Map/Map';
import { Modal } from '../../components/Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, store } from '../../store/store';
import { FindCard } from '../../components/FindCard/FindCard';
import { FindList } from '../../components/FindList/FindList';
import styles from './MainPage.module.css';
import { setRightColumnType } from '../../store/slices/appSlice';
import { toLonLat } from 'ol/proj';
import type { IFind } from '../../types';
import { addFindThunk, fetchFindsThunk } from '../../store/thunk/findsThunk';

export interface IUserPosition {
  lat: number;
  long: number;
}

export const MainPage: React.FC = () => {
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

  useEffect(() => {
    dispatch(fetchFindsThunk());
  });

  const find = useSelector(
    (store: RootState) => store.findReducer.finds[currentFindID]
  );

  const rightColumnType = useSelector(
    (store: RootState) => store.appReducer.rightColumnType
  );

  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();

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

  const onSubmit = async (find: IFind) => {
    dispatch(addFindThunk(find));
  };

  return (
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
            onSubmit={onSubmit}
          />
        )}
        {rightColumnType === 'list' && <FindList />}
      </div>
    </div>
  );
};
