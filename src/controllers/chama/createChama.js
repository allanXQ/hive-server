const Services = require("@services");
const { chama } = require("@models");

const createChama = async (req, res) => {
  const { name, type, userId, description } = req.body;
  const chama = await Services.create(chama, {
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
