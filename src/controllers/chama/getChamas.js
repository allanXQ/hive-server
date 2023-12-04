const Services = require("@services");
const { chama } = require("@models");

const getChamas = async (req, res) => {
  const { memberships } = req.body;
  const chamas = await Services.find(chama, {
    name: {
      $in: memberships,
    },
  });
  return res
    .status(200)
    .json({ message: messages.requestSuccessful, payload: chamas });
};

module.exports = getChamas;
