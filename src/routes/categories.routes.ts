import { Router } from 'express';
import Category from '../models/Category';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json([...categories]);
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
