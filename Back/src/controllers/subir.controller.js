
export const subir = async (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("File not found");
      return next(error);
    }
    console.log(file)
    res.status(200).json({file});
};


export const getFile = async (req, res) => {
    const file = req.params.file;
    console.log(file)
    res.status(200).sendFile(file, { root: "./public/subidas" });
};