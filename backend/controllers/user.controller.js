import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = `https://avatar.iran.liara.run/public/boy`;

    await User.create({
      fullName,
      email,
      password: hashPassword,
      avatar
    });

    return res.status(201).json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.error("Error in register controller: ", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password", success: false });
    }

    const tokenData = {
      userId: user._id
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: '1d'
    });

    return res.status(200)
      .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
      .json({ message: `${user.fullName} logged in successfully`, user, success: true });
  } catch (error) {
    console.error("Error in login controller: ", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};




export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully"
    });
  } catch (error) {
    console.log(error);
  }
};
