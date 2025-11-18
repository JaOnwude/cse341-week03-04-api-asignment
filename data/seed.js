const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Patient = require('../models/patient');
const Consultation = require('../models/consultation');

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('Connected to DB for seeding');

  await Patient.deleteMany({});
  await Consultation.deleteMany({});

  const patients = await Patient.insertMany([
    { firstName: 'James', lastName: 'Onwude', age: 26, gender: 'male', phone: '+2347012345678', village: 'Ihiala', medicalHistory: 'None', email: 'james@gmail.com' },
    { firstName: 'Ada', lastName: 'Nwosu', age: 30, gender: 'female', phone: '+2347012345679', village: 'Umuahia', medicalHistory: 'Asthma', email: 'ada@@gmail.com' },
    { firstName: 'Emeka', lastName: 'Udo', age: 40, gender: 'male', phone: '+2347012345680', village: 'Enugu', medicalHistory: 'Diabetes', email: 'emeka@gmail.com' },
    { firstName: 'Chiamaka', lastName: 'Obi', age: 22, gender: 'female', phone: '+2347012345681', village: 'Onitsha', medicalHistory: '', email: 'chiamaka@gmail.com' },
    { firstName: 'Ibrahim', lastName: 'Yusuf', age: 35, gender: 'male', phone: '+2347012345682', village: 'Kano', medicalHistory: 'Hypertension', email: 'ibrahim@gmail.com' }
  ]);

  await Consultation.insertMany([
    { patientId: patients[0]._id, doctorName: 'Dr. Akin', symptoms: 'Fever and cough', diagnosis: 'Malaria', prescription: 'Artemether', status: 'closed' },
    { patientId: patients[1]._id, doctorName: 'Dr. Bello', symptoms: 'Shortness of breath', diagnosis: 'Asthma exacerbation', prescription: 'Inhaler', status: 'follow-up' },
    { patientId: patients[2]._id, doctorName: 'Dr. Chukwu', symptoms: 'Frequent urination', diagnosis: 'Diabetes type 2', prescription: 'Metformin', status: 'open' }
  ]);

  console.log('Seeding complete');
  mongoose.connection.close();
}

seed().catch(err => { console.error(err); process.exit(1); });
