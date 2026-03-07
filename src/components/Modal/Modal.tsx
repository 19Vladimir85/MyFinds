import { useEffect, useState } from 'react';
import type { IFind } from '../../types';
import styles from './Modal.module.css';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface IModal {
  coordinate: string;
  location: string;
  onClose: () => void;
  className?: string;
  onSubmit: (find: IFind) => void;
  editFind?: IFind;
}

export const Modal: React.FC<IModal> = ({
  coordinate,
  location,
  onClose,
  className,
  onSubmit,
  editFind,
}) => {
  const initionalState: IFind = {
    coordinate,
    location,
    img: '',
    title: '',
    description: '',
    districtId: 1,
  };

  type ImageSource = 'url' | 'file';

  const [find, setFind] = useState<IFind>(editFind || initionalState);
  const [imageSource, setImageSource] = useState<ImageSource>('url');
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null,
  );

  const handleSubmit = () => {
    onSubmit(find);
    console.log('++++++');
    onClose();
  };

  const chooseImageSource = (type: ImageSource, event) => {
    event.stopPropagation();
    setImageSource(type);
  };

  const handleUpLoadFile = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setFind({ ...find, location });
  }, [location]);

  const categories = useSelector(
    (store: RootState) => store.districtReducer.districts,
  );

  return (
    <div className={cn(className, styles.modal)}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {previewUrl && (
          <img src={previewUrl} className={styles.findImg} alt="моя находка" />
        )}
        <input type="text" placeholder="Координаты" value={location} disabled />
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
        <button
          type="button"
          onClick={(event) => chooseImageSource('url', event)}
        >
          Загрузить через url
        </button>
        <button
          type="button"
          onClick={(event) => chooseImageSource('file', event)}
        >
          Загрузить через файл
        </button>
        {imageSource === 'url' ? (
          <input
            type="text"
            placeholder="Изображение"
            value={find.img}
            onChange={(event) => {
              setFind({ ...find, img: event.target.value });
              setPreviewUrl(event.target.value);
            }}
          />
        ) : (
          <input type="file" accept="image/*" onChange={handleUpLoadFile} />
        )}
        <select
          value={find.districtId}
          onChange={(event) =>
            setFind({ ...find, districtId: +event.target.value })
          }
        >
          {categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        <button type="submit">Сохранить</button>
        <button type="reset" onClick={onClose}>
          Закрыть
        </button>
      </form>
    </div>
  );
};
