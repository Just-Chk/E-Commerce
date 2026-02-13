const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (user) => 
{
  return jwt.sign(
    { user: { id: user.id, email: user.email } },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

exports.signup = async (req, res) => 
{
  try 
  {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User
    ({
      name,
      email,
      password
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json
    ({
      message: 'User created successfully',
      token,
      user: 
      {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => 
{
  try 
  {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json
    ({
      message: 'Login successful',
      token,
      user: 
      {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};