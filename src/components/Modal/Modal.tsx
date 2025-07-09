import { useState } from 'react';
import type { IFind } from '../../types';
import styles from './Modal.module.css';
import { useDispatch } from 'react-redux';
import { addFind } from '../../store/slices/findsSlice';

interface IModal {
  coordinate: string;
  onSave: (data: IFind) => void;
  onClose: () => void;
}

export const Modal: React.FC<IModal> = ({ coordinate, onSave, onClose }) => {
  const initionalState: IFind = {
    coordinate,
    img: '',
    title: '',
    description: '',
  };
  const dispatch = useDispatch();

  const [find, setFind] = useState<IFind>(initionalState);

  const handleSubmit = () => {
    onSave(find);
    dispatch(addFind(find));
    onClose();
  };

  return (
    <div className={styles.Modal}>
      <form onSubmit={handleSubmit}>
        <img src={find.img} alt="моя находка" />
        <input
          type="text"
          placeholder="Координаты"
          value={coordinate}
          disabled
        />
        <input
          type="text"
          placeholder="Название"
          value={find.title}
          onChange={(event) => setFind({ ...find, title: event.target.value })}
        />
        <input
          type="text"
          placeholder="Описание"
          value={find.description}
          onChange={(event) =>
            setFind({ ...find, description: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Изображение"
          value={find.img}
          onChange={(event) => setFind({ ...find, img: event.target.value })}
        />
        <button type="submit">Сохранить</button>
        <button type="reset" onClick={onClose}>
          Закрыть
        </button>
      </form>
    </div>
  );
};
