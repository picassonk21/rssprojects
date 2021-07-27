import './category.scss';
import { NavLink } from 'react-router-dom';
import { SetActiveCategoryType } from '../../redux/gameReducer';
import { CardDataType } from '../../types/types';

type PropsType = {
  categoryName: string;
  categoryImage: string;
  setActiveCategory: (category: string) => SetActiveCategoryType;
  getCards: (category: string) => Promise<CardDataType[]>;
  trainingMode: boolean;
};

const Category: React.FC<PropsType> = ({
  categoryName, categoryImage, setActiveCategory, getCards, trainingMode,
}) => (
  <NavLink to="./game">
    <div
      className={`category${trainingMode ? '' : ' play-mode'}`}
      onClick={async () => {
        setActiveCategory(categoryName);
        getCards(categoryName);
      }}
    >
      <div className="category__image">
        <img src={categoryImage} className="category__image" />
      </div>
      <h2 className="category__name">{categoryName}</h2>
    </div>
  </NavLink>
);

export default Category;
