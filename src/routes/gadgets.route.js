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

router.get('/', protectRoute, getGadgetController);

router.post('/', protectRoute, postGadgetController);

router.patch('/', protectRoute, updateGadgetController);

router.delete('/:id', protectRoute, deleteGadgetController);

router.post('/:id/self-destruct', destroyGadgetController);

export default router;
