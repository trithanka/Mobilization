// Candidate Queries
const candidateQueries = {
  // Get all candidates
  getAllCandidates: `
    SELECT 
      id,
      name,
      email,
      created_at,
      updated_at
    FROM candidates
    ORDER BY created_at DESC
  `,

  // Get candidate by ID
  getCandidateById: `
    SELECT 
      id,
      name,
      email,
      created_at,
      updated_at
    FROM candidates
    WHERE id = ?
  `,

  // Create new candidate
  createCandidate: `
    INSERT INTO candidates (
      name,
      email,
      created_at,
      updated_at
    ) VALUES (?, ?, NOW(), NOW())
  `,

  // Update candidate
  updateCandidate: `
    UPDATE candidates
    SET 
      name = ?,
      email = ?,
      updated_at = NOW()
    WHERE id = ?
  `,

  // Delete candidate
  deleteCandidate: `
    DELETE FROM candidates
    WHERE id = ?
  `,

  // Search candidates
  searchCandidates: `
    SELECT 
      id,
      name,
      email,
      created_at,
      updated_at
    FROM candidates
    WHERE 
      name LIKE ? OR
      email LIKE ?
    ORDER BY created_at DESC
  `
};

module.exports = candidateQueries; 