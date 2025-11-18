const swaggerAutogen = require('swagger-autogen')();

const IS_RENDER = process.env.RENDER === 'true';
const HOST = IS_RENDER ? 'cse341-careconnect-api.onrender.com' : `localhost:${process.env.PORT || 8080}`;

const doc = {
  info: {
    title: 'CareConnect Telemedicine API',
    description: 'Connecting rural Nigerians to doctors via mobile',
    version: '1.0.0'
  },
  host: HOST,
  schemes: [IS_RENDER ? 'https' : 'http'],
  basePath: '/',
  components: {
    schemas: {
      PatientInput: {
        type: 'object',
        required: ['firstName', 'lastName', 'age', 'gender', 'phone', 'village'],
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          age: { type: 'number' },
          gender: { type: 'string' },
          phone: { type: 'string' },
          village: { type: 'string' },
          medicalHistory: { type: 'string' },
          email: { type: 'string' }
        }
      },
      ConsultationInput: {
        type: 'object',
        required: ['patientId', 'symptoms', 'assessment', 'prescription'],
        properties: {
          patientId: { type: 'string' },
          symptoms: { type: 'string' },
          assessment: { type: 'string' },
          prescription: { type: 'string' },
          followUpDate: { type: 'string', format: 'date' }
        }
      }
    }
  }
  
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/patients.js', './routes/consultations.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js');
});