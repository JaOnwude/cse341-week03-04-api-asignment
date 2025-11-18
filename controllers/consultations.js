const Consultation = require('../models/consultation');
const Patient = require('../models/patient');

exports.getAll = async (req, res) => {
  try {
    const items = await Consultation.find().populate('patientId', 'firstName lastName village');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Consultation.findById(req.params.id).populate('patientId', 'firstName lastName village');
    if (!item) return res.status(404).json({ message: 'Consultation not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

exports.create = async (req, res) => {
  try {
    const { patientId, doctorName, symptoms, diagnosis, prescription, status } = req.body;
    if (!patientId || !doctorName || !symptoms) return res.status(400).json({ message: 'patientId, doctorName and symptoms are required' });
    const p = await Patient.findById(patientId);
    if (!p) return res.status(400).json({ message: 'patientId does not exist' });
    const c = new Consultation({ patientId, doctorName, symptoms, diagnosis, prescription, status });
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Consultation not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Consultation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Consultation not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
