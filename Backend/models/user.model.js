import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact_number: { type: String },
  profile_pic : {type: String , default:""},
});

export default mongoose.model('User', UserSchema);
