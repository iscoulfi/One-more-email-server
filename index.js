import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoute from './routes/auth.js';
import msgRoute from './routes/messages.js';
import { Server } from 'socket.io';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));

//Routes
app.use('/api/auth', authRoute);
app.use('/api/msg', msgRoute);

async function startApp() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.umenyad.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error.message);
  }
}
startApp();

const server = app.listen(PORT, () =>
  console.log(`Server started on port: ${PORT}`)
);
const io = new Server(server, {
  cors: {
    origin: process.env.SERV_ORIGIN,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', socket => {
  global.chatSocket = socket;
  socket.on('add-user', userId => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', data => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', {
        from: data.from,
        theme: data.theme,
        message: data.message,
      });
    }
  });
});
