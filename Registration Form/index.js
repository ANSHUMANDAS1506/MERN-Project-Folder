const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.fk8yz5m.mongodb.net/?retryWrites=true&w=majority`
);
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobilenumber: String,
});
const Registration = mongoose.model("Registrarion", registrationSchema);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Registration.findOne({ email: email });

    if (!existingUser) {
      const registrationData = new Registration({
        name,
        email,
        password,
        mobilenumber,
      });
      await registrationData.save();
      res.redirect("/success");
    } else {
      console.log("User already exists");
      res.redirect("/error");
    }
  } catch (error) {
    console.error(error);
    res.redirect("error");
  }
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});
app.get("/error", (req, res) => {
  res.sendFile(__dirname + "/error.html");
});
app.listen(port, () => {
  console.log(`server is runnning onn port ${port}`);
});
