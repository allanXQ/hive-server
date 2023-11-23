const Services = require("@services");
const { Chama } = require("@models");

const createChama = async (req, res) => {
  const { name, type, userId, description } = req.body;
  const chama = await Services.create(Chama, {
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
