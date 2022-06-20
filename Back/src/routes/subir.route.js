import express  from 'express';
const routerSubir = express.Router();
import upload from "../utils/uploadFile.js";

routerSubir.post("/", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("File not found");
    return next(error);
  }
  console.log(file)
  res.status(200).json({file});
});

routerSubir.get("/:file", (req, res) => {
  const file = req.params.file;
  console.log(file)
  res.status(200).sendFile(file, { root: "./public/subidas" });
});


export default routerSubir;