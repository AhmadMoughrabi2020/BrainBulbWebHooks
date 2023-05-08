import asyncHandler from "express-async-handler";
import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";
import SettledPayroll from "../models/settledPayrollModel.js";

//@desc Get   Income and Expense
//@route Get /api/calc/
//@access Public

// const getCurrYearlyIncomeExpense = asyncHandler(async (req, res) => {
//   const currentDate = new Date();
//   const oneYearAgo = new Date();
//   oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
//   const monthYearList = [];
//   let date = new Date(oneYearAgo);
//   while (date <= currentDate) {
//     const month = date.toLocaleString("default", { month: "long" });
//     const year = date.getFullYear();
//     monthYearList.push(`${month} ${year}`);
//     date.setMonth(date.getMonth() + 1);
//   }
//   const pipeline = [
//     {
//       $match: {
//         date: { $gte: oneYearAgo, $lte: currentDate },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           year: { $year: "$date" },
//           month: { $month: "$date" },
//         },

//         incomes: { $sum: { $ifNull: ["$amount", 0] } },
//       },
//     },
//     {
//       $addFields: {
//         incomes: { $ifNull: ["$incomes", 0] },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         month: {
//           $switch: {
//             branches: [
//               { case: { $eq: ["$_id.month", 1] }, then: "January" },
//               { case: { $eq: ["$_id.month", 2] }, then: "February" },
//               { case: { $eq: ["$_id.month", 3] }, then: "March" },
//               { case: { $eq: ["$_id.month", 4] }, then: "April" },
//               { case: { $eq: ["$_id.month", 5] }, then: "May" },
//               { case: { $eq: ["$_id.month", 6] }, then: "June" },
//               { case: { $eq: ["$_id.month", 7] }, then: "July" },
//               { case: { $eq: ["$_id.month", 8] }, then: "August" },
//               { case: { $eq: ["$_id.month", 9] }, then: "September" },
//               { case: { $eq: ["$_id.month", 10] }, then: "October" },
//               { case: { $eq: ["$_id.month", 11] }, then: "November" },
//               { case: { $eq: ["$_id.month", 12] }, then: "December" },
//             ],
//           },
//         },
//         year: "$_id.year",
//         incomes: 1,
//       },
//     },
//     {
//       $sort: { year: 1, month: 1 },
//     },
//   ];

//   const incomes = await Income.aggregate(pipeline);
//   const finalIncomes = monthYearList.map((monthYear) => {
//     const found = incomes.find((r) => `${r.month} ${r.year}` === monthYear);
//     return { name: monthYear, incomes: found ? found.incomes : 0 };
//   });
//   const pipeline2 = [
//     {
//       $match: {
//         date: { $gte: oneYearAgo, $lte: currentDate },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           year: { $year: "$date" },
//           month: { $month: "$date" },
//         },

//         expenses: { $sum: { $ifNull: ["$amount", 0] } },
//       },
//     },
//     {
//       $addFields: {
//         expenses: { $ifNull: ["$expenses", 0] },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         month: {
//           $switch: {
//             branches: [
//               { case: { $eq: ["$_id.month", 1] }, then: "January" },
//               { case: { $eq: ["$_id.month", 2] }, then: "February" },
//               { case: { $eq: ["$_id.month", 3] }, then: "March" },
//               { case: { $eq: ["$_id.month", 4] }, then: "April" },
//               { case: { $eq: ["$_id.month", 5] }, then: "May" },
//               { case: { $eq: ["$_id.month", 6] }, then: "June" },
//               { case: { $eq: ["$_id.month", 7] }, then: "July" },
//               { case: { $eq: ["$_id.month", 8] }, then: "August" },
//               { case: { $eq: ["$_id.month", 9] }, then: "September" },
//               { case: { $eq: ["$_id.month", 10] }, then: "October" },
//               { case: { $eq: ["$_id.month", 11] }, then: "November" },
//               { case: { $eq: ["$_id.month", 12] }, then: "December" },
//             ],
//           },
//         },
//         year: "$_id.year",
//         expenses: 1,
//       },
//     },
//     {
//       $sort: { year: 1, month: 1 },
//     },
//   ];
//   const expenses = await Expense.aggregate(pipeline2);
//   const finalExpenses = monthYearList.map((monthYear) => {
//     const found = expenses.find((r) => `${r.month} ${r.year}` === monthYear);
//     return { name: monthYear, expenses: found ? found.expenses : 0 };
//   });

//   const result = finalIncomes.reduce((acc, obj1) => {
//     const index = acc.findIndex((obj2) => obj2.name === obj1.name);
//     if (index === -1) {
//       acc.push(obj1);
//     } else {
//       acc[index] = { ...acc[index], ...obj1 };
//     }
//     return acc;
//   }, finalExpenses);

//   return res.json(result);
// });

// const getNetProfit = asyncHandler(async (req, res) => {
//   const currentDate = new Date();
//   const oneYearAgo = new Date();
//   oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
//   const monthYearList = [];
//   let date = new Date(oneYearAgo);
//   while (date <= currentDate) {
//     const month = date.toLocaleString("default", { month: "long" });
//     const year = date.getFullYear();
//     monthYearList.push(`${month} ${year}`);
//     date.setMonth(date.getMonth() + 1);
//   }
//   const pipeline = [
//     {
//       $match: {
//         date: { $gte: oneYearAgo, $lte: currentDate },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           year: { $year: "$date" },
//           month: { $month: "$date" },
//         },

//         incomes: { $sum: { $ifNull: ["$amount", 0] } },
//       },
//     },
//     {
//       $addFields: {
//         incomes: { $ifNull: ["$incomes", 0] },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         month: {
//           $switch: {
//             branches: [
//               { case: { $eq: ["$_id.month", 1] }, then: "January" },
//               { case: { $eq: ["$_id.month", 2] }, then: "February" },
//               { case: { $eq: ["$_id.month", 3] }, then: "March" },
//               { case: { $eq: ["$_id.month", 4] }, then: "April" },
//               { case: { $eq: ["$_id.month", 5] }, then: "May" },
//               { case: { $eq: ["$_id.month", 6] }, then: "June" },
//               { case: { $eq: ["$_id.month", 7] }, then: "July" },
//               { case: { $eq: ["$_id.month", 8] }, then: "August" },
//               { case: { $eq: ["$_id.month", 9] }, then: "September" },
//               { case: { $eq: ["$_id.month", 10] }, then: "October" },
//               { case: { $eq: ["$_id.month", 11] }, then: "November" },
//               { case: { $eq: ["$_id.month", 12] }, then: "December" },
//             ],
//           },
//         },
//         year: "$_id.year",
//         incomes: 1,
//       },
//     },
//     {
//       $sort: { year: 1, month: 1 },
//     },
//   ];

//   const incomes = await Income.aggregate(pipeline);
//   const finalIncomes = monthYearList.map((monthYear) => {
//     const found = incomes.find((r) => `${r.month} ${r.year}` === monthYear);
//     return { name: monthYear, incomes: found ? found.incomes : 0 };
//   });
//   const pipeline2 = [
//     {
//       $match: {
//         date: { $gte: oneYearAgo, $lte: currentDate },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           year: { $year: "$date" },
//           month: { $month: "$date" },
//         },

//         expenses: { $sum: { $ifNull: ["$amount", 0] } },
//       },
//     },
//     {
//       $addFields: {
//         expenses: { $ifNull: ["$expenses", 0] },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         month: {
//           $switch: {
//             branches: [
//               { case: { $eq: ["$_id.month", 1] }, then: "January" },
//               { case: { $eq: ["$_id.month", 2] }, then: "February" },
//               { case: { $eq: ["$_id.month", 3] }, then: "March" },
//               { case: { $eq: ["$_id.month", 4] }, then: "April" },
//               { case: { $eq: ["$_id.month", 5] }, then: "May" },
//               { case: { $eq: ["$_id.month", 6] }, then: "June" },
//               { case: { $eq: ["$_id.month", 7] }, then: "July" },
//               { case: { $eq: ["$_id.month", 8] }, then: "August" },
//               { case: { $eq: ["$_id.month", 9] }, then: "September" },
//               { case: { $eq: ["$_id.month", 10] }, then: "October" },
//               { case: { $eq: ["$_id.month", 11] }, then: "November" },
//               { case: { $eq: ["$_id.month", 12] }, then: "December" },
//             ],
//           },
//         },
//         year: "$_id.year",
//         expenses: 1,
//       },
//     },
//     {
//       $sort: { year: 1, month: 1 },
//     },
//   ];
//   const expenses = await Expense.aggregate(pipeline2);
//   const finalExpenses = monthYearList.map((monthYear) => {
//     const found = expenses.find((r) => `${r.month} ${r.year}` === monthYear);
//     return { name: monthYear, expenses: found ? found.expenses : 0 };
//   });

//   const result = finalIncomes.reduce((acc, obj1) => {
//     const index = acc.findIndex((obj2) => obj2.name === obj1.name);
//     if (index === -1) {
//       acc.push(obj1);
//     } else {
//       acc[index] = { ...acc[index], ...obj1 };
//     }
//     return acc;
//   }, finalExpenses);

//   const pipeline3 = [
//     {
//       $match: {
//         date: { $gte: oneYearAgo, $lte: currentDate },
//         type: "Debit",
//       },
//     },
//     {
//       $group: {
//         _id: {
//           year: { $year: "$date" },
//           month: { $month: "$date" },
//         },

//         amount: { $sum: { $ifNull: ["$amount", 0] } },
//       },
//     },
//     {
//       $addFields: {
//         amount: { $ifNull: ["$amount", 0] },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         month: {
//           $switch: {
//             branches: [
//               { case: { $eq: ["$_id.month", 1] }, then: "January" },
//               { case: { $eq: ["$_id.month", 2] }, then: "February" },
//               { case: { $eq: ["$_id.month", 3] }, then: "March" },
//               { case: { $eq: ["$_id.month", 4] }, then: "April" },
//               { case: { $eq: ["$_id.month", 5] }, then: "May" },
//               { case: { $eq: ["$_id.month", 6] }, then: "June" },
//               { case: { $eq: ["$_id.month", 7] }, then: "July" },
//               { case: { $eq: ["$_id.month", 8] }, then: "August" },
//               { case: { $eq: ["$_id.month", 9] }, then: "September" },
//               { case: { $eq: ["$_id.month", 10] }, then: "October" },
//               { case: { $eq: ["$_id.month", 11] }, then: "November" },
//               { case: { $eq: ["$_id.month", 12] }, then: "December" },
//             ],
//           },
//         },
//         year: "$_id.year",
//         amount: 1,
//       },
//     },
//     {
//       $sort: { year: 1, month: 1 },
//     },
//   ];

//   const payrolls = await SettledPayroll.aggregate(pipeline3);
//   const finalPayrolls = monthYearList.map((monthYear) => {
//     const found = payrolls.find((r) => `${r.month} ${r.year}` === monthYear);
//     return { name: monthYear, amount: found ? found.amount : 0 };
//   });
//   const finalResult = result.reduce((acc, obj1) => {
//     const index = acc.findIndex((obj2) => obj2.name === obj1.name);
//     if (index === -1) {
//       acc.push(obj1);
//     } else {
//       acc[index] = { ...acc[index], ...obj1 };
//     }
//     return acc;
//   }, finalPayrolls);
//   const netProfit = finalResult.map((item) => ({
//     name: item.name,
//     netProfit: item.incomes - item.expenses - item.amount,
//   }));
//   return res.json(netProfit);
// });

//@desc Get yearly data
//@route Get /api/calc/yearly?date=
//@access Public
const getYearlyData = asyncHandler(async (req, res) => {
  const date = new Date(req.query.date);
  const year = date.getFullYear();

  try {
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
    const payrolls = await SettledPayroll.find({
      date: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31T23:59:59.999Z`),
      },
    });

    const data = [];

    for (let i = 0; i < 12; i++) {
      const month =
        i >= 9
          ? new Date(`${year}-${i + 1}-01T00:00:00.000Z`)
          : new Date(`${year}-0${i + 1}-01T00:00:00.000Z`);

      const incomesOfMonth = incomes
        .filter((income) => new Date(income.date).getMonth() === i)
        .reduce((sum, income) => sum + (income.amount || 0), 0);
      const expensesOfMonth = expenses
        .filter((expense) => new Date(expense.date).getMonth() === i)
        .reduce((sum, expense) => sum + (expense.amount || 0), 0);
      const payrollsOfMonth = payrolls
        .filter((payroll) => new Date(payroll.date).getMonth() === i)
        .reduce((sum, payroll) => sum + (payroll.amount || 0), 0);
      const netProfitOfMonth =
        incomesOfMonth - expensesOfMonth - payrollsOfMonth;
      data.push({
        month: month.toLocaleString("default", { month: "long" }),
        incomes: incomesOfMonth,
        expenses: expensesOfMonth,
        payrolls: payrollsOfMonth,
        netProfit: netProfitOfMonth,
      });
    }

    const totalIncomes = incomes.reduce(
      (sum, income) => sum + (income.amount || 0),
      0
    );
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );
    const totalPayrolls = payrolls.reduce(
      (sum, payroll) => sum + (payroll.amount || 0),
      0
    );
    const totalNetProfit = totalIncomes - totalExpenses - totalPayrolls;

    const total = {
      year: year,
      incomes: totalIncomes,
      expenses: totalExpenses,
      payrolls: totalPayrolls,
      netProfit: totalNetProfit,
    };
    return res.json({ data, total });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: "Something went wrong." });
    res.json(err);
  }
});
//@desc Get net profit
//@route Get /api/calc/monthly?date=
//@access Public
const getMonthlyData = asyncHandler(async (req, res) => {
  try {
    const date = new Date(req.query.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, 0, 0, 0, 0));

    const income = await Income.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    const expense = await Expense.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    const payroll = await SettledPayroll.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const data = [];
    const currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      const incomes = income.filter(
        (inc) =>
          inc.date.toISOString().slice(0, 10) ===
          currentDate.toISOString().slice(0, 10)
      );
      const expenses = expense.filter(
        (exp) =>
          exp.date.toISOString().slice(0, 10) ===
          currentDate.toISOString().slice(0, 10)
      );
      const payrolls = payroll.filter(
        (pay) =>
          pay.date.toISOString().slice(0, 10) ===
          currentDate.toISOString().slice(0, 10)
      );

      const incomeAmount = incomes.reduce((acc, cur) => acc + cur.amount, 0);
      const expenseAmount = expenses.reduce((acc, cur) => acc + cur.amount, 0);
      const payrollAmount = payrolls.reduce((acc, cur) => acc + cur.amount, 0);
      const netProfit = incomeAmount - expenseAmount;

      data.push({
        date: currentDate.toISOString().slice(0, 10),
        income: incomeAmount,
        expense: expenseAmount,
        payroll: payrollAmount,
        netProfit,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    const totalIncome = income.reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = expense.reduce((acc, cur) => acc + cur.amount, 0);
    const totalPayroll = payroll.reduce((acc, cur) => acc + cur.amount, 0);
    const totalNetProfit = totalIncome - totalExpense;

    return res.json({
      data,
      total: {
        income: totalIncome,
        expense: totalExpense,
        payroll: totalPayroll,
        netProfit: totalNetProfit,
        month: month,
        year: year,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});
//@desc Get net profit
//@route Get /api/calc/range?start= & end =
//@access Public
const getRangeData = asyncHandler(async (req, res) => {
  try {
    const endDate = new Date(req.query.end);
    const startDate = new Date(req.query.start);
    const date = new Date(startDate);
    const income = await Income.find({
      date: { $gte: startDate, $lte: endDate },
    });
    const expense = await Expense.find({
      date: { $gte: startDate, $lte: endDate },
    });
    const payroll = await SettledPayroll.find({
      date: { $gte: startDate, $lte: endDate },
    });

    const data = [];

    while (date <= new Date(endDate)) {
      const incomes = income.filter(
        (inc) =>
          inc.date.toISOString().slice(0, 10) ===
          date.toISOString().slice(0, 10)
      );
      const expenses = expense.filter(
        (exp) =>
          exp.date.toISOString().slice(0, 10) ===
          date.toISOString().slice(0, 10)
      );
      const payrolls = payroll.filter(
        (pay) =>
          pay.date.toISOString().slice(0, 10) ===
          date.toISOString().slice(0, 10)
      );

      const incomeAmount = incomes.reduce((acc, cur) => acc + cur.amount, 0);
      const expenseAmount = expenses.reduce((acc, cur) => acc + cur.amount, 0);
      const payrollAmount = payrolls.reduce((acc, cur) => acc + cur.amount, 0);
      const netProfit = incomeAmount - expenseAmount;

      data.push({
        date: date.toISOString().slice(0, 10),
        income: incomeAmount,
        expense: expenseAmount,
        payroll: payrollAmount,
        netProfit,
      });

      date.setDate(date.getDate() + 1);
    }

    const totalIncome = income.reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = expense.reduce((acc, cur) => acc + cur.amount, 0);
    const totalPayroll = payroll.reduce((acc, cur) => acc + cur.amount, 0);
    const totalNetProfit = totalIncome - totalExpense;

    res.json({
      data,
      totals: {
        income: totalIncome,
        expense: totalExpense,
        payroll: totalPayroll,
        netProfit: totalNetProfit,
        startDate,
        endDate,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { getYearlyData, getMonthlyData, getRangeData };
