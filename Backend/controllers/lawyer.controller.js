import Lawyer from '../models/lawyer.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from '../utils/datauri.js';
import cloudinary from "../utils/cloudinary.js"

// Register a new lawyer
export const registerLawyer = async (req, res) => {
  const { name, email, password, specialization, experience, contact_number, biography, availability } = req.body;
  const city = req.body.city;
  const state = req.body.state;

  const file = req.file;

  if (!name || !email || !password || !specialization) {
    res.status(400).json({
      message: "Please Fill neccesary fields",
      success: false
    })
  }
  try {
    // Check if the lawyer already exists
    const existingLawyer = await Lawyer.findOne({ email });
    if (existingLawyer) {
      return res.status(400).json({ message: 'Lawyer already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // file upload
    let filelink = "";
    if(file) {
      const fileuri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileuri.content,{
        resource_type : 'raw'
      }).catch((error) => {
        console.log(error);
      });
      filelink = cloudResponse.secure_url
    }

    // Create new lawyer
    const lawyer = await Lawyer.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience,
      location : {
        city,
        state,
      },
      contact_number,
      biography,
      availability,
      profile_pic : filelink
    });

    res.status(201).json({
      message: 'Lawyer registered successfully',
      lawyer: {
        name,
        email,
        specialization,
        experience,
        location :{
          city,
          state,
        },
        contact_number,
        biography,
        availability,
        profile_pic: filelink
      },
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

// Lawyer login
export const loginLawyer = async (req, res) => {
  console.log("Login lawyer started")
  const { email, password } = req.body;
  console.log(email,password)

  try {
    const lawyer = await Lawyer.findOne({ email });
    if (!lawyer || ! await bcrypt.compare(password, lawyer.password)) {
      return res.status(401).json({
        message: 'Invalid credentials',
        success: false
      });
    }

    // Generate JWT and send as a cookie
    const token = jwt.sign({ id: lawyer._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    res.cookie('token', token, {
      maxage: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict'
    });

    res.status(200).json({
      message: 'Login successful',
      lawyer: {
        _id: lawyer._id,
        name: lawyer.name,
        email: lawyer.email,
        specialization: lawyer.specialization,
        experience: lawyer.experience,
        location : {
          city : lawyer.location.city,
          state : lawyer.location.state
        },
        contact_number : lawyer.contact_number,
        biography : lawyer.biography,
        availability : lawyer.availability,
        profile_pic : lawyer.profile_pic
      },
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

//logout
export const logoutLawyer = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: 'strict' }).json({
      message: "logged out successfully",
      success: true
    })
  } catch (err) {
    console.log(err)
  }
}

// Get all lawyers
export const getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.status(200).json({
      message : "Lawyers Fetched Successfully",
      lawyers,
      success: true      
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      success : false
    });
  }
};

// Get lawyer by ID
export const getLawyerById = async (req, res) => {
  const { id } = req.params;
  // console.log(id)

  try {
    const lawyer = await Lawyer.findById(id);
    if (!lawyer) {
      return res.status(404).json({
        message: 'Lawyer not found',
        success: false
      });
    }
    res.status(200).json({
      message: "Lawyer find Successfully",
      lawyer,
      success: true
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

// Update lawyer profile
export const updateLawyerProfile = async (req, res) => {
  const { name,email, specialization, experience, contact_number, biography , availability} = req.body;

  const city= req.body.city;
  const state= req.body.state;

  console.log(name,email, specialization, experience, contact_number, biography , availability, city , state)

  const file = req.file;
  
  try {
    const lawyer = await Lawyer.findById(req.user._id); // Assuming req.user is populated from middleware
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    // Update the lawyer's profile details
    lawyer.name = name || lawyer.name;
    lawyer.email = email || lawyer.email;
    lawyer.specialization = specialization || lawyer.specialization;
    lawyer.experience = experience || lawyer.experience;
    lawyer.location.city = city || lawyer.location.city;
    lawyer.location.state = state || lawyer.location.state;
    lawyer.contact_number = contact_number || lawyer.contact_number;
    lawyer.biography = biography || lawyer.biography;
    lawyer.availability = availability || lawyer.availability;
    
    let fileLink = "";
    if(file) {
      const fileuri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileuri.content , {
        'resource_type':'raw'
      })
      if(cloudResponse) {
        fileLink = cloudResponse.secure_url
      }
      lawyer.profile_pic = fileLink || lawyer.profile_pic; 
    }

    await lawyer.save();
    res.status(200).json({ 
      message: 'Profile updated successfully',
       lawyer,
      success : true
      });
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      success : false
    });
  }
};

// Delete lawyer profile
export const deleteLawyer = async (req, res) => {
  const { id } = req.params;

  try {
    const lawyer = await Lawyer.findById(id);
    if (!lawyer) {
      return res.status(404).json({ 
        message: 'Lawyer not found',
      success:false
     });
    }

    if (!req.user || !req.user._id.equals(lawyer._id)) {
      return res.status(403).json({
        message: "Not authorized to delete this lawyer",
        success: false
      });
    }

    await lawyer.deleteOne({ _id: id });
    res.status(200).json({
      message: 'Lawyer deleted successfully',
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};
