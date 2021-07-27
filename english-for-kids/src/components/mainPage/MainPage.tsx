import { CategoryDataType } from '../../types/types';
import './mainPage.scss';
import CategoryContainer from '../category/CategoryContainer';

type PropsType = {
  categories: CategoryDataType[];
};

const MainPage: React.FC<PropsType> = ({ categories }) => (
  <div className="main">
    <div className="categories">
      {categories.map((category) => (
        <CategoryContainer category={category} />
      ))}
    </div>
  </div>
);

export default MainPage;
