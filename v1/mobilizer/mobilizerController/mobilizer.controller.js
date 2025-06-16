/**
 * @swagger
 * components:
 *   schemas:
 *     Mobilizer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - region
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the mobilizer
 *         name:
 *           type: string
 *           description: The name of the mobilizer
 *         email:
 *           type: string
 *           description: The email of the mobilizer
 *         region:
 *           type: string
 *           description: The region assigned to the mobilizer
 */

const mobilizerService = require('../mobilizerService/mobilizer.service');

const getAllMobilizers = async (req, res) => {
  try {
    const mobilizers = await mobilizerService.getAllMobilizers();
    res.json(mobilizers);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getMobilizerById = async (req, res) => {
  try {
    const mobilizer = await mobilizerService.getMobilizerById(req.params.id);
    if (!mobilizer) {
      return res.status(404).json({ message: 'Mobilizer not found' });
    }
    res.json(mobilizer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getMobilizerByPklEntityId = async (req, res) => {
  try {
    const mobilizer = await mobilizerService.getMobilizerByPklEntityId(req.params.pklEntityId);
    res.json(mobilizer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateMobilizerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const mobilizer = await mobilizerService.updateMobilizerStatus(req.params.id, status);
    res.json(mobilizer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const createMobilizer = async (req, res) => {
  try {
    const mobilizer = await mobilizerService.createMobilizer(req.body);
    res.status(201).json(mobilizer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateMobilizer = async (req, res) => {
  try {
    const mobilizer = await mobilizerService.updateMobilizer(req.params.id, req.body);
    if (!mobilizer) {
      return res.status(404).json({ message: 'Mobilizer not found' });
    }
    res.json(mobilizer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteMobilizer = async (req, res) => {
  try {
    const mobilizer = await mobilizerService.deleteMobilizer(req.params.id);
    if (!mobilizer) {
      return res.status(404).json({ message: 'Mobilizer not found' });
    }
    res.json(mobilizer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
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