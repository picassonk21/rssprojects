import React, { useState } from 'react';

type PropsType = {
  setEditMode: (value: React.SetStateAction<boolean>) => void;
  createCategory: (category: string, image?: File) => Promise<void>;
};

const CategoryCreatorForm: React.FC<PropsType> = ({ setEditMode, createCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  return (
    <form className="admin__category-creator__form">
      <div className="admin__category-creator__input">
        <label className="admin__category-creator__form-title">Category Name: </label>
        <input type="text" onInput={(e) => {
          setCategoryName((e.target as HTMLInputElement).value);
        }}/>
      </div>
      <div className="admin__word-creator__file">
        <span className="admin__word-creator__file-title">Image:</span>
        {!imageFile && <button className="admin__word-creator-load-btn">Select file
          <input type="file" className="admin__word-creator__file-input" onChange={(e) => {
            if (e.target.files) {
              setImageFile(e.target.files[0]);
            }
          }} />
        </button>}
        {imageFile && <span className="admin__word-creator__file-name">{imageFile.name}</span>}
      </div>
      <div className="admin__category-buttons">
        <button className="admin__category-cancel-btn"
          onClick={() => setEditMode(false)}>Cancel</button>
        <button className="admin__category-confirm-btn"
          onClick={(e) => {
            e.preventDefault();
            createCategory(categoryName, imageFile);
            setEditMode(false);
          }}>create</button>
      </div>
    </form>
  );
};

export default CategoryCreatorForm;
