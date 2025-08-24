import { useDispatch } from 'react-redux';
import type { IFind } from '../../types';
import styles from './FindCard.module.css';
import { addFind, deleteFind } from '../../store/slices/findsSlice';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

interface IFindCard extends IFind {
  onClose: () => void;
}

export const FindCard: React.FC<IFindCard> = ({
  coordinate,
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

  return (
    <>
      {openModal ? (
        <Modal
          coordinate={coordinate}
          onClose={() => setOpenModal(false)}
          onSubmit={(find) => dispatch(addFind(find))}
          editFind={{ img, title, coordinate, description }}
        />
      ) : (
        <div className={styles.FindPreview}>
          <button onClick={onClose}>Закрыть</button>
          <img src={img} alt={title} />
          <div>{title}</div>
          <div>{coordinate}</div>
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
