import express from "express";
import bodyParser from "body-parser";
import TEXT_DEFINE from "./constant/textDefine";
import MongoProvider from "./config/mongo";
import dotenv from "dotenv";
import indexRoute from "./Route";
import cors from "cors";
import ENDPOINT from "./constant/urls";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.raw({ limit: "50mb", parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb", parameterLimit: 50000 }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb", parameterLimit: 50000 }));

MongoProvider.getInstance().connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
    res.send(`<h1>${TEXT_DEFINE.SERVER.start}</h1>`)
});

indexRoute(app);
app.use(ENDPOINT.upload, express.static("./Upload"));

export default app;