import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true, index: true },
  studentName: { type: String, required: true, trim: true, maxlength: 100 },
  courseTitle: { type: String, required: true, trim: true, maxlength: 150 },
  completionDate: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['valid', 'revoked'], default: 'valid' }
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
