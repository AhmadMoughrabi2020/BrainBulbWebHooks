import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import settledPayrollRoutes from "./routes/settledPayrollRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoute.js";
import requestRoutes from "./routes/requestRoute.js";
import calculationRoutes from "./routes/calculationRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import webHookRoutes from "./routes/webHookRoutes.js";
dotenv.config(); // config .env
connectDB(); // connect to database

const app = express();

// use .body (put, post)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("uploads")); // to be able to fetch from uploads(images) to frontend

//routes
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/settled", settledPayrollRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/calc", calculationRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/webhook", webHookRoutes);
app.use(notFound); // If page not found
app.use(errorHandler); // To override the default error handling that return html with message we use this errorHandler.

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
