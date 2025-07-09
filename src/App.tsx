import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { MapComponent } from './components/map/map';
import { Modal } from './components/Modal/Modal';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [currantCoordinate, setCurrantCoordinate] = useState('');
  const [currentFind, setCurrentFind] = useState({});

  const handleMapClick = (coordinate: string) => {
    setCurrantCoordinate(coordinate);
    setOpenModal(true);
  };
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <MapComponent onClick={handleMapClick} />
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more Hello world!;)
      </p>
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
