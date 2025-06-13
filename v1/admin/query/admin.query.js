// Admin Queries
const adminQueries = {
  // Get all admins
  getAllAdmins: `
    SELECT 
      id,
      name,
      email,
      role,
      created_at,
      updated_at
    FROM admins
    ORDER BY created_at DESC
  `,

  // Get admin by ID
  getAdminById: `
    SELECT 
      id,
      name,
      email,
      role,
      created_at,
      updated_at
    FROM admins
    WHERE id = ?
  `,

  // Create new admin
  createAdmin: `
    INSERT INTO admins (
      name,
      email,
      role,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, NOW(), NOW())
  `,

  // Update admin
  updateAdmin: `
    UPDATE admins
    SET 
      name = ?,
      email = ?,
      role = ?,
      updated_at = NOW()
    WHERE id = ?
  `,

  // Delete admin
  deleteAdmin: `
    DELETE FROM admins
    WHERE id = ?
  `,

  // Search admins
  searchAdmins: `
    SELECT 
      id,
      name,
      email,
      role,
      created_at,
      updated_at
    FROM admins
    WHERE 
      name LIKE ? OR
      email LIKE ? OR
      role LIKE ?
    ORDER BY created_at DESC
  `,

  // Get admins by role
  getAdminsByRole: `
    SELECT 
      id,
      name,
      email,
      role,
      created_at,
      updated_at
    FROM admins
    WHERE role = ?
    ORDER BY created_at DESC
  `,

  // Get admin by email (for authentication)
  getAdminByEmail: `
    SELECT 
      id,
      name,
      email,
      role,
      created_at,
      updated_at
    FROM admins
    WHERE email = ?
  `
};

module.exports = adminQueries; 