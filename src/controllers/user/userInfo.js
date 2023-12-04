const { users } = require("@models");
const { messages } = require("@utils");
const mongoose = require("mongoose");

const userInfo = async (req, res) => {
  const { userId } = req.body;
  const userData = await users.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "mpesadeposits",
        localField: "_id",
        foreignField: "userId",
        as: "mpesaDeposits",
      },
    },
    {
      $lookup: {
        from: "withdrawals",
        localField: "_id",
        foreignField: "userId",
        as: "withdrawals",
      },
    },
    {
      $project: {
        userId: "$_id",
        username: 1,
        firstname: 1,
        lastname: 1,
        photoURL: 1,
        email: 1,
        phone: 1,
        accountBalance: 1,
        mpesaDeposits: 1,
        withdrawals: 1,
        chamas: 1,
        loanRequests: 1,
        loanRepayments: 1,
        referrals: 1,
        // password: 0,
        // refreshToken: 0,
        // passwordResetToken: 0,
        // createdAt: 0,
        // updatedAt: 0,
        // _id: 0,
        // role: 0,
      },
    },
  ]);
  return res.status(200).json({
    message: messages.requestSuccessful,
    payload: {
      user: userData[0],
    },
  });
};

module.exports = userInfo;
