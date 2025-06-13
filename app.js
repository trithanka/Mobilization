const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerDocs = require('./swagger');
const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const path = require('path');
const { logger } = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import routes
const candidateRouter = require('./v1/candidate/candidate.router');
const mobilizerRouter = require('./v1/mobilizer/mobilizer.router');
const adminRouter = require('./v1/admin/router/admin.router');
const authRoutes = require('./v1/auth/auth.routes');

// Use routes
app.use('/v1/candidates', candidateRouter);
app.use('/v1/mobilizers', mobilizerRouter);
app.use('/v1/admin', adminRouter);
app.use('/v1/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
    code: err.code || 'INTERNAL_ERROR'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app; 