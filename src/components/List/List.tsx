import { FindList } from '../FindList/FindList';

interface IList {
  onClick: (coordinate: string) => void;
}

export const List: React.FC<IList> = ({ onClick }) => {
  return (
    <div>
      <FindList onClick={onClick}></FindList>
    </div>
  );
};
