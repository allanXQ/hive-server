const router = require("express").Router();
const { verifyjwt, formValidate } = require("@middleware");
const {
  userInfo,
  mpesaWithdraw,
  generateSTKPush,
  darajaWebhook,
  mpesaDepositHistory,
  withdrawalHistory,
} = require("@controllers/user");
const {
  depositSchema,
  withdrawalSchema,
  userInfoSchema,
} = require("@yupschemas");

const { errorHOC } = require("@utils");

//wallet routes
router.post(
  "/transact/mpesa/deposit",
  verifyjwt,
  formValidate(depositSchema),
  errorHOC(generateSTKPush)
);
router.post("/daraja/webhook", errorHOC(darajaWebhook));
router.post(
  "/transact/withdraw",
  verifyjwt,
  formValidate(withdrawalSchema),
  errorHOC(mpesaWithdraw)
);

router.post(
  "/history/deposits",
  verifyjwt,
  formValidate(userInfoSchema),
  errorHOC(mpesaDepositHistory)
);
router.post(
  "/history/withdrawals",
  verifyjwt,
  formValidate(userInfoSchema),
  errorHOC(withdrawalHistory)
);

router.post(
  "/user-info",
  verifyjwt,
  formValidate(userInfoSchema),
  errorHOC(userInfo)
);

router.post("/user-update", verifyjwt, errorHOC(userInfo));

module.exports = router;
