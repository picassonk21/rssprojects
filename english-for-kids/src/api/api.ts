import axios, { AxiosResponse } from 'axios';
import {
  CategoriesAPIType, CategoryDataType, CardDataType, LoginBodyType, DBRecordType, StatsAPIType, AdminAPIType,
} from '../types/types';

const instance = axios.create({
  baseURL: 'https://salty-earth-13694.herokuapp.com/api',
});

async function getCategories(): Promise<CategoryDataType[]> {
  const response = await instance.get('/categories');
  const categories: CategoryDataType[] = response.data;
  return categories;
}

async function getCards(category: string): Promise<CardDataType[]> {
  const response = await instance.get(`/cards?category=${category}`);
  const cards: CardDataType[] = response.data;
  return cards;
}

async function getCard(word: string): Promise<CardDataType> {
  const response = await instance.get(`/cards/${word}`);
  const card: CardDataType = response.data;
  return card;
}

async function getAllCards(): Promise<CardDataType[]> {
  const response = await instance.get('/cards/all');
  const cards: CardDataType[] = response.data;
  return cards;
}

export const categoriesAPI: CategoriesAPIType = {
  getCategories,
  getCards,
  getAllCards,
  getCard,
};

async function login(userData: LoginBodyType): Promise<AxiosResponse> {
  const response = await instance.post('/auth/login', { ...userData });
  return response;
}

export const authAPI = {
  login,
};

async function getAnswers(category?: string): Promise<DBRecordType[]> {
  if (!category) {
    const response = await instance.get('/stats');
    const answers: DBRecordType[] = response.data;
    return answers;
  }
  const response = await instance.get(`/stats?category=${category}`);
  const answers: DBRecordType[] = response.data;
  return answers;
}

async function getAnswer(word: string): Promise<DBRecordType> {
  const response = await instance.get(`/stats/answer?word=${word}`);
  const answer: DBRecordType = response.data;
  return answer;
}

async function setAnswer(answerData: DBRecordType): Promise<void> {
  await instance.post(
    '/stats',
    { answerData },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

async function updateAnswer(answerData: DBRecordType): Promise<void> {
  await instance.put('/stats', { answerData }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function resetStats(words: string[]): Promise<void> {
  await instance.put('/stats/reset', { words }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const statsAPI: StatsAPIType = {
  getAnswers,
  getAnswer,
  setAnswer,
  updateAnswer,
  resetStats,
};

async function updateCategoryName(categoryName: string, newName: string): Promise<AxiosResponse> {
  const response = await instance.put(`/admin/category/update?category=${categoryName}`, { category: newName }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}

async function setCategoryImage(image: File, category: string): Promise<void> {
  const formData = new FormData();
  formData.append('imageURL', image);
  await instance.put(`admin/category/image?category=${category}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    },
  });
}

async function createCategory(category: string): Promise<void> {
  await instance.post('/admin/category/create', { category }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function createCard(card: CardDataType): Promise<void> {
  await instance.post('/cards', card, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function updateCard(cardData: CardDataType, word: string): Promise<void> {
  await instance.put(`/cards/update?word=${word}`, { cardData }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function removeCategory(category: string): Promise<void> {
  await instance.delete(`/admin/category?category=${category}`);
}

async function setCardAudio(audio: File, word: string) {
  const formData = new FormData();
  formData.append('audioURL', audio);
  await instance.put(`/cards/audio?word=${word}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    },
  });
}

async function setCardImage(image: File, word: string) {
  const formData = new FormData();
  formData.append('imageURL', image);
  await instance.put(`/cards/image?word=${word}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    },
  });
}

async function removeCard(word: string) {
  await instance.delete(`/cards?word=${word}`);
}

export const adminAPI: AdminAPIType = {
  createCategory,
  removeCategory,
  updateCategoryName,
  setCategoryImage,
  createCard,
  removeCard,
  setCardAudio,
  setCardImage,
  updateCard,
};
