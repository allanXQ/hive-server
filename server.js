require("module-alias/register");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("@middleware");
const { DBConn, allowedOrigins } = require("@config");
const axios = require("axios");

// if (process.env.APP_ENV === "production") {
//   require("dotenv").config({ path: ".env.prod" });
// } else {
//   require("dotenv").config({ path: ".env.dev" });
// }

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth/", require("@routes/auth"));
app.use("/api/v1/user/", require("@routes/user"));

app.use(errorHandler);

const pingInterval = 840000; // 14 minutes in milliseconds

function pingSelf() {
  axios
    .get("https://hive-server.onrender.com/api/v1/user/user-info")
    .then((response) => {
      console.log("Service pinged successfully:", response.status);
    })
    .catch((error) => {
      console.error("Error pinging service:", error);
    });
}

// Set up the interval to ping your service every 14 minutes
setInterval(pingSelf, pingInterval);

DBConn(app, port);
