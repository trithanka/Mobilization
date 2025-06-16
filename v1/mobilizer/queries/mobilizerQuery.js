const mobilizerQuery = {
    getAllMobilizers: `SELECT * FROM mobilizers`,
    getMobilizerById: `SELECT * FROM mobilizers WHERE id = ?`,
    createMobilizer: `INSERT INTO mobilizers (name, email, phone, address, status, created_at, updated_at) 
                      VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    updateMobilizer: `UPDATE mobilizers 
                      SET name = ?, email = ?, phone = ?, address = ?, status = ?, updated_at = NOW() 
                      WHERE id = ?`,
    deleteMobilizer: `DELETE FROM mobilizers WHERE id = ?`
};

module.exports = mobilizerQuery; 