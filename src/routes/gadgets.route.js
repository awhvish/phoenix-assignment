import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
  getGadgetController,
  postGadgetController,
  updateGadgetController,
  deleteGadgetController,
  destroyGadgetController,
} from '../controllers/gadget.controller.js';

const router = express.Router();

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Retrieve all gadgets
 *     tags:
 *       - Gadget API
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *         description: Filter gadgets by status
 *     responses:
 *       200:
 *         description: A list of gadgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [Available, Deployed, Destroyed, Decommissioned]
 *       400:
 *         description: Invalid status or error fetching gadgets
 */
router.get('/', protectRoute, getGadgetController);

/**
 * @swagger
 * /gadgets:
 *   post:
 *     summary: Add a new gadget
 *     tags:
 *       - Gadget API
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "The name of the gadget. Optional. If not provided, a random name will be selected from a predefined list."
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed, Destroyed]
 *                 description: "The current status of the gadget. Optional. Defaults to 'Available' if not specified."
 *     responses:
 *       201:
 *         description: Gadget successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget created successfully!
 *                 gadget:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: "The unique identifier of the created gadget."
 *                     name:
 *                       type: string
 *                       description: "The assigned name of the gadget (either provided or randomly generated)."
 *                     status:
 *                       type: string
 *                       description: "The current status of the gadget."
 *                     success_probability:
 *                       type: number
 *                       format: float
 *                       description: "The success probability of the gadget's mission."
 *       400:
 *         description: Invalid status or gadget name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid status / Gadget with this name already exists
 */

/**
 * @swagger
 * /gadgets:
 *   patch:
 *     summary: Update an existing gadget
 *     tags:
 *       - Gadget API
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: "The unique identifier of the gadget (Required)."
 *               name:
 *                 type: string
 *                 description: "Optional. If provided, updates the gadget's name. Defaults to the current name if not specified."
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed, Destroyed, Decommissioned]
 *                 description: "Optional. If provided, updates the gadget's status. Defaults to the current status if not specified."
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget updated successfully
 *                 gadget:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     status:
 *                       type: string
 *       400:
 *         description: Bad request (invalid or missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *       404:
 *         description: Gadget not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating gadget
 */
router.patch('/', protectRoute, updateGadgetController);

/**
 * @swagger
 * /gadgets/{id}:
 *   delete:
 *     summary: Mark a gadget as "Decommissioned"
 *     tags:
 *       - Gadget API
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The unique identifier of the gadget to be decommissioned."
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget decommissioned successfully
 *                 gadget:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: Decommissioned
 *                     decommissionedAt:
 *                       type: string
 *                       format: date-time
 *                       description: "Timestamp when the gadget was decommissioned."
 *       400:
 *         description: Gadget is already decommissioned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget already decommissioned
 *       404:
 *         description: Gadget not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error decommissioning gadget
 */
router.delete('/:id', protectRoute, deleteGadgetController);

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Trigger self-destruct for a gadget
 *     description: Marks a gadget as "Destroyed" and records the destruction timestamp.
 *     tags:
 *       - Gadget API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The unique identifier of the gadget to be destroyed."
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget destroyed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget destroyed successfully
 *                 destroyedGadget:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: Destroyed
 *                     destroyedAt:
 *                       type: string
 *                       format: date-time
 *                       description: "Timestamp when the gadget was destroyed."
 *       400:
 *         description: Gadget is already destroyed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget already destroyed
 *       404:
 *         description: Gadget not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error destroying gadget
 */
router.post('/:id/self-destruct', protectRoute, destroyGadgetController);

export default router;
