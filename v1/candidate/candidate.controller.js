/**
 * @swagger
 * components:
 *   schemas:
 *     Candidate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the candidate
 *         name:
 *           type: string
 *           description: The name of the candidate
 *         email:
 *           type: string
 *           description: The email of the candidate
 */

const candidateService = require('./candidate.service');

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await candidateService.getAllCandidates();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await candidateService.getCandidateById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCandidate = async (req, res) => {
  try {
    const candidate = await candidateService.createCandidate(req.body);
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidate = await candidateService.updateCandidate(req.params.id, req.body);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const candidate = await candidateService.deleteCandidate(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate
}; 