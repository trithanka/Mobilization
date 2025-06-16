const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');

/**
 * @swagger
 * /v1/admin:
 *   get:
 *     summary: Returns all admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: List of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 */
router.get('/', adminController.getAllAdmins);

/**
 * @swagger
 * /v1/admin/{id}:
 *   get:
 *     summary: Get an admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     responses:
 *       200:
 *         description: The admin description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: The admin was not found
 */
router.get('/:id', adminController.getAdminById);

/**
 * @swagger
 * /v1/admin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: The admin was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Invalid input
 */
router.post('/', adminController.createAdmin);

/**
 * @swagger
 * /v1/admin/{id}:
 *   put:
 *     summary: Update an admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: The admin was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: The admin was not found
 */
router.put('/:id', adminController.updateAdmin);

/**
 * @swagger
 * /v1/admin/{id}:
 *   delete:
 *     summary: Delete an admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     responses:
 *       200:
 *         description: The admin was deleted
 *       404:
 *         description: The admin was not found
 */
router.delete('/:id', adminController.deleteAdmin);

module.exports = router; 