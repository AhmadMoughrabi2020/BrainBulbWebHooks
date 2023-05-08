import asyncHandler from "express-async-handler";
import Income from "../models/incomeModel.js";

//@desc Create income
//@route POST /api/income/
//@access Public

const createIncome = asyncHandler(async (req, res) => {
  const { source, amount, date } = req.body;

  const income = await Income.create({
    source,
    amount,
    date,
  });
  if (income) {
    res.status(201).json({
      source: source,
      amount: amount,
      date: date,
    });
  } else {
    res.status(500);
    throw new Error("Try again please");
  }
});
// @desc    Get all incomes
// @route   GET /api/income
// @access  Public

const getIncomes = asyncHandler(async (req, res) => {
  const incomes = await Income.find({});
  res.json(incomes);
});

// @desc    Get one income
// @route   GET /api/income/:id
// @access  Private
const getOneIncome = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (income) {
    res.json(income);
    return res.json(income);
  } else {
    res.status(404);
    throw new Error("income not found");
  }
});

//@desc Update income
//@route PUT /api/income/:id
//@access Private/Admin

const updateIncome = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (income) {
    income.source = req.body.source || income.source;
    income.amount = req.body.amount || income.amount;
    income.date = req.body.date || income.date;
    const updatedIncome = await income.save();
    res.json({
      _id: updatedIncome._id,
      source: updatedIncome.source,
      amount: updatedIncome.amount,
      date: updatedIncome.date,
    });
  } else {
    res.status(404);
    throw new Error("income not found");
  }
});
//@desc Delete income
//@route PUT /api/income/:id
//@access Private/Admin

const deleteIncome = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);

  if (income) {
    await income.remove();
    res.json({ message: "income removed" });
  } else {
    res.status(404);
    throw new Error("income not found");
  }
});

export { createIncome, getIncomes, updateIncome, deleteIncome, getOneIncome };
