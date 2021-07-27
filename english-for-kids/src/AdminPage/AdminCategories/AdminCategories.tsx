import React, { useState, useEffect } from 'react';
import { CategoryDataType } from '../../types/types';
import '../adminPage.scss';
import AdminCategoryContainer from './AdminCategory/AdminCategoryContainer';
import CategoryCreator from './CategoryCreator/CategoryCreator';

type PropsType = {
  categories: CategoryDataType[];
  createCategory: (category: string, image?: File) => Promise<void>;
};

const SCREEN_WIDTH = window.innerWidth;
const PAGE_NUMBER = 1;
const CATEGORIES_PORTION = (SCREEN_WIDTH > 750) ? 6 : 2;

const AdminCategories: React.FC<PropsType> = ({ categories, createCategory }) => {
  const [categoriesToShow, setCategoriesToShow] = useState<CategoryDataType[]>([]);
  const [page, setPage] = useState(PAGE_NUMBER);

  useEffect(() => {
    setCategoriesToShow(categories.slice(0, page * CATEGORIES_PORTION));
  }, [page, categories]);

  const scrollToEnd = () => {
    setPage(page + 1);
  };

  document.addEventListener('scroll', () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
      scrollToEnd();
    }
  });
  return (
    <div className="admin__categories">
      {categoriesToShow.map((category) => <AdminCategoryContainer category={category} />)}
      <CategoryCreator createCategory={createCategory} />
    </div>
  );
};

export default AdminCategories;
