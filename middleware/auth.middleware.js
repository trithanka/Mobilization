const jwt = require('jsonwebtoken');
const { propagateError } = require('../utils/responseHandler');
const { logError } = require('../utils/logger');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw propagateError(401, "NO_TOKEN", "No token provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        logError("Token verification failed", { 
            error: error.message,
            path: req.path
        });
        if (error.name === 'JsonWebTokenError') {
            next(propagateError(401, "INVALID_TOKEN", "Invalid token"));
        } else if (error.name === 'TokenExpiredError') {
            next(propagateError(401, "TOKEN_EXPIRED", "Token has expired"));
        } else {
            next(error);
        }
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                throw propagateError(401, "NO_USER", "User not authenticated");
            }

            if (!roles.includes(req.user.role)) {
                throw propagateError(403, "UNAUTHORIZED", "You don't have permission to access this resource");
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    verifyToken,
    checkRole
}; 