const express = require('express');
const router = express.Router();
const mobilizerController = require('../mobilizerController/mobilizer.controller');

/**
 * @swagger
 * /v1/mobilizers:
 *   get:
 *     summary: Returns all mobilizers
 *     tags: [Mobilizers]
 *     responses:
 *       200:
 *         description: List of mobilizers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mobilizer'
 */
router.get('/', mobilizerController.getAllMobilizers);

/**
 * @swagger
 * /v1/mobilizers/{id}:
 *   get:
 *     summary: Get a mobilizer by id
 *     tags: [Mobilizers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The mobilizer id
 *     responses:
 *       200:
 *         description: The mobilizer description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilizer'
 *       404:
 *         description: The mobilizer was not found
 */
router.get('/:id', mobilizerController.getMobilizerById);

/**
 * @swagger
 * /v1/mobilizers/pkl/{pklEntityId}:
 *   get:
 *     summary: Get a mobilizer by pklEntityId
 *     tags: [Mobilizers]
 *     parameters:
 *       - in: path
 *         name: pklEntityId
 *         schema:
 *           type: string
 *         required: true
 *         description: The mobilizer pklEntityId
 *     responses:
 *       200:
 *         description: The mobilizer description by pklEntityId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilizer'
 *       404:
 *         description: The mobilizer was not found
 */
router.get('/pkl/:pklEntityId', mobilizerController.getMobilizerByPklEntityId);

/**
 * @swagger
 * /v1/mobilizers/{id}/status:
 *   patch:
 *     summary: Update mobilizer status
 *     tags: [Mobilizers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The mobilizer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: boolean
 *                 description: The new status of the mobilizer
 *     responses:
 *       200:
 *         description: The mobilizer status was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilizer'
 *       404:
 *         description: The mobilizer was not found
 */
router.patch('/:id/status', mobilizerController.updateMobilizerStatus);

/**
 * @swagger
 * /v1/mobilizers:
 *   post:
 *     summary: Create a new mobilizer
 *     tags: [Mobilizers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mobilizer'
 *     responses:
 *       201:
 *         description: The mobilizer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilizer'
 *       400:
 *         description: Invalid input
 */
router.post('/', mobilizerController.createMobilizer);

/**
 * @swagger
 * /v1/mobilizers/{id}:
 *   put:
 *     summary: Update a mobilizer by id
 *     tags: [Mobilizers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The mobilizer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mobilizer'
 *     responses:
 *       200:
 *         description: The mobilizer was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilizer'
 *       404:
 *         description: The mobilizer was not found
 */
router.put('/:id', mobilizerController.updateMobilizer);

/**
 * @swagger
 * /v1/mobilizers/{id}:
 *   delete:
 *     summary: Delete a mobilizer by id
 *     tags: [Mobilizers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The mobilizer id
 *     responses:
 *       200:
 *         description: The mobilizer was deleted
 *       404:
 *         description: The mobilizer was not found
 */
router.delete('/:id', mobilizerController.deleteMobilizer);

module.exports = router; 