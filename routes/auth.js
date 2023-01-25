import { Router } from 'express';
import { login, getMe, getAll } from '../controlers/auth.js';

const router = new Router();

// Login
// http://localhost:5000/api/auth/login
router.post('/login', login);

// Get Profile
// http://localhost:5000/api/auth/all/:id
router.get('/all/:id', getMe);

// Get Profiles
// http://localhost:5000/api/auth/all
router.get('/all', getAll);

export default router;
