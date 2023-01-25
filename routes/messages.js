import { Router } from 'express';
import {
  addMessage,
  getMessages,
  getSentMessages,
} from '../controlers/messages.js';

const router = new Router();

// http://localhost:5000/api/msg/addmsg
router.post('/addmsg', addMessage);

// http://localhost:5000/api/msg/:recipient
router.get('/:recipient', getMessages);

// http://localhost:5000/api/msg/sent/:sender
router.get('/sent/:sender', getSentMessages);

export default router;
