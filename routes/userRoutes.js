import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUsers,
  getUser
} from '../controllers/userController.js';

//Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUser);

export default router;
