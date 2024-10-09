import mongoose from 'mongoose'

const LawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number , default:0},
  location: {
    city: String,
    state: String,
  },
  contact_number: { type: String },
  rating: { type: Number, default: 0 },
  profile_pic: { type: String, default:"" },
  biography: { type: String },
  availability: [
    {
      day: String,
      from: String,
      to: String,
    },
  ],
});

// module.exports = mongoose.model('Lawyer', LawyerSchema);
export default mongoose.model('Lawyer', LawyerSchema);
