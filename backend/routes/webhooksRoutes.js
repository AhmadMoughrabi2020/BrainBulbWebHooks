import express from "express";
import {
  getTotalIncomesByYear,
  getTotalExpensesByYear,
  getTotalPayrollsByYear,
  getTotalNetProfitByYear,
} from "../controllers/webhookController.js";
const router = express.Router();

router.post("/webhook", async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;

  if (intentName === "GetTotalIncomesByYear") {
    const year = req.body.queryResult.parameters.year;
    const totalIncomes = await getTotalIncomesByYear(year);

    const response = {
      fulfillmentText: `The total incomes for year ${year} is ${totalIncomes}.`,
    };

    res.json(response);
  } else if (intentName === "GetTotalExpensesByYear") {
    const year = req.body.queryResult.parameters.year;
    const totalExpenses = await getTotalExpensesByYear(year);

    const response = {
      fulfillmentText: `The total expenses for year ${year} is ${totalExpenses}.`,
    };

    res.json(response);
  } else if (intentName === "GetTotalPayrollsByYear") {
    const year = req.body.queryResult.parameters.year;
    const totalPayrolls = await getTotalPayrollsByYear(year);

    const response = {
      fulfillmentText: `The total payrolls for year ${year} is ${totalPayrolls}.`,
    };

    res.json(response);
  } else if (intentName === "GetTotalNetProfitByYear") {
    const year = req.body.queryResult.parameters.year;
    const totalNetProfit = await getTotalNetProfitByYear(year);

    const response = {
      fulfillmentText: `The total net profit for year ${year} is ${totalNetProfit}.`,
    };

    res.json(response);
  } else {
    // Handle unknown intents
    const response = {
      fulfillmentText: "Sorry, I don't understand.",
    };

    res.json(response);
  }
});
export default router;
