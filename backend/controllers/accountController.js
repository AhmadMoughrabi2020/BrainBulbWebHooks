import asyncHandler from "express-async-handler";
import Account from "../models/accountModel.js";
import User from "../models/userModel.js";
import Payroll from "../models/payrollModel.js";
import mongoose from "mongoose";
//@desc Create Account
//@route POST /api/account/
//@access Private

const createAccount = asyncHandler(async (req, res) => {
  const { accOwner, accNumber, accType } = req.body;
  const objectId = mongoose.Types.ObjectId(accOwner);
  const owner = await User.findById(objectId).populate();
  const accountExists = await Account.findOne({ accNumber });
  if (accountExists) {
    res.status(400);
    throw new Error("Account number already exists try again");
  }
  const account = await Account.create({
    accOwner,
    accNumber,
    accType,
  });
  if (account) {
    res.status(201).json({
      accOwner: owner,
      accNumber: accNumber,
      accType: accType,
    });
  } else {
    res.status(500);
    throw new Error("Try again please");
  }
});

// @desc    Get all accounts
// @route   GET /api/account
// @access  Private/Admin

const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({}).populate("accOwner");
  res.json(accounts);
});

//@desc Update Account
//@route PUT /api/account/:id
//@access Private

const updateAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);
  const ownerId = mongoose.Types.ObjectId(req.body.accOwnerId);

  if (req.body.accType === "" || req.body.accType.trim() === "") {
    res.status(400);
    throw new Error("Account Type is required");
  }

  if (account) {
    account.accNumber = req.body.accNumber || account.accNumber;
    account.accType = req.body.accType || account.accType;
    account.accOwner = ownerId || account.accOwner;
    const updatedAccount = await account.save();
    const owner = await User.findById(updatedAccount.accOwner);
    res.json({
      _id: updatedAccount._id,
      accOwner: owner,
      accNumber: updatedAccount.accNumber,
      accType: updatedAccount.accType,
    });
  } else {
    res.status(404);
    throw new Error("Account not found");
  }
});

// @desc    Delete Account
// @route   DELETE /api/account/:id
// @access  Private/Admin
const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);
  const payrolls = await Payroll.find({});
  const matchedPay = payrolls.filter(
    (pay) => JSON.stringify(pay.account) === JSON.stringify(account._id)
  );

  if (account) {
    if (matchedPay.length > 0) {
      matchedPay.forEach(async (pay) => {
        const payroll = await Payroll.findById(pay._id);
        await payroll.remove();
      });
    }
    await account.remove();
    res.json({ message: "Account removed" });
  } else {
    res.status(404);
    throw new Error("Account not found");
  }
});
export { createAccount, getAccounts, updateAccount, deleteAccount };
