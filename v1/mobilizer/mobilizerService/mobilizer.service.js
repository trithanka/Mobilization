const connection = require("../../../JOS/DALMYSQLConnection");
const mobilizerQuery = require("../mobilizerQuery/mobilizer.query");
const { propagateResponse, propagateError } = require("../../../utils/responseHandler");
const { logError, logInfo } = require("../../../utils/logger");
const { mobilizerSchema } = require("../../validation/mobilizer.validation");
const bcrypt = require('bcrypt');

const getAllMobilizers = async () => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { service: "mobilizer", operation: "getAllMobilizers" });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        const [rows] = await connection.query(mysqlDB, mobilizerQuery.getAllMobilizers);
        logInfo("Mobilizers fetched successfully", { 
            service: "mobilizer", 
            operation: "getAllMobilizers", 
            count: rows.length 
        });
        return propagateResponse("Mobilizers fetched successfully", rows, "MOBILIZERS_FETCHED", 200);
    } catch (error) {
        logError("Error fetching mobilizers", { 
            service: "mobilizer", 
            operation: "getAllMobilizers", 
            error: error.message 
        });
        throw propagateError(500, "FETCH_ERROR", "Error fetching mobilizers");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const getMobilizerById = async (id) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "mobilizer", 
            operation: "getMobilizerById", 
            mobilizerId: id 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        const [rows] = await connection.query(mysqlDB, mobilizerQuery.getMobilizerById, [id]);
        if (!rows[0]) {
            logError("Mobilizer not found", { 
                service: "mobilizer", 
                operation: "getMobilizerById", 
                mobilizerId: id 
            });
            throw propagateError(404, "NOT_FOUND", "Mobilizer not found");
        }
        logInfo("Mobilizer fetched successfully", { 
            service: "mobilizer", 
            operation: "getMobilizerById", 
            mobilizerId: id 
        });
        return propagateResponse("Mobilizer fetched successfully", rows[0], "MOBILIZER_FETCHED", 200);
    } catch (error) {
        logError("Error fetching mobilizer", { 
            service: "mobilizer", 
            operation: "getMobilizerById", 
            mobilizerId: id, 
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "FETCH_ERROR", "Error fetching mobilizer");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const getMobilizerByPklEntityId = async (pklEntityId) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "mobilizer", 
            operation: "getMobilizerByPklEntityId", 
            pklEntityId: pklEntityId 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        const [rows] = await connection.query(mysqlDB, mobilizerQuery.getMobilizerByPklEntityId, [pklEntityId]);
        if (!rows[0]) {
            logError("Mobilizer not found", { 
                service: "mobilizer", 
                operation: "getMobilizerByPklEntityId", 
                pklEntityId: pklEntityId 
            });
            throw propagateError(404, "NOT_FOUND", "Mobilizer not found");
        }
        logInfo("Mobilizer fetched successfully", { 
            service: "mobilizer", 
            operation: "getMobilizerByPklEntityId", 
            pklEntityId: pklEntityId 
        });
        return propagateResponse("Mobilizer fetched successfully", rows[0], "MOBILIZER_FETCHED", 200);
    } catch (error) {
        logError("Error fetching mobilizer", { 
            service: "mobilizer", 
            operation: "getMobilizerByPklEntityId", 
            pklEntityId: pklEntityId, 
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "FETCH_ERROR", "Error fetching mobilizer");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const updateMobilizerStatus = async (id, status) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "mobilizer", 
            operation: "updateMobilizerStatus", 
            mobilizerId: id 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        // Validate status is boolean
        if (typeof status !== 'boolean') {
            throw propagateError(400, "VALIDATION_ERROR", "Status must be a boolean value");
        }

        const [existingMobilizer] = await connection.query(mysqlDB, mobilizerQuery.getMobilizerById, [id]);
        if (!existingMobilizer[0]) {
            logError("Mobilizer not found for status update", { 
                service: "mobilizer", 
                operation: "updateMobilizerStatus", 
                mobilizerId: id 
            });
            throw propagateError(404, "NOT_FOUND", "Mobilizer not found");
        }

        await connection.query(mysqlDB, mobilizerQuery.updateMobilizerStatus, [status, status, id]);
        
        const [updatedMobilizer] = await connection.query(mysqlDB, mobilizerQuery.getMobilizerById, [id]);
        logInfo("Mobilizer status updated successfully", { 
            service: "mobilizer", 
            operation: "updateMobilizerStatus", 
            mobilizerId: id,
            status: status 
        });
        return propagateResponse("Mobilizer status updated successfully", updatedMobilizer[0], "MOBILIZER_STATUS_UPDATED", 200);
    } catch (error) {
        logError("Error updating mobilizer status", { 
            service: "mobilizer", 
            operation: "updateMobilizerStatus", 
            mobilizerId: id, 
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "UPDATE_ERROR", "Error updating mobilizer status");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const createMobilizer = async (mobilizerData) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "mobilizer", 
            operation: "createMobilizer", 
            data: mobilizerData 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        // Validate input data
        const { error, value } = mobilizerSchema.validate(mobilizerData);
        if (error) {
            throw propagateError(400, "VALIDATION_ERROR", error.details[0].message);
        }

        const { name, email, phone, phone2, address, fklDistrictId, fklStateId, loginName, password } = value;

        // Start transaction
        await connection.query(mysqlDB, 'START TRANSACTION');

        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create login
            const [loginResult] = await connection.query(mysqlDB, mobilizerQuery.createLogin, 
                [loginName, hashedPassword]);
            
            const loginId = loginResult.insertId;

            // Create entity
            const [entityResult] = await connection.query(mysqlDB, mobilizerQuery.createEntity, 
                [name, email, phone, phone2 || null, loginId, fklDistrictId, fklStateId]);
            
            const entityId = entityResult.insertId;

            // Create entity address
            await connection.query(mysqlDB, mobilizerQuery.createEntityAddress, 
                [entityId, address, fklDistrictId, fklStateId]);

            // Commit transaction
            await connection.query(mysqlDB, 'COMMIT');

            // Get the created mobilizer
            const [newMobilizer] = await connection.query(mysqlDB, mobilizerQuery.getMobilizerById, [entityId]);

            logInfo("Mobilizer created successfully", { 
                service: "mobilizer", 
                operation: "createMobilizer", 
                mobilizerId: entityId 
            });

            return propagateResponse("Mobilizer created successfully", newMobilizer[0], "MOBILIZER_CREATED", 201);
        } catch (error) {
            // Rollback transaction on error
            await connection.query(mysqlDB, 'ROLLBACK');
            throw error;
        }
    } catch (error) {
        logError("Error creating mobilizer", { 
            service: "mobilizer", 
            operation: "createMobilizer", 
            data: mobilizerData, 
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "CREATE_ERROR", "Error creating mobilizer");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const updateMobilizer = async (id, mobilizerData) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "mobilizer", 
            operation: "updateMobilizer", 
            mobilizerId: id, 
            data: mobilizerData 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    const { name, email, phone, address, status } = mobilizerData;

    try {
        const [existingMobilizer] = await connection.query(mysqlDB, mobilizerQuery.getMobilizerById, [id]);
        if (!existingMobilizer[0]) {
            logError("Mobilizer not found for update", { 
                service: "mobilizer", 
                operation: "updateMobilizer", 
                mobilizerId: id 
            });
            throw propagateError(404, "NOT_FOUND", "Mobilizer not found");
        }

        await connection.query(mysqlDB, mobilizerQuery.updateMobilizer, 
            [name, email, phone, address, status, id]);
        
        const [updatedMobilizer] = await connection.query(mysqlDB, mobilizerQuery.getMobilizerById, [id]);
        logInfo("Mobilizer updated successfully", { 
            service: "mobilizer", 
            operation: "updateMobilizer", 
            mobilizerId: id 
        });
        return propagateResponse("Mobilizer updated successfully", updatedMobilizer[0], "MOBILIZER_UPDATED", 200);
    } catch (error) {
        logError("Error updating mobilizer", { 
            service: "mobilizer", 
            operation: "updateMobilizer", 
            mobilizerId: id, 
            data: mobilizerData, 
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "UPDATE_ERROR", "Error updating mobilizer");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const deleteMobilizer = async (id) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "mobilizer", 
            operation: "deleteMobilizer", 
            mobilizerId: id 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        const [mobilizer] = await connection.query(mysqlDB, mobilizerQuery.getMobilizerById, [id]);
        if (!mobilizer[0]) {
            logError("Mobilizer not found for deletion", { 
                service: "mobilizer", 
                operation: "deleteMobilizer", 
                mobilizerId: id 
            });
            throw propagateError(404, "NOT_FOUND", "Mobilizer not found");
        }

        await connection.query(mysqlDB, mobilizerQuery.deleteMobilizer, [id]);
        logInfo("Mobilizer deleted successfully", { 
            service: "mobilizer", 
            operation: "deleteMobilizer", 
            mobilizerId: id 
        });
        return propagateResponse("Mobilizer deleted successfully", mobilizer[0], "MOBILIZER_DELETED", 200);
    } catch (error) {
        logError("Error deleting mobilizer", { 
            service: "mobilizer", 
            operation: "deleteMobilizer", 
            mobilizerId: id, 
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "DELETE_ERROR", "Error deleting mobilizer");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

module.exports = {
    getAllMobilizers,
    getMobilizerById,
    getMobilizerByPklEntityId,
    updateMobilizerStatus,
    createMobilizer,
    updateMobilizer,
    deleteMobilizer
}; 