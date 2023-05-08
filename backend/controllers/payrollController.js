import asyncHandler from "express-async-handler";
import Payroll from "../models/payrollModel.js";
import User from "../models/userModel.js";
import Account from "../models/accountModel.js";

//@desc Create Payroll
//@route POST /api/payroll/
//@access Public

const createPayroll = asyncHandler(async (req, res) => {
  const { user, date, status, account } = req.body;
  const creator = await User.findById(user).populate();
  const acc = await Account.findById(account).populate();
  const employee = await User.findById(acc.accOwner).populate();
  const amount = employee?.salary;

  const payroll = await Payroll.create({
    user,
    date,
    amount,
    status,
    account,
  });
  if (payroll) {
    res.status(201).json({
      user: creator,
      date: payroll.date,
      amount: amount,
      status: payroll.status,
      account: payroll.account,
    });
  } else {
    res.status(500);
    throw new Error("Try again please");
  }
});

// @desc    Get all payrolls
// @route   GET /api/payroll
// @access  Private/Admin
const getPayrolls = asyncHandler(async (req, res) => {
  const payrolls = await Payroll.find({}).populate(["user", "account"]);
  res.json(payrolls);
});

//@desc Update Payroll
//@route PUT /api/payroll/:id
//@access Private
const updatePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);

  if (payroll) {
    payroll.user = payroll.user;
    payroll.date = payroll.date;
    payroll.amount = payroll.amount;
    payroll.status = req.body.status || payroll.status;
    payroll.account = payroll.account;
    const updatedPayroll = await payroll.save();
    res.json({
      _id: updatedPayroll._id,
      user: updatedPayroll.user,
      date: updatedPayroll.date,
      amount: updatedPayroll.amount,
      status: updatedPayroll.status,
      account: updatedPayroll.account,
    });
  } else {
    res.status(404);
    throw new Error("Payroll not found");
  }
});

//@desc Delete Payroll
//@route PUT /api/payroll/:id
//@access Private

const deletePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);

  if (payroll) {
    await payroll.remove();
    res.json({ message: "Payroll removed" });
  } else {
    res.status(404);
    throw new Error("Payroll not found");
  }
});
export { createPayroll, getPayrolls, updatePayroll, deletePayroll };
