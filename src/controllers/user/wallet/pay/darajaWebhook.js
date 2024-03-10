require("dotenv").config();
const { users, mpesaDeposits } = require("@models");
const mongoose = require("mongoose");
const { messages } = require("@utils");

const whitelist = [
  "196.201.214.200",
  "196.201.214.206",
  "196.201.213.114",
  "196.201.214.207",
  "196.201.214.208",
  "196.201.213.44",
  "196.201.212.127",
  "196.201.212.138",
  "196.201.212.129",
  "196.201.212.136",
  "196.201.212.74",
  "196.201.212.69",
];

const darajaWebhook = async (req, res) => {
  let session;
  try {
    const ip = req.headers["x-forwarded-for"]
      ?.split(",")
      ?.map((ip) => ip.trim())[1];
    if (!whitelist.includes(ip)) {
      return res.status(403).json({ message: messages.forbidden });
      //emit error event
    }
    const { ResultCode, ResultDesc, CallbackMetadata } =
      req.body.Body.stkCallback;
    if (ResultCode !== 0) {
      return res.status(400).json({ message: messages.depositFailed });
    }
    session = await mongoose.startSession();
    session.startTransaction();

    const Amount = parseInt(CallbackMetadata.Item[0].Value);
    const MpesaReceiptNumber = CallbackMetadata.Item[1].Value;
    const Msisdn = CallbackMetadata.Item[4].Value;

    const user = await users.findOne({ phone: Msisdn });

    if (!user) {
      return res.status(400).json({ message: messages.depositFailed });
    }
    await users.updateOne(
      { phone: Msisdn },
      {
        $inc: { accountBalance: Amount },
      },
      { session }
    );

    await mpesaDeposits.create(
      [
        {
          userId: user._id,
          phone: Msisdn || user.phone,
          amount: Amount,
          mpesaRef: MpesaReceiptNumber || "none",
          status: ResultCode == 0 ? "Success" : "Failed",
          resultCode: ResultCode,
          resultDesc: ResultDesc,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session && session.endSession();

    return res.status(200).json({ message: messages.depositSuccess });
    //emit success event
  } catch (error) {
    session && (await session.abortTransaction());
    session && session.endSession();
    console.log(error);
    // throw error;
    return res.status(500).json({ message: messages.serverError });
    //emit error event
  }
};

module.exports = { darajaWebhook };
