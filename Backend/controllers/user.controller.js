import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User Registration
export const registerUser = async (req, res) => {
  const { name, email, password, contact_number } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
        success: false
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      contact_number,
    });

    await user.save();

    res.status(201).json({
      message: "Created Successfully",
      user: {
        name,
        email,
        contact_number,
      },
      success: true
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const tokenData = {
      id: user._id
    }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });


    // const { name, email, contact_number } = user;

    return res.status(200).cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict'
    }).json({
      message: `Welcome back ${user.name}`,
      user,
      // user: {
      //   name,
      //   email,
      //   contact_number
      // },
      success: true
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Server error',
      success: false
    });
  }
};

//logout
export const logoutUser = async (req, res) => {
  try {
      return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: 'strict' }).json({
          message: "logged out successfully",
          success: true
      })
  } catch (err) {
      console.log(err)
  }
}

//getUserprofile 
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    const { name, email, contact_number } = user;

    return res.status(201).json({
      message: "succesfully fetched profile",
      user: {
        name,
        email,
        contact_number
      },
      success: true
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Problem",
      success: false
    })
    console.log(error.message)
  }
}

// Update User Profile
export const updateProfile = async (req, res) => {
  const { name, email, contact_number } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(req.user.id); // Assuming req.user contains the authenticated user

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found',
        success : false
      });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.contact_number = contact_number || user.contact_number;

    // Save updated user
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully!',
      user: {
        name,
        email,
        contact_number
      },
      success: true
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};