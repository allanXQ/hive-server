const Router = require("express").Router();

const { createChama, getChamas } = require("@controllers/chama");
const { verifyjwt, formValidate } = require("@middleware");
const { createChamaSchema, getChamaSchema } = require("@yupschemas");

Router.post("/create", verifyjwt, formValidate(createChamaSchema), createChama);
Router.post("/get-chamas", verifyjwt, formValidate(getChamaSchema), getChamas);

module.exports = Router;
