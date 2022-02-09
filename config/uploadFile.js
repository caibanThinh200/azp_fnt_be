import { existsSync, rm } from "fs";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "Upload"))
  },
  filename: function (req, file, cb) {
    const filePath = path.join(__dirname, "..", `Upload/${file.originalname}`);
    let uniqueSuffix = "";
    uniqueSuffix = (file.originalname.includes("jfif") ? file.originalname.replace("jfif", "png") : file.originalname);
    cb(null, uniqueSuffix)
  }
});

const upload = multer({ storage: storage });
export default upload;
