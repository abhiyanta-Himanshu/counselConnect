import mongoose from 'mongoose'

const LawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience_years: { type: Number },
  location: {
    city: String,
    state: String,
  },
  contact_number: { type: String },
  rating: { type: Number, default: 0 },
  profile_picture: { type: String },
  biography: { type: String },
  availability: [
    {
      day: [String],
      from: String,
      to: String,
    },
  ],
});

// module.exports = mongoose.model('Lawyer', LawyerSchema);
export default mongoose.model('Lawyer', LawyerSchema);
