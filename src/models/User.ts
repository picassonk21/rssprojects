import { Schema, model } from 'mongoose';

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model('User', schema);
