import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Account from "../models/accountModel.js";
import Payroll from "../models/payrollModel.js";
import emailvalidator from "email-validator";
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, salary } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists try different email");
  }
  if (name === "" || name.trim() === "") {
    res.status(400);
    throw new Error("Name is Required");
  }
  if (salary === 0) {
    res.status(400);
    throw new Error("Salary is required");
  }
  if (password === "" || password === null || password.trim() === "") {
    res.status(400);
    throw new Error("Password is required");
  }
  if (emailvalidator.validate(email)) {
    const user = await User.create({
      name,
      email,
      password,
      salary,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        salary: user.salary,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else {
    res.status(400).send("Invalid Email");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const accounts = await Account.find({});
  const payrolls = await Payroll.find({});
  const matchedAcc = accounts.filter(
    (acc) => JSON.stringify(acc.accOwner) === JSON.stringify(user._id)
  );
  if (user) {
    if (matchedAcc.length > 0) {
      matchedAcc.forEach(async (acc) => {
        const account = await Account.findById(acc._id);
        const matchedPay = payrolls.filter(
          (pay) => JSON.stringify(pay.account) === JSON.stringify(account._id)
        );
        if (matchedPay.length > 0) {
          matchedPay.forEach(async (pay) => {
            const payroll = await Payroll.findById(pay._id);
            await payroll.remove();
          });
        }
        await account.remove();
      });
    }
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password");

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (req.body.name === "" || req.body.name.trim() === "") {
    res.status(400);
    throw new Error("Name is required");
  }
  if (req.body.salary == 0) {
    res.status(400);
    throw new Error("Salary is required");
  }
  if (emailvalidator.validate(req.body.email)) {
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;
      user.salary = req.body.salary || user.salary;
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        salary: updatedUser.salary,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Email");
  }
});

export {
  authUser,
  registerUser,
  // getUserProfile,
  // updateUserProfile,
  getUsers,
  deleteUser,
  // getUserById,
  updateUser,
};
