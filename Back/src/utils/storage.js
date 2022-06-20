import multer from "multer";

const storage = multer.diskStorage({destination: (req, file, cb) => {
      cb(null, "./public/subidas");
  },
  filename: (req, file, cb) => {
    let name = file.originalname;
    name = name.replace(/ /g, '-');
    const extension = name.substring(name.lastIndexOf('.')+1);
    name = name.substring(0, name.lastIndexOf('.'));
    cb(null, `${name}-${Date.now()}.${extension}`);
  },
});

export default storage;