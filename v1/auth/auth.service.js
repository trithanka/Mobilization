const connection = require("../../JOS/DALMYSQLConnection");
const {
  propagateResponse,
  propagateError,
} = require("../../utils/responseHandler");
const { logError, logInfo } = require("../../utils/logger");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const login = async (loginName, password) => {
  let mysqlDB = await connection.getDB();
  if (!mysqlDB) {
    logError("Database connection failed", {
      service: "auth",
      operation: "login",
    });
    throw propagateError(
      500,
      "DB_CONNECTION_ERROR",
      "Error connecting to database"
    );
  }

  try {
    // *** old query ****
    // SELECT u.*, r.role_name
    //     FROM users u
    //     JOIN roles r ON u.role_id = r.id
    //     WHERE u.email = ?

    // Query to get user with role information
    
    
    let encryptedPassword = await encrypt(password);

    // *** login credentials check query ***
    const users = await connection.query(
      mysqlDB,
      `
            SELECT login.pklLoginId as id,
            login.vsLoginName as loginName,
            login.vsPassword as password,
            role.fklRoleId as roleID,
            roles.vsRoleName as roleName
            FROM nw_loms_login as login
            JOIN nw_loms_login_role as role on role.fklLoginId= login.pklLoginId
            JOIN nw_mams_role AS roles ON roles.pklRoleId = role.fklRoleId
            WHERE login.vsLoginName = ? AND login.vsPassword = ?
            `,
      [loginName, encryptedPassword]
    );

    // *** Is User Valid or Not ***
    if (users.length <= 0) {
      logError("User not found", {
        service: "auth",
        operation: "login",
        loginName,
      });
      throw propagateError(
        401,
        "INVALID_CREDENTIALS",
        "Invalid login name or password"
      );
    }

    const user = users[0];

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user?.id,
        loginName: user?.loginName,
        role: user?.role_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Remove password from response
    delete user.password;

    logInfo("User logged in successfully", {
      service: "auth",
      operation: "login",
      userId: user?.id,
      role: user?.role_name,
    });

    return propagateResponse(
      "Login successful",
      {
        user,
        token,
      },
      "LOGIN_SUCCESSFUL",
      200
    );
  } catch (error) {
    logError("Login failed", {
      service: "auth",
      operation: "login",
      loginName,
      error: error.message,
    });
    if (error.statusCode) throw error;
    throw propagateError(500, "LOGIN_ERROR", "Error during login");
  } finally {
    if (mysqlDB) mysqlDB.release();
  }
};

// *** Convert Password ***
async function encrypt(data) {
  const cipher = crypto.createCipher("aes256", "3ncryp7i0n");
  let encrypted =
    cipher.update("" + data, "utf8", "hex") + cipher.final("hex");
  return encrypted;
}

module.exports = {
  login,
};
