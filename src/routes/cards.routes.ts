import { Router } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { CardDataType } from '../types/types';
import Card from '../models/Card';

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

router.get('/', async (req, res) => {
  try {
    const category = req.query.category?.toString();
    if (!category) {
      res.status(400).json({ message: 'No category provided' });
    }
    const cards = await Card.find({ category });
    return res.status(200).json([...cards]);
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json([...cards]);
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/:word', async (req, res) => {
  try {
    const word: String = req.params.word;
    if (!word) {
      res.status(400).json({ message: 'No word provided' });
    }
    const card = await Card.findOne({ word });
    return res.status(200).json(card);
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/image',
  upload.single('imageURL'),
  async (req, res) => {
    try {
      const word = req.query.word?.toString();
      if (!word) {
        res.status(400).json({ message: 'no card provided' });
      }
      const item = await Card.findOne({ word });
      if (!item) {
        res.status(400).json({ message: 'no card found' });
      }
      await Card.updateOne({ word }, {
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

router.put('/audio',
  upload.single('audioURL'),
  async (req, res) => {
    try {
      const word = req.query.word?.toString();
      if (!word) {
        res.status(400).json({ message: 'no card provided' });
      }
      const item = await Card.findOne({ word });
      if (!item) {
        res.status(400).json({ message: 'no card found' });
      }
      await Card.updateOne({ word }, {
        $set: {
          audio: req.file?.originalname,
          audioURL: req.file?.path,
        },
      });
      return res.status(200).json({ message: 'successfully updated' });
    } catch {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  });

router.post('/', async (req, res) => {
  try {
    const cardData: CardDataType = req.body;
    if (!cardData) {
      res.status(400).json({ message: 'no card data provided' });
    }
    const newCardData: CardDataType = {
      word: cardData.word,
      translation: cardData.translation,
      category: cardData.category,
      image: '',
      audio: '',
    };
    const newCard = new Card({
      _id: mongoose.Types.ObjectId(),
      ...newCardData,
    });
    await newCard.save();
    return res.status(201).json({ message: 'successfully created' });
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const word = req.query.word?.toString();
    if (!word) {
      res.status(400).json({ message: 'no card provided' });
    }
    const item = await Card.findOne({ word });
    if (!item) {
      res.status(400).json({ message: 'no card found' });
    }
    await Card.deleteOne({ word });
    return res.json({ message: 'successfully removed' });
  } catch {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/update', async (req, res) => {
  try {
    const word = req.query.word?.toString();
    if (!word) {
      res.status(400).json({ message: 'no card word provided' });
    }
    const { cardData } = req.body;
    if (!cardData) {
      return res.status(400).json({ message: 'no data provided' });
    }
    const item = await Card.findOne({ word });
    if (!item) {
      res.status(400).json({ message: 'no card found' });
    }
    await Card.updateOne({ word }, {
      $set: {
        ...cardData,
      },
    });
    return res.status(200).json({ message: 'successfully updated' });
  } catch {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
