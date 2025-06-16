// Mobilizer Queries
const mobilizerQueries = {
  // Get all mobilizers
  getAllMobilizers: `
    SELECT 
      e.id,
      e.name,
      e.vsEmail1 as email,
      e.vsMobile1 as phone,
      e.vsMobile2 as phone2,
      ea.vsAddress as address,
      e.fklDistrictId,
      e.fklStateId,
      l.vsLoginName as loginName,
      e.bEnabled as status,
      e.dtModifiedDate as created_at
    FROM nw_enms_entity e
    JOIN nw_loms_login l ON e.fklLoginId = l.id
    JOIN nw_enms_entity_address ea ON e.id = ea.fklEntityId
    WHERE e.fklJvId = 14 AND e.fklEntityId = 94
    ORDER BY e.dtModifiedDate DESC
  `,

  // Get mobilizer by ID
  getMobilizerById: `
    SELECT 
      e.id,
      e.name,
      e.vsEmail1 as email,
      e.vsMobile1 as phone,
      e.vsMobile2 as phone2,
      ea.vsAddress as address,
      e.fklDistrictId,
      e.fklStateId,
      l.vsLoginName as loginName,
      e.bEnabled as status,
      e.dtModifiedDate as created_at
    FROM nw_enms_entity e
    JOIN nw_loms_login l ON e.fklLoginId = l.id
    JOIN nw_enms_entity_address ea ON e.id = ea.fklEntityId
    WHERE e.id = ? AND e.fklJvId = 14 AND e.fklEntityId = 94
  `,

  // Get mobilizer by pklEntityId
  getMobilizerByPklEntityId: `
    SELECT 
      e.id,
      e.name,
      e.vsEmail1 as email,
      e.vsMobile1 as phone,
      e.vsMobile2 as phone2,
      ea.vsAddress as address,
      e.fklDistrictId,
      e.fklStateId,
      l.vsLoginName as loginName,
      e.bEnabled as status,
      e.dtModifiedDate as created_at
    FROM nw_enms_entity e
    JOIN nw_loms_login l ON e.fklLoginId = l.id
    JOIN nw_enms_entity_address ea ON e.id = ea.fklEntityId
    WHERE e.pklEntityId = ? AND e.fklJvId = 14 AND e.fklEntityId = 94
  `,

  // Create login
  createLogin: `
    INSERT INTO nw_loms_login (
      fklJvId,
      vsLoginName,
      vsPassword,
      bEnabled,
      dtModifiedDate
    ) VALUES (14, ?, ?, 0, NOW())
  `,

  // Create entity
  createEntity: `
    INSERT INTO nw_enms_entity (
      fklJvId,
      name,
      vsEmail1,
      vsMobile1,
      vsMobile2,
      bEnabled,
      dtModifiedDate,
      fklLoginId,
      fklEntityId,
      fklDistrictId,
      fklStateId
    ) VALUES (14, ?, ?, ?, ?, 0, NOW(), ?, 94, ?, ?)
  `,

  // Create entity address
  createEntityAddress: `
    INSERT INTO nw_enms_entity_address (
      fklEntityId,
      fklJvId,
      bDefault,
      vsAddress,
      fklDistrictId,
      fklStateId,
      fklCountryId,
      dtModifiedDate
    ) VALUES (?, 14, 1, ?, ?, ?, 96, NOW())
  `,

  // Update mobilizer status
  updateMobilizerStatus: `
    UPDATE nw_enms_entity e
    JOIN nw_loms_login l ON e.fklLoginId = l.id
    SET 
      e.bEnabled = ?,
      l.bEnabled = ?,
      e.dtModifiedDate = NOW()
    WHERE e.id = ? AND e.fklJvId = 14 AND e.fklEntityId = 94
  `,

  // Update mobilizer
  updateMobilizer: `
    UPDATE nw_enms_entity e
    JOIN nw_enms_entity_address ea ON e.id = ea.fklEntityId
    SET 
      e.name = ?,
      e.vsEmail1 = ?,
      e.vsMobile1 = ?,
      e.vsMobile2 = ?,
      ea.vsAddress = ?,
      e.fklDistrictId = ?,
      e.fklStateId = ?,
      e.dtModifiedDate = NOW()
    WHERE e.id = ? AND e.fklJvId = 14 AND e.fklEntityId = 94
  `,

  // Delete mobilizer
  deleteMobilizer: `
    DELETE e, ea, l
    FROM nw_enms_entity e
    JOIN nw_enms_entity_address ea ON e.id = ea.fklEntityId
    JOIN nw_loms_login l ON e.fklLoginId = l.id
    WHERE e.id = ? AND e.fklJvId = 14 AND e.fklEntityId = 94
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