const { default: mongoose } = require("mongoose");
const { walletConfig } = require("@config");
const { messages } = require("@utils/messages");
const { users } = require("@models");
const { withdrawals } = require("@models");

//include withdrrawal fees
const mpesaWithdraw = async (req, res) => {
  let session;
  try {
    const { phone, amount } = req.body;
    const { withdrawalFeePercentage } = walletConfig;

    let intAmount = parseInt(amount);

    // Validate amount before proceeding

    const taxAmount = intAmount * withdrawalFeePercentage;
    const totalAmount = intAmount + taxAmount;

    session = await mongoose.startSession();
    session.startTransaction();

    const updatedUser = await users.findOneAndUpdate(
      { phone },
      { $inc: { accountBalance: -totalAmount } },
      { session, new: true, returnOriginal: false }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: messages.userNotFound });
    }

    const remainingBalance = parseInt(updatedUser.accountBalance) || 0;

    // Validate the remaining balance
    if (remainingBalance < 0) {
      return res.status(400).json({ message: messages.insufficientBalance });
    }

    await withdrawals.create(
      [
        {
          userId: updatedUser._id,
          username: updatedUser.username,
          phone,
          amount: intAmount,
          mode: "mpesa",
        },
      ],
      { session }
    );

    await withdrawals
      .find({
        userId: updatedUser._id,
      })
      .session(session);

    // const user = {
    //   ...updatedUser.toObject(),
    //   withdrawals,
    // };
    await session.commitTransaction();
    return res.status(200).json({
      message: messages.withdrawalSuccess,
      // payload: {
      //   user,
      // },
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};

module.exports = { mpesaWithdraw };
