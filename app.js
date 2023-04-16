import express from "express";
import bodyParser from "body-parser";
import TEXT_DEFINE from "./constant/textDefine";
import MongoProvider from "./config/mongo";
import dotenv from "dotenv";
import indexRoute from "./Route";
import cors from "cors";
import ENDPOINT from "./constant/urls";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const whitelist = [
  "http://localhost:3000",
  "https://azp-website.vercel.app",
  "https://azp-dashboard-dev.vercel.app",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.raw({ limit: "50mb", parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb", parameterLimit: 50000 }));
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000,
  })
);

MongoProvider.getInstance().connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send(`<h1>${TEXT_DEFINE.SERVER.start}</h1>`);
});

indexRoute(app);
app.use(ENDPOINT.upload, express.static("./Upload"));

export default app;
