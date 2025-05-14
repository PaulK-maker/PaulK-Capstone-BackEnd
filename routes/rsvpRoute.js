import express from 'express';
import {
  createRsvp,
  getRsvps,
  getRsvp,
  updateRsvp,
  deleteRsvp
} from '../controllers/rsvpController.js';

const router = express.Router();

router.post('/', createRsvp);
router.get('/', getRsvps);
router.get('/:id', getRsvp);
router.patch('/:id', updateRsvp);
router.delete('/:id', deleteRsvp);

export default router;