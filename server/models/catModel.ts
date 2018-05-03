import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  name: String,
  weight: String,
  age: String,
});

const catModel = mongoose.model('cat', catSchema);

export default catModel;
