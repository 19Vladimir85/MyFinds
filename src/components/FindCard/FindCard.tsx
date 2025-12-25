import { useDispatch } from 'react-redux';
import type { IFind } from '../../types';
import styles from './FindCard.module.css';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { deleteFindThunk, updateFindThunk } from '../../store/thunk/findsThunk';
import type { store } from '../../store/store';

interface IFindCard extends IFind {
  onClose: () => void;
}

export const FindCard: React.FC<IFindCard> = ({
  id,
  coordinate,
  location,
  img,
  title,
  description,
  onClose,
}) => {
  type AppDispatch = typeof store.dispatch;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = (id: number) => {
    dispatch(deleteFindThunk(id));
    onClose();
  };

  const onSubmit = async (find: IFind) => {
    dispatch(updateFindThunk({ index: id!, find }));
  };

  return (
    <>
      {openModal ? (
        <Modal
          coordinate={coordinate}
          location={location}
          onClose={() => setOpenModal(false)}
          onSubmit={onSubmit}
          editFind={{ img, title, coordinate, description, location }}
        />
      ) : (
        <div className={styles.FindPreview}>
          <button onClick={onClose}>Закрыть</button>
          <img src={img} alt={title} />
          <div>{title}</div>
          <div>{location}</div>
          <div>{description}</div>
          <button onClick={() => onDelete(id)}>Удалить находку</button>
          <button onClick={() => setOpenModal(true)}>
            Редактировать находку
          </button>
        </div>
      )}
    </>
  );
};
