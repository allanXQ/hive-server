require("dotenv").config();

const { users } = require("@models");
const { generateTokens, setCookies } = require("@utils");
const { messages } = require("@utils");

const googleOAuth = async (req, res) => {
  const { firstName, lastName, email, photoURL, phoneNumber } = req.body;
  const findUser = await users.findOne({ email });
  if (!findUser) {
    const createUser = await users.create({
      email,
      username: email.slice(0, email.indexOf("@")),
      firstname: firstName,
      lastname: lastName,
      photoURL,
      status: "Verified",
      authMethod: "google",
    });
    if (!createUser) {
      return res.status(400).json({ message: messages.loginFailed });
    }
    const tokens = generateTokens(createUser);
    setCookies(res, tokens);
    const { _id, phone, status, username } = createUser;
    return res.status(200).json({
      message: messages.loginSuccess,
      payload: {
        userId: _id,
        email,
        firstName,
        lastName,
        photoURL,
        phone,
        status,
        username,
      },
    });
  }
  const tokens = generateTokens(findUser);
  setCookies(res, tokens);
  return res.status(200).json({
    message: messages.loginSuccess,
    payload: {
      userId: findUser._id,
      username: findUser.username,
      email: findUser.email,
      firstName: firstName,
      lastName: lastName,
      photoURL: findUser.photoURL,
      phone: findUser.phone,
      status: findUser.status,
    },
  });
};

module.exports = { googleOAuth };
