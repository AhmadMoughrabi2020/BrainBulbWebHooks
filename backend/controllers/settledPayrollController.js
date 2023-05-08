import asyncHandler from "express-async-handler";
import Payroll from "../models/payrollModel.js";
import Account from "../models/accountModel.js";
import SettledPayroll from "../models/settledPayrollModel.js";

// @desc    Get PayrollAll
// @route   GET /api/settled
// @access  Private/Private
const getSettledPayrolls = asyncHandler(async (req, res) => {
  const settled = await SettledPayroll.find({})
    .populate("payrolls")
    .populate({
      path: "payrolls",
      populate: {
        path: "account",
        model: Account,
        select: "-_id accNumber",
        // select: "_id",
      },
    });
  res.json(settled);
});

//@desc Create SettledPayroll
//@route POST /api/settled/
//@access Private/Admin

const createSettledPayrolls = asyncHandler(async (req, res) => {
  const setlledPayrolls = [];
  req.body.payrolls.forEach((pay) => {
    setlledPayrolls.push(pay._id);
  });

  try {
    const settled = await SettledPayroll.create([
      {
        payrolls: setlledPayrolls,
        date: req.body.date,
        amount: req.body.amount,
        status: req.body.status,
        type: "Debit",
      },
      {
        payrolls: setlledPayrolls,
        date: req.body.date,
        amount: req.body.amount,
        status: req.body.status,
        type: "Credit",
      },
    ]);
    res.status(201).json(settled);
    return settled;
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export { createSettledPayrolls, getSettledPayrolls };
