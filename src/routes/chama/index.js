const Router = require("express").Router();

const { createChama } = require("@controllers/chama");
const { verifyjwt, formValidate } = require("@middleware");
const { createChamaSchema } = require("@yupschemas");

Router.post("/create", verifyjwt, formValidate(createChamaSchema), createChama);

module.exports = Router;
