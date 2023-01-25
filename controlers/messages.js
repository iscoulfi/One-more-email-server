import Message from '../models/Message.js';

//Add

export const addMessage = async (req, res) => {
  try {
    const { from, to, theme, message } = req.body;

    const data = new Message({
      message: { theme: theme, text: message },
      sender: from,
      recipient: to,
    });
    await data.save();

    res.json({
      data,
      message: 'Message sent.',
    });
  } catch (error) {
    res.json({ message: 'Add message error.' });
  }
};

//Get

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      recipient: req.params.recipient,
    });
    res.json({
      messages,
      message: 'Messages received.',
    });
  } catch (error) {
    res.json({ message: 'Get messages error.' });
  }
};

// GetSent
export const getSentMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      sender: req.params.sender,
    });
    res.json({
      messages,
      message: 'Messages received.',
    });
  } catch (error) {
    res.json({ message: 'Get messages error.' });
  }
};
