require("dotenv").config();
const uuid = require("uuid");
const { users } = require("@models");
const { generateTokens, setCookies } = require("@utils");
const { messages } = require("@utils");

const id = uuid.v4();

const googleOAuth = async (req, res) => {
  try {
    // const code = req.query.code;
    const { firstName, lastName, email, photoURL, phoneNumber } = req.body;
    console.log(req.body);
    const findUser = await users.findOne({ email });
    if (!findUser) {
      const createUser = await users.create({
        userId: id,
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
      const { userId, phone, status, username } = createUser;
      return res.status(200).json({
        message: messages.loginSuccess,
        payload: {
          userId,
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
        userId: findUser.userId,
        username: findUser.username,
        email: findUser.email,
        firstName: firstName,
        lastName: lastName,
        photoURL: findUser.photoURL,
        phone: findUser.phone,
        status: findUser.status,
      },
    });
  } catch (error) {
    console.log(error);
    const message = messages.loginFailed;
    return res.redirect(
      301,
      `${process.env.CLIENT_URL}/login?message=${encodeURIComponent(message)}`
    );
  }
};

module.exports = { googleOAuth };
