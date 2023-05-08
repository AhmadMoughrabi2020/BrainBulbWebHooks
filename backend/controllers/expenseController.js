import asyncHandler from "express-async-handler";
import Expense from "../models/expenseModel.js";

//@desc Create expense
//@route POST /api/expense/
//@access Public

const createExpense = asyncHandler(async (req, res) => {
  const { description, amount, date, category } = req.body;
  const expense = await Expense.create({
    description,
    amount,
    date,
    category,
  });
  if (expense) {
    res.status(201).json({
      description: description,
      amount: amount,
      date: date,
      category: category,
    });
  } else {
    res.status(500);
    throw new Error("Try again please");
  }
});
// @desc    Get all expenses
// @route   GET /api/expense
// @access  Public

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({});
  res.json(expenses);
});
// @desc    Get one expense
// @route   GET /api/expense/:id
// @access  Private
const getOneExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense) {
    res.json(expense);
    return res.json(expense);
  } else {
    res.status(404);
    throw new Error("expense not found");
  }
});
//@desc Update expense
//@route PUT /api/expense/:id
//@access Private/Admin

const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    expense.description = req.body.description || expense.description;
    expense.amount = req.body.amount || expense.amount;
    expense.date = req.body.date || expense.date;
    expense.category = req.body.category || expense.category;
    const updatedExpense = await expense.save();
    res.json({
      _id: updatedExpense._id,
      description: updatedExpense.description,
      amount: updatedExpense.amount,
      date: updatedExpense.date,
      category: updatedExpense.category,
    });
  } else {
    res.status(404);
    throw new Error("expense not found");
  }
});
//@desc Delete expense
//@route PUT /api/expense/:id
//@access Private/Admin

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    await expense.remove();
    res.json({ message: "expense removed" });
  } else {
    res.status(404);
    throw new Error("expense not found");
  }
});
export {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getOneExpense,
};
