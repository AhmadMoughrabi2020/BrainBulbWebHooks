import Expense from "../models/expenseModel.js";
import Income from "../models/incomeModel.js";
import SettledPayrolls from "../models/settledPayrollModel.js";

// create functions for the endpoint

const getIncomeByDate = async (date) => {
  const income = await Income.find({ date: date });
  return income;
};

const getExpenseByDate = async (date) => {
  const expense = await Expense.find({ date: date });
  return expense;
};

const getPayrollsByDate = async (date) => {
  const payroll = await SettledPayrolls.find({ date: date });
  return payroll;
};

const getNetProfitByDate = async (date) => {
  const income = await Income.find({ date: date });
  const expense = await Expense.find({ date: date });
  const payroll = await SettledPayrolls.find({ date: date });
  try {
    const netProfit = income - expense - payroll;
    return netProfit;
  } catch (err) {
    console.log(err);
  }
};

const getTotalIncomesByYear = async (year) => {
  const incomes = await Income.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const totalIncomes = await incomes.reduce(
    (sum, income) => sum + (income.amount || 0),
    0
  );
  return totalIncomes;
};

const getTotalExpensesByYear = async (year) => {
  const expenses = await Expense.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const totalExpenses = await expenses.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );
  return totalExpenses;
};

const getTotalPayrollsByYear = async (year) => {
  const payrolls = await SettledPayrolls.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const totalPayrolls = await payrolls.reduce(
    (sum, payroll) => sum + (payroll.amount || 0),
    0
  );
  return totalPayrolls;
};

const getTotalNetProfitByYear = async (year) => {
  const incomes = await Income.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const expenses = await Expense.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const payrolls = await SettledPayrolls.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const totalIncomes = await incomes.reduce(
    (sum, income) => sum + (income.amount || 0),
    0
  );
  const totalExpenses = await expenses.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );
  const totalPayrolls = await payrolls.reduce(
    (sum, payroll) => sum + (payroll.amount || 0),
    0
  );
  const totalNetProfit = totalIncomes - totalExpenses - totalPayrolls;
  return totalNetProfit;
};

export {
  getIncomeByDate,
  getExpenseByDate,
  getPayrollsByDate,
  getNetProfitByDate,
  getTotalIncomesByYear,
  getTotalExpensesByYear,
  getTotalPayrollsByYear,
  getTotalNetProfitByYear,
};
