import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import Booksroute from "./Routes/Booksroute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());
//Middleware forhandling Cors policy
//Option 1:Allow all Origins with default of CORS(*)
app.use(cors());
//Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome the Mern Site");
});

app.use("/books", Booksroute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listening to PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
