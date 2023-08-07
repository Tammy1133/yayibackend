const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
// Parse incoming requests with JSON payloads
app.use(bodyParser.json({ limit: "10mb" })); // Set the limit to your desired size

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" })); // Set the limit to your desired size

// ... Your other middleware and routes ...

const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "60mb", extended: true }));
app.use(
  express.urlencoded({ limit: "60mb", extended: true, parameterLimit: 50000 })
);
const empowermentRoute = require("./routes/empowermentRoute");

app.listen(process.env.PORT || 3006, () => {
  console.log("App started");
});
app.use("/api", empowermentRoute);
app.use("/api", userRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB started");
  })
  .catch((e) => {
    console.log(e);
  });
