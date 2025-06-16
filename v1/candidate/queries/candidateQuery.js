const candidateQuery = {
    getAllCandidates: `SELECT * FROM candidates`,
    getCandidateById: `SELECT * FROM candidates WHERE id = ?`,
    createCandidate: `INSERT INTO candidates (name, email, phone, address, status, created_at, updated_at) 
                      VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    updateCandidate: `UPDATE candidates 
                      SET name = ?, email = ?, phone = ?, address = ?, status = ?, updated_at = NOW() 
                      WHERE id = ?`,
    deleteCandidate: `DELETE FROM candidates WHERE id = ?`
};

module.exports = candidateQuery; 