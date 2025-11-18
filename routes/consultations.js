const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/consultations');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /consultations:
 *   get:
 *     summary: List all consultations
 *     tags: [Consultations]
 *     responses:
 *       200:
 *         description: A list of consultations
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /consultations/{id}:
 *   get:
 *     summary: Get a consultation by ID
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consultation found
 *       404:
 *         description: Consultation not found
 */
router.get('/:id', ctrl.getOne);

/**
 * @swagger
 * /consultations:
 *   post:
 *     summary: Create a new consultation
 *     tags: [Consultations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsultationInput'
 *     responses:
 *       201:
 *         description: Consultation created
 *       400:
 *         description: Validation error
 */
router.post('/', auth, ctrl.create);

/**
 * @swagger
 * /consultations/{id}:
 *   put:
 *     summary: Update a consultation by ID
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsultationInput'
 *     responses:
 *       200:
 *         description: Consultation updated
 *       404:
 *         description: Consultation not found
 */

router.put('/:id', auth, ctrl.update);

/**
 * @swagger
 * /consultations/{id}:
 *   delete:
 *     summary: Delete a consultation by ID
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consultation deleted
 *       404:
 *         description: Consultation not found
 */

router.delete('/:id', auth, ctrl.remove);

module.exports = router;
