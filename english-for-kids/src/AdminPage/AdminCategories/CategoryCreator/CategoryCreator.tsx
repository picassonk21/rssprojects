import React, { useState } from 'react';
import './categoryCreator.scss';
import createBtn from '../../../assets/create.svg';
import CategoryCreatorForm from './CategoryCreatorForm';

type PropsType = {
  createCategory: (category: string, image?: File) => Promise<void>;
};

const CategoryCreator: React.FC<PropsType> = ({ createCategory }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="admin__category-creator">
      {editMode && <CategoryCreatorForm setEditMode={setEditMode} createCategory={createCategory} />}
      {!editMode && <div className="admin__category-creator__content">
        <h2 className="admin__category-creator-title">Create new Category</h2>
        <button className="admin__category-creator-btn"><img src={createBtn} alt=""
          onClick={() => setEditMode(true)} /></button>
      </div>}
    </div>
  );
};

export default CategoryCreator;
