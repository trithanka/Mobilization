const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const path = require('path');

// Load individual YAML files
const candidateDocs = YAML.load(path.join(__dirname, 'yaml', 'candidate.yaml'));
const mobilizerDocs = YAML.load(path.join(__dirname, 'yaml', 'mobilizer.yaml'));
const adminDocs = YAML.load(path.join(__dirname, 'yaml', 'admin.yaml'));

// Combine all paths and schemas
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mobilization API',
      version: '1.0.0',
      description: 'API documentation for Mobilization project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    paths: {
      ...candidateDocs.paths,
      ...mobilizerDocs.paths,
      ...adminDocs.paths,
    },
    components: {
      schemas: {
        ...candidateDocs.components?.schemas,
        ...mobilizerDocs.components?.schemas,
        ...adminDocs.components?.schemas,
      },
    },
  },
  apis: [], // We're using YAML files instead of JSDoc comments
};

module.exports = swaggerJsdoc(swaggerOptions); 