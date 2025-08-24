import { useState } from 'react';
import type { IFind } from '../../types';
import styles from './Modal.module.css';
import cn from 'clsx';
interface IModal {
  coordinate: string;
  onClose: () => void;
  className?: string;
  onSubmit: (find: IFind) => void;
  editFind?: IFind;
}

export const Modal: React.FC<IModal> = ({
  coordinate,
  onClose,
  className,
  onSubmit,
  editFind,
}) => {
  const initionalState: IFind = {
    coordinate,
    img: '',
    title: '',
    description: '',
  };

  const [find, setFind] = useState<IFind>(editFind || initionalState);

  const handleSubmit = () => {
    console.log(onSubmit, find);
    onSubmit(find);
    onClose();
  };

  return (
    <div className={cn(className, styles.modal)}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
