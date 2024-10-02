import mongoose from 'mongoose';

const LegalResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  type: {
    type: String,
    enum: ['court_order', 'article', 'law', 'others'],
    required: true,
  },
  published_date: { type: Date, default: Date.now },
  author: { type: String },
});

export default mongoose.model('LegalResource', LegalResourceSchema);
