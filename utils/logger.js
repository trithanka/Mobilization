const winston = require('winston');
const path = require('path');

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service: 'mobilization-service' },
    transports: [
        // Write all logs with level 'error' and below to error.log
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        // Write all logs with level 'info' and below to combined.log
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
    ],
});

// If we're not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }));
}

// Create a stream object for Morgan
logger.stream = {
    write: (message) => logger.info(message.trim()),
};

// Helper functions for different log levels
const logError = (message, meta = {}) => {
    logger.error(message, meta);
};

const logInfo = (message, meta = {}) => {
    logger.info(message, meta);
};

const logWarn = (message, meta = {}) => {
    logger.warn(message, meta);
};

const logDebug = (message, meta = {}) => {
    logger.debug(message, meta);
};

module.exports = {
    logger,
    logError,
    logInfo,
    logWarn,
    logDebug
}; 