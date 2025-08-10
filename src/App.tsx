import { useState } from 'react';
import './App.css';
import { Map } from './components/Map/Map';
import { Modal } from './components/Modal/Modal';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { FindPreview } from './components/FindPreview/FindPreview';
import { FindList } from './components/FindList/FindList';

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

  const handleResetState = () => {
    setCurrentFindID('');
    setOpenModal(false);
  };
  return (
    <>
      <h1>Карта находок</h1>
      <div className="wrapper">
        <Map
          onMarkerClick={handleMarkerClick}
          onClick={handleMapClick}
          onReset={handleResetState}
        />
        {find && <FindPreview {...find} />}
        <div className="card"></div>
        {openModal && (
          <Modal
            coordinate={currantCoordinate}
            onSave={setCurrentFind}
            onClose={() => setOpenModal(false)}
          />
        )}
        <FindList />
      </div>
    </>
  );
}

export default App;
