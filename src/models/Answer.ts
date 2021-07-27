import { Schema, model } from 'mongoose';

const schema = new Schema({
  word: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  asked: { type: Number, required: true },
  guessed: { type: Number, required: true },
  errorsCount: { type: Number, required: true },
  errorsPercent: { type: Number, required: true },
  trained: { type: Number, required: true },
});

export default model('Answer', schema);
