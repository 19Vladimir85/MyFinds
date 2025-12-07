import { useDispatch } from 'react-redux';
import type { IFind } from '../../types';
import styles from './FindCard.module.css';
import { deleteFind } from '../../store/slices/findsSlice';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

interface IFindCard extends IFind {
  onClose: () => void;
}

export const FindCard: React.FC<IFindCard> = ({
  coordinate,
  location,
  img,
  title,
  description,
  onClose,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onDelete = (coordinate: string) => {
    dispatch(deleteFind(coordinate));
    onClose();
  };

  const onSubmit = async (find: IFind) => {
    console.log(find);
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
          <button onClick={() => onDelete(coordinate)}>Удалить находку</button>
          <button onClick={() => setOpenModal(true)}>
            Редактировать находку
          </button>
        </div>
      )}
    </>
  );
};
