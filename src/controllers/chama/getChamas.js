const Services = require("@services");
const { Chama } = require("@models");

const getChamas = async (req, res) => {
  const { userId, memberships } = req.body;
  const chamas = await Services.find(Chama, {
    name: {
      $in: memberships,
    },
  });
  return res
    .status(200)
    .json({ message: messages.requestSuccessful, payload: chamas });
};

module.exports = getChamas;
