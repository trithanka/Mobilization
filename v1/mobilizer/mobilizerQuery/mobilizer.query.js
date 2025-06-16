// Mobilizer Queries
const mobilizerQueries = {
  // Get all mobilizers
  getAllMobilizers: `
    SELECT 
      id,
      name,
      email,
      region,
      created_at,
      updated_at
    FROM mobilizers
    ORDER BY created_at DESC
  `,

  // Get mobilizer by ID
  getMobilizerById: `
    SELECT 
      id,
      name,
      email,
      region,
      created_at,
      updated_at
    FROM mobilizers
    WHERE id = ?
  `,

  // Create new mobilizer
  createMobilizer: `
    INSERT INTO mobilizers (
      name,
      email,
      region,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, NOW(), NOW())
  `,

  // Update mobilizer
  updateMobilizer: `
    UPDATE mobilizers
    SET 
      name = ?,
      email = ?,
      region = ?,
      updated_at = NOW()
    WHERE id = ?
  `,

  // Delete mobilizer
  deleteMobilizer: `
    DELETE FROM mobilizers
    WHERE id = ?
  `,

  // Search mobilizers
  searchMobilizers: `
    SELECT 
      id,
      name,
      email,
      region,
      created_at,
      updated_at
    FROM mobilizers
    WHERE 
      name LIKE ? OR
      email LIKE ? OR
      region LIKE ?
    ORDER BY created_at DESC
  `,

  // Get mobilizers by region
  getMobilizersByRegion: `
    SELECT 
      id,
      name,
      email,
      region,
      created_at,
      updated_at
    FROM mobilizers
    WHERE region = ?
    ORDER BY created_at DESC
  `
};

module.exports = mobilizerQueries; 