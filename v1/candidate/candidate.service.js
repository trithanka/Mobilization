const connection = require("../../../DATABASE/mysqlConnection");
const candidateQuery = require("./queries/candidateQuery");
const { propagateResponse, propagateError } = require("../../../utils/responseHandler");
const { logError, logInfo } = require("../../../utils/logger");

const getAllCandidates = async () => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { service: "candidate", operation: "getAllCandidates" });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        const [rows] = await connection.query(mysqlDB, candidateQuery.getAllCandidates);
        logInfo("Candidates fetched successfully", { 
            service: "candidate", 
            operation: "getAllCandidates", 
            count: rows.length 
        });
        return propagateResponse("Candidates fetched successfully", rows, "CANDIDATES_FETCHED", 200);
    } catch (error) {
        logError("Error fetching candidates", { 
            service: "candidate", 
            operation: "getAllCandidates", 
            error: error.message 
        });
        throw propagateError(500, "FETCH_ERROR", "Error fetching candidates");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const getCandidateById = async (id) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "candidate", 
            operation: "getCandidateById", 
            candidateId: id 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        const [rows] = await connection.query(mysqlDB, candidateQuery.getCandidateById, [id]);
        if (!rows[0]) {
            logError("Candidate not found", { 
                service: "candidate", 
                operation: "getCandidateById", 
                candidateId: id 
            });
            throw propagateError(404, "NOT_FOUND", "Candidate not found");
        }
        logInfo("Candidate fetched successfully", { 
            service: "candidate", 
            operation: "getCandidateById", 
            candidateId: id 
        });
        return propagateResponse("Candidate fetched successfully", rows[0], "CANDIDATE_FETCHED", 200);
    } catch (error) {
        logError("Error fetching candidate", { 
            service: "candidate", 
            operation: "getCandidateById", 
            candidateId: id, 
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "FETCH_ERROR", "Error fetching candidate");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const createCandidate = async (candidateData) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "candidate", 
            operation: "createCandidate", 
            data: candidateData 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    const { name, email, phone, address, status } = candidateData;

    try {
        const [result] = await connection.query(mysqlDB, candidateQuery.createCandidate, 
            [name, email, phone, address, status]);
        
        const [newCandidate] = await connection.query(mysqlDB, candidateQuery.getCandidateById, [result.insertId]);
        logInfo("Candidate created successfully", { 
            service: "candidate", 
            operation: "createCandidate", 
            candidateId: result.insertId 
        });
        return propagateResponse("Candidate created successfully", newCandidate[0], "CANDIDATE_CREATED", 201);
    } catch (error) {
        logError("Error creating candidate", { 
            service: "candidate", 
            operation: "createCandidate", 
            data: candidateData, 
            error: error.message 
        });
        throw propagateError(500, "CREATE_ERROR", "Error creating candidate");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const updateCandidate = async (id, candidateData) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "candidate", 
            operation: "updateCandidate", 
            candidateId: id, 
            data: candidateData 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    const { name, email, phone, address, status } = candidateData;

    try {
        const [existingCandidate] = await connection.query(mysqlDB, candidateQuery.getCandidateById, [id]);
        if (!existingCandidate[0]) {
            logError("Candidate not found for update", { 
                service: "candidate", 
                operation: "updateCandidate", 
                candidateId: id 
            });
            throw propagateError(404, "NOT_FOUND", "Candidate not found");
        }

        await connection.query(mysqlDB, candidateQuery.updateCandidate, 
            [name, email, phone, address, status, id]);
        
        const [updatedCandidate] = await connection.query(mysqlDB, candidateQuery.getCandidateById, [id]);
        logInfo("Candidate updated successfully", { 
            service: "candidate", 
            operation: "updateCandidate", 
            candidateId: id 
        });
        return propagateResponse("Candidate updated successfully", updatedCandidate[0], "CANDIDATE_UPDATED", 200);
    } catch (error) {
        logError("Error updating candidate", { 
            service: "candidate", 
            operation: "updateCandidate", 
            candidateId: id, 
            data: candidateData, 
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "UPDATE_ERROR", "Error updating candidate");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

const deleteCandidate = async (id) => {
    let mysqlDB = await connection.getDB();
    if (!mysqlDB) {
        logError("Database connection failed", { 
            service: "candidate", 
            operation: "deleteCandidate", 
            candidateId: id 
        });
        throw propagateError(500, "DB_CONNECTION_ERROR", "Error connecting to database");
    }

    try {
        const [candidate] = await connection.query(mysqlDB, candidateQuery.getCandidateById, [id]);
        if (!candidate[0]) {
            logError("Candidate not found for deletion", { 
                service: "candidate", 
                operation: "deleteCandidate", 
                candidateId: id 
            });
            throw propagateError(404, "NOT_FOUND", "Candidate not found");
        }

        await connection.query(mysqlDB, candidateQuery.deleteCandidate, [id]);
        logInfo("Candidate deleted successfully", { 
            service: "candidate", 
            operation: "deleteCandidate", 
            candidateId: id 
        });
        return propagateResponse("Candidate deleted successfully", candidate[0], "CANDIDATE_DELETED", 200);
    } catch (error) {
        logError("Error deleting candidate", { 
            service: "candidate", 
            operation: "deleteCandidate", 
            candidateId: id, 
            error: error.message 
        });
        if (error.statusCode) throw error;
        throw propagateError(500, "DELETE_ERROR", "Error deleting candidate");
    } finally {
        if (mysqlDB) mysqlDB.release();
    }
};

module.exports = {
    getAllCandidates,
    getCandidateById,
    createCandidate,
    updateCandidate,
    deleteCandidate
}; 