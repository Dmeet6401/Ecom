import express, { Request, Response } from 'express'
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express()


const corsOptions = { origin:[ "http://localhost:3000" , "http://localhost:5000"] , credentials: true };

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const orderRoutes = require("./routes/orderRoutes");

app.use("/api", orderRoutes);

// app.get("/", (req, res) => {
//   res.json({ message: "Server is running successfully" });
// });

app.get("/", (req, res) => {
  console.log("cookieParser", req.cookies);
  res.json({ message: "Server is running successfully" });
});

app.post("/", (req, res) => {
  console.log("cookieParser", req.cookies);
  res.json({ message: "Server is running successfully" });
});
 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});