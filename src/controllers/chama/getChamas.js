const Services = require("@services");
const { chamas } = require("@models");

const getChamas = async (req, res) => {
  const { memberships } = req.body;
  const findChamas = await Services.find(chamas, {
    name: {
      $in: memberships,
    },
  });
  return res
    .status(200)
    .json({ message: messages.requestSuccessful, payload: findChamas });
};

module.exports = getChamas;
