const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  age: { type: Number, required: true, min: 0 },
  gender: { type: String, enum: ['male','female','other'], required: true },
  phone: { type: String, required: true },
  village: { type: String, required: true },
  medicalHistory: { type: String, default: '' },
  email: { type: String, match: /\S+@\S+\.\S+/ }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
