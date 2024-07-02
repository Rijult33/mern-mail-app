import express from "express";
import dotenv from "dotenv";
import connectDB from "./dB/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import emailRoute from "./routes/email.route.js";
import bodyParser from 'body-parser';

const app = express();
const PORT = 8090;
dotenv.config();
connectDB();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:8090', 'http://localhost:5173' , 'http://localhost:3000','http://192.168.193.160:8082'], // Add your frontend URL here
    credentials: true, // If you need to send cookies or HTTP authentication
  };

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

app.get('/home', (req, res) => {
  res.json({ msg: "this is the get request" });
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
