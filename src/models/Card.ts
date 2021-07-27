import { Schema, model } from 'mongoose';

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  word: { type: String, required: true },
  translation: { type: String, required: true },
  image: { type: String },
  audio: { type: String },
  guessed: { type: String },
  category: { type: String, required: true },
  imageURL: { type: String },
  audioURL: { type: String },
});

export default model('Card', schema);
