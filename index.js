import express from "express"
import morgan from 'morgan'
import cors from "cors"
import multer from "multer";
import FileDocs from "./model/File.js";
import "dotenv/config"
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded());
const {PORT, MONGODB_URI} = process.env

mongoose.connect(MONGODB_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err))

// for locally
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: (req,file,cb) => {
//     const oldName = file.originalname.split(".")
//     const fileExt = oldName.pop();
//     const filename = `${oldName.slice(0,oldName.length-1)}${Math.random()}.${fileExt}`
//     cb(null, filename);
//   }
// }) 

const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});
app.post("/profile-upload", upload.single("file"), async(req,res) => {
  console.log(req.file)
  const file = req.file;
  const newFile = new FileDocs({
    fileName: file.originalname,
    buffer: file.buffer
  }) 

  await newFile.save();

  res.status(200).send({
    msg:"File Uploaded Successfully"
  })
})


app.get("/", (req,res) => {
    console.log("request url", req.url)
  res.send("Hello World")
})



app.listen(PORT, () => console.log(`App is running on port ${PORT}`))