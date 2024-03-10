const mongoose = require("mongoose");
const { memberships, contributions, tableBanking } = require("@models");

const dummy = async () => {
  try {
    console.log("Creating dummy data...");
    const tableBankingData = await tableBanking.create({
      name: "Table Banking Elite",
      type: "tableBanking",
      createdAt: new Date(),
      tableBankingLoanAmount: 50000,
      tableBankingLoanInterestRate: 5,
    });

    const membershipData = await memberships.create({
      userId: new mongoose.Types.ObjectId("6559f6f606ecdadd19bb305b"),
      chamaId: tableBankingData._id,
      role: "admin",
      joinDate: new Date(),
    });

    // Create a dummy contribution
    const contributionData = await contributions.create({
      userId: new mongoose.Types.ObjectId("6559f6f606ecdadd19bb305b"),
      chamaId: tableBankingData._id,
      chama: tableBankingData.name,
      amount: 1000,
      contributionDate: new Date(),
    });

    // Create a dummy tableBanking chama
  } catch (error) {
    console.log(error);
  }
};

module.exports = { dummy };
