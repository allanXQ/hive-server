const yup = require("yup");
const { messages } = require("@utils");
const { walletConfig } = require("@config");

const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
const phoneRegexp = /^(2547|2541)\d{8}$/;

const regSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(/^(2547|2541)\d{8}$/, messages.invalidPhoneNumber)
    .required(),
  referrer: yup.string(),
  password: yup
    .string()
    .matches(passwordRegexp, messages.passwordRegex)
    .required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const googleOAuthSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  photoURL: yup.string().nullable(),
  phoneNumber: yup.string().nullable(),
});

const userInfoSchema = yup.object().shape({
  userId: yup.string().required(),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRegexp, messages.passwordRegex)
    .required(),
});

const updatePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .matches(passwordRegexp, `Old ${messages.passwordRegex}`)
    .required(),
  newPassword: yup
    .string()
    .matches(passwordRegexp, `New ${messages.passwordRegex}`)
    .required(),
});

const depositSchema = yup.object().shape({
  userId: yup.string().required(),
  amount: yup
    .number()
    .lessThan(walletConfig.maxDeposit)
    .moreThan(walletConfig.minDeposit)
    .required(),
  phone: yup
    .string()
    .matches(phoneRegexp, messages.invalidPhoneNumber)
    .required(),
});

const withdrawalSchema = yup.object().shape({
  amount: yup
    .number()
    .lessThan(walletConfig.maxWithdrawal)
    .moreThan(walletConfig.minWithdrawal)
    .required(),
  phone: yup
    .string()
    .matches(phoneRegexp, messages.invalidPhoneNumber)
    .required(),
});

const createChamaSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  userId: yup.string().required(),
  description: yup.string().required(),
});

const getChamaSchema = yup.object().shape({
  userId: yup.string().required(),
  memberships: yup.array().required(),
});

module.exports = {
  regSchema,
  loginSchema,
  userInfoSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  depositSchema,
  withdrawalSchema,
  createChamaSchema,
  getChamaSchema,
  googleOAuthSchema,
};
