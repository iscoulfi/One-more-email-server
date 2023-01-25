import User from '../models/User.js';

// Login user
export const login = async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username });

    if (user) {
      return res.json({
        user,
        message: 'You are logged in.',
      });
    }

    user = new User({
      username,
    });

    await user.save();

    res.json({
      user,
      message: 'Registration completed successfully.',
    });
  } catch (error) {
    res.json({ message: 'Authorization error.' });
  }
};

// Get Me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.json({
        message: 'This user does not exist.',
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    res.json({ message: 'No access.' });
  }
};

// Get All
export const getAll = async (req, res) => {
  try {
    const users = await User.find({});

    res.json({
      users,
    });
  } catch (error) {
    res.json("Don't know wtf happened");
  }
};
