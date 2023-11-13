const { default: axios } = require("axios");
const { walletConfig } = require("@config");
const { messages } = require("@utils");
const { users } = require("@models");
const Services = require("@services");

const mpesaDeposit = async (req, res) => {
  const { userId, phone, amount } = req.body;
  const user = await users.findOne({ phone });
  if (!user) {
    const userUpdate = await Services.updateOne(users, { userId }, { phone });
    if (!userUpdate) {
      return res.status(500).json({ message: messages.serverError });
    }
  }

  const { minDeposit, maxDeposit } = walletConfig;
  if (parseInt(amount) < minDeposit) {
    return res.status(400).json({
      message: messages.minDeposit + " " + minDeposit,
    });
  }

  if (parseInt(amount) > maxDeposit) {
    return res.status(400).json({
      message: messages.maxDeposit + " " + maxDeposit,
    });
  }
  const url = " https://tinypesa.com/api/v1/express/initialize";
  await axios({
    method: "post",
    url: url,
    data: {
      amount: amount,
      msisdn: phone,
      account_no: "hive",
    },
    headers: {
      Apikey: process.env.TINYPESA_KEY,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status == 200) {
        res.status(200).json({
          message: messages.stkPushSent,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: messages.serverError });
    });
};

module.exports = { mpesaDeposit };
