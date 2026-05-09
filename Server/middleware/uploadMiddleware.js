import multer from "multer";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

const storage = multer.memoryStorage();

const fileFilter = (_req, file, callback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
    return;
  }

  const error = new Error("Only JPG, PNG, and WEBP crop images are allowed.");
  error.statusCode = 400;
  callback(error);
};

const uploadCropImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 6 * 1024 * 1024,
    files: 1,
  },
});

export default uploadCropImage;
