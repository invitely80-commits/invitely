import { Readable } from "stream";

import { v2 as cloudinary } from "cloudinary";

const isConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

async function uploadSingleFile(file: File, folder: string) {
  if (!isConfigured) {
    throw new Error("Cloudinary is not configured yet.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        tags: ["invitely"],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Image upload failed."));
          return;
        }

        resolve(result.secure_url);
      },
    );

    Readable.from(bytes).pipe(stream);
  });
}

export async function uploadInviteImages(files: File[], folder: string) {
  const validFiles = files.filter((file) => file.size > 0);

  return Promise.all(validFiles.map((file) => uploadSingleFile(file, folder)));
}

export function cloudinaryReady() {
  return isConfigured;
}

