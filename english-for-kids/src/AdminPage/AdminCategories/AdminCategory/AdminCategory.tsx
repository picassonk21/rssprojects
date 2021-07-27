import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CategoryDataType } from '../../../types/types';
import './adminCategory.scss';
import closeBtn from '../../../assets/close.svg';
import { AdminSetActiveCategoryType } from '../../../redux/adminReducer';
import AdminCategoryEditorContainer from './AdminCategoryEditor/AdminCategoryEditorContainer';

type PropsType = {
  category: CategoryDataType;
  length: number;
  adminSetActiveCategory: (category: string) => AdminSetActiveCategoryType;
  removeCategory: () => Promise<void>;
};

const AdminCategory: React.FC<PropsType> = ({
  category, length, adminSetActiveCategory, removeCategory,
}) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="admin__category">
      {editMode && <AdminCategoryEditorContainer setEditMode={setEditMode} category={category.name} />}
      {!editMode && <div className="admin__category-content">
        <button className="admin__category-remove-btn" onClick={(e) => {
          e.preventDefault();
          removeCategory();
        }}>
          <img src={closeBtn} alt="" />
        </button>
        <h2 className="admin__category-title">{category.name}</h2>
        <div className="admin__category-length">words: {length}</div>
        <div className="admin__category-buttons">
          <button className="admin__category-update-btn"
            onClick={() => setEditMode(true)}>update</button>
          <NavLink to={`/${category.name}/words`}>
            <button className="admin__category-add-btn"
              onClick={() => adminSetActiveCategory(category.name)}>add word</button>
          </NavLink>
        </div>
      </div>}
    </div>
  );
};

export default AdminCategory;
