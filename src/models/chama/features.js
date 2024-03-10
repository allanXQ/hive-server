const mongoose = require("mongoose");

const chamaFeaturesSchema = new mongoose.Schema({
  chamaType: String, // e.g., 'ROSCA', 'ASCA', 'Table Banking', etc.

  // Common fields
  contributionAmount: Number, // Regular contribution amount, if applicable
  contributionFrequency: String, // e.g., 'Weekly', 'Monthly'
  memberLimit: Number, // Maximum number of members allowed

  // ROSCA-specific fields

  // ASCA-specific fields
  ascaLoanInterestRate: Number, // Interest rate for loans in ASCAs
  profitDistributionMethod: String, // Method of distributing profits (e.g., 'Equally', 'Based on Contribution')

  // Table Banking-specific fields
  tableBankingLoanInterestRate: Number, // Interest rate for table banking loans

  // Investment Group-specific fields
  investmentAreas: [String], // Areas of investment (e.g., 'Real Estate', 'Stocks')
  minimumInvestmentAmount: Number, // Minimum amount required for investment

  // Social Welfare Group-specific fields
  welfareActivities: [String], // Types of welfare activities (e.g., 'Community Support', 'Emergency Fund')
  // Additional fields can be added as needed for each chama type
});

module.exports = mongoose.model("chamaFeatures", chamaFeaturesSchema);
