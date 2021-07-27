import { Router } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import Card from '../models/Card';
import Category from '../models/Category';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();

router.put('/category/update', async (req, res) => {
  try {
    const category = req.query.category?.toString();
    if (!category) {
      res.status(400).json({ message: 'no category name provided' });
    }
    const newName: string = req.body.category;
    if (!newName) {
      res.status(400).json({ message: 'no new name provided' });
    }
    const isExist = !!(await Category.findOne({ name: category }));
    if (!isExist) {
      res.status(400).json({ message: 'category not found' });
    }
    await Category.updateOne({ name: category }, {
      $set: {
        name: newName,
      },
    });
    await Card.updateMany({ category }, {
      $set: {
        category: newName,
      },
    });
    return res.status(200).json({ message: 'category updated' });
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/category/create', async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: 'no category data provided' });
    }
    const newCategory = new Category({
      _id: new mongoose.Types.ObjectId(),
      name: category,
      image: '',
    });
    await newCategory.save();
    return res.status(201).json({ message: 'category created' });
  } catch {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/category/image',
  upload.single('imageURL'),
  async (req, res) => {
    try {
      const category = req.query.category?.toString();
      if (!category) {
        res.status(400).json({ message: 'no category provided' });
      }
      const item = await Category.findOne({ name: category });
      if (!item) {
        res.status(400).json({ message: 'no category found' });
      }
      await Category.updateOne({ name: category }, {
        $set: {
          image: req.file?.originalname,
          imageURL: req.file?.path,
        },
      });
      return res.status(200).json({ message: 'successfully updated' });
    } catch {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  });

router.delete('/category', async (req, res) => {
  try {
    const category = req.query.category?.toString();
    if (!category) {
      res.status(400).json({ message: 'no card provided' });
    }
    const item = await Category.findOne({ name: category });
    if (!item) {
      res.status(400).json({ message: 'no card found' });
    }
    await Category.deleteOne({ name: category });
    return res.json({ message: 'successfully removed' });
  } catch {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
