import { Router } from 'express';
import mongoose from 'mongoose';
import { AnswerDataType } from '../types/types';
import Answer from '../models/Answer';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const category = req.query.category?.toString();
    if (!category) {
      const stats = await Answer.find();
      return res.status(200).json([...stats]);
    }
    const stats = await Answer.find({ category });
    if (!stats) {
      return res.status(400).json({ message: 'statistics is unavailable' });
    }
    return res.status(200).json([...stats]);
  } catch {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { answerData } = req.body;
    if (!answerData) {
      return res.status(400).json({ message: 'No data Provided' });
    }
    const answer: AnswerDataType = await Answer.findOne({ word: answerData.word });
    if (!answer) {
      return res.status(400).json({ message: 'No such word in database' });
    }
    await Answer.update({ word: answerData.word }, { $set: { ...answerData } });
    return res.status(200).json({ message: 'Successfully updated' });
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body.answerData;
    if (!body) {
      return res.status(400).json({ message: 'No data provided' });
    }
    const answer = new Answer({
      _id: new mongoose.Types.ObjectId(),
      ...body,
    });
    await answer.save();
    return res.status(201).json({ message: 'record created' });
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/answer', async (req, res) => {
  try {
    const wordReq = req.query.word?.toString();
    if (!wordReq) {
      res.status(400).json({ message: 'No word provided' });
    }
    const word: AnswerDataType = await Answer.findOne({ word: wordReq });
    if (!word) {
      res.status(400).json({ message: 'No such word in database' });
    }
    return res.status(200).json(word);
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/reset', async (req, res) => {
  try {
    const { words } = req.body;
    if (!words) {
      res.status(400).json({ message: 'No words provided' });
    }
    await Answer.updateMany({ word: { $in: words } }, {
      $set: {
        asked: 0,
        guessed: 0,
        errorsCount: 0,
        errorsPercent: 0,
        trained: 0,
      },
    });
    return res.status(200).json({ message: 'Successfully updated' });
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
