// controllers/lipanampesa.js
require("dotenv").config();
const axios = require("axios");
const { generateAccessToken, getTimeStamp, messages } = require("@utils");

const generateSTKPush = async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const timestamp = getTimeStamp();
    const url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = `Bearer ${accessToken}`;
    const password = Buffer.from(
      `${process.env.BUSINESS_SHORT_CODE}${process.env.PASSKEY}${timestamp}`
    ).toString("base64");

    const callbackUrl =
      process.env.APP_ENV === "development"
        ? `https://b994-197-232-84-170.ngrok-free.app/api/v1/user/daraja/webhook`
        : `${process.env.SERVER_URL}/api/v1/user/daraja/webhook`;

    const stkpush = await axios.post(
      url,
      {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerBuyGoodsOnline",
        Amount: req.body.amount,
        PartyA: req.body.phone,
        PartyB: process.env.PARTYB,
        PhoneNumber: req.body.phone,
        CallBackURL: callbackUrl,
        AccountReference: "Test",
        TransactionDesc: "Test",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    );

    res
      .status(200)
      .json({ message: messages.requestSuccessful, payload: stkpush.data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = {
  generateSTKPush,
};
