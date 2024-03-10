const { users } = require("@models");
const { messages } = require("@utils");
const mongoose = require("mongoose");
const { chamas } = require("@models");
const Services = require("@services");

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
      $lookup: {
        from: "memberships",
        localField: "_id",
        foreignField: "userId",
        as: "memberships",
      },
    },
    {
      $lookup: {
        from: "contributions",
        localField: "_id",
        foreignField: "userId",
        as: "contributions",
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
        loanRepayments: 1,
        referrals: 1,
        memberships: 1,
        contributions: 1,
        //loanrequets,
        //disbursements,-receipts from chama eg rosca
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
