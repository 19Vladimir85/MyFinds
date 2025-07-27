import { use, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { MapComponent } from './components/map/map';
import { Modal } from './components/Modal/Modal';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { FindCard } from './components/FindCard/FindCard';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [currantCoordinate, setCurrantCoordinate] = useState('');
  const [currentFindID, setCurrentFindID] = useState<string>('');
  const [currentFind, setCurrentFind] = useState({});

  const find = useSelector(
    (store: RootState) => store.findReducer.finds[currentFindID]
  );

  const handleMarkerClick = (coordinate: string) => {
    setCurrentFindID(coordinate);
  };

  const handleMapClick = (coordinate: string) => {
    setCurrantCoordinate(coordinate);
    setOpenModal(true);
  };
  console.log(find);
  return (
    <>
      <h1>Карта находок</h1>
      <MapComponent
        onMarkerClick={handleMarkerClick}
        onClick={handleMapClick}
      />
      {find && <FindCard {...find} />}
      <div className="card"></div>
      {openModal && (
        <Modal
          coordinate={currantCoordinate}
          onSave={setCurrentFind}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}

export default App;
