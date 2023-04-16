import express from "express";
import ENDPOINT from "../constant/urls";
import UploadController from "../Controller/upload.controller";
import upload from "../config/uploadFile";

const route = express.Router();

route.post(ENDPOINT.start, upload.single("file"), UploadController.UploadFileController);

export default route;