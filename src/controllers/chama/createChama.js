const Services = require("@services");
const { chamas } = require("@models");

const createChama = async (req, res) => {
  const { name, type, userId, description } = req.body;
  const chama = await Services.create(chamas, {
    name,
    type,
    admin: userId,
    description,
  });
  return res.status(201).json({
    message: "Chama created successfully",
    data: chama,
  });
};

module.exports = createChama;
