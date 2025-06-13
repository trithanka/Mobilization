/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the admin
 *         name:
 *           type: string
 *           description: The name of the admin
 *         email:
 *           type: string
 *           description: The email of the admin
 *         role:
 *           type: string
 *           description: The role of the admin
 */

const adminService = require('../service/admin.service');

const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const admin = await adminService.createAdmin(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const admin = await adminService.updateAdmin(req.params.id, req.body);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await adminService.deleteAdmin(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin
}; 