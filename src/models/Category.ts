import { Schema, model } from 'mongoose';

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  image: { type: String },
  name: { type: String, required: true, unique: true },
  imageURL: { type: String },
});

export default model('Category', schema);
