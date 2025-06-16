const express = require('express');
const router = express.Router();
const candidateController = require('../candidateController/candidate.controller');

/**
 * @swagger
 * /v1/candidates:
 *   get:
 *     summary: Returns all candidates
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: List of candidates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidate'
 */
router.get('/', candidateController.getAllCandidates);

/**
 * @swagger
 * /v1/candidates/{id}:
 *   get:
 *     summary: Get a candidate by id
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     responses:
 *       200:
 *         description: The candidate description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         description: The candidate was not found
 */
router.get('/:id', candidateController.getCandidateById);

/**
 * @swagger
 * /v1/candidates:
 *   post:
 *     summary: Create a new candidate
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       201:
 *         description: The candidate was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       400:
 *         description: Invalid input
 */
router.post('/', candidateController.createCandidate);

/**
 * @swagger
 * /v1/candidates/{id}:
 *   put:
 *     summary: Update a candidate by id
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       200:
 *         description: The candidate was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         description: The candidate was not found
 */
router.put('/:id', candidateController.updateCandidate);

/**
 * @swagger
 * /v1/candidates/{id}:
 *   delete:
 *     summary: Delete a candidate by id
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     responses:
 *       200:
 *         description: The candidate was deleted
 *       404:
 *         description: The candidate was not found
 */
router.delete('/:id', candidateController.deleteCandidate);


// send otp to candidate
router.post('/send-otp', candidateController.sendOtp);

module.exports = router; 