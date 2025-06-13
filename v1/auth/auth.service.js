const connection = require("../../../DATABASE/mysqlConnection");
const { propagateResponse, propagateError } = require("../../../utils/responseHandler");
const { logError, logInfo } = require("../../../utils/logger");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (email, password) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { service: "auth", operation: "login" });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        // Query to get user with role information
        const [users] = await connection.query(mysqlDB, `
            SELECT u.*, r.role_name 
            FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.email = ?
        `, [email]);

        if (!users[0]) {
            logError("User not found", { service: "auth", operation: "login", email });
            throw propagateError(401, "INVALID_CREDENTIALS", "Invalid email or password");
        }

        const user = users[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            logError("Invalid password", { service: "auth", operation: "login", email });
            throw propagateError(401, "INVALID_CREDENTIALS", "Invalid email or password");
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                role: user.role_name
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Remove password from response
        delete user.password;

        logInfo("User logged in successfully", { 
            service: "auth", 
            operation: "login", 
            userId: user.id,
            role: user.role_name
        });

        return propagateResponse("Login successful", {
            user,
            token
        }, "LOGIN_SUCCESSFUL", 200);
    } catch (error) {
        logError("Login failed", { 
            service: "auth", 
            operation: "login", 
            email,
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "LOGIN_ERROR", "Error during login");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

module.exports = {
    login
}; 