import asyncHandler from "express-async-handler";
import Request from "../models/requestModel.js";

//@desc Create request
//@route POST /api/request/
//@access Public

const createRequest = asyncHandler(async (req, res) => {
  const { type, details, method, incomeId, expenseId } = req.body;

  const request = await Request.create({
    type,
    details,
    method,
    incomeId,
    expenseId,
  });
  if (request) {
    res.status(201).json({
      type: type,
      details: details,
      method: method,
      incomeId: incomeId,
      expenseId: expenseId,
    });
  } else {
    res.status(500);
    throw new Error("Try again please");
  }
});
// @desc    Get all requests
// @route   GET /api/request
// @access  Private/admin

const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({});
  res.json(requests);
});

const getUnread = asyncHandler(async (req, res) => {
  const requests = await Request.find({ isRead: false });
  res.json(requests);
});
//@desc Update request
//@route PUT /api/request/:id
//@access Private/Admin
const updateRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (request) {
    request.isRead = true;

    const updatedRequest = await request.save();
    res.json({
      _id: updatedRequest._id,
      type: updatedRequest.type,
      details: updatedRequest.details,
      incomeId: updatedRequest.incomeId,
      expenseId: updatedRequest.expenseId,
      isRead: updatedRequest.isRead,
      method: updatedRequest.method,
    });
  } else {
    res.status(404);
    throw new Error("request not found");
  }
});
export { createRequest, getRequests, getUnread, updateRequest };
