const authService = require('./auth.service');
const { propagateError } = require('../../utils/responseHandler');

const login = async (req, res, next) => {
    try {
        const { loginName, password } = req.body;

        if (!loginName || !password) {
            throw propagateError(400, "MISSING_FIELDS", "Login name  and password are required");
        }

        const result = await authService.login(loginName, password);
        res.status(result?.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
}; 