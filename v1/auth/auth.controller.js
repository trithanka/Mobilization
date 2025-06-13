const authService = require('./auth.service');
const { propagateError } = require('../../../utils/responseHandler');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw propagateError(400, "MISSING_FIELDS", "Email and password are required");
        }

        const result = await authService.login(email, password);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
}; 