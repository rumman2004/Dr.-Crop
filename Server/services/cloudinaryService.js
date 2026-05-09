import { Readable } from "node:stream";

import cloudinary, { configureCloudinary } from "../config/cloudinary.js";

export const uploadImageBuffer = async (file) => {
  if (!configureCloudinary()) {
    throw new Error("Cloudinary is not configured.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER || "dr-crop/scans",
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
};
