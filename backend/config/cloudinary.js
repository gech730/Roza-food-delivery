import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload a file buffer directly to Cloudinary
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * @param {Object} options - Upload options (folder, etc.)
 * @returns {Promise<Object>} Resolves with Cloudinary upload result
 */
export const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || "roza_food",
        resource_type: "image",
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

/**
 * Extract public_id and delete image from Cloudinary
 * @param {string} urlOrPublicId - Cloudinary secure_url or public_id
 * @returns {Promise<Object|null>}
 */
export const deleteFromCloudinary = async (urlOrPublicId) => {
  if (!urlOrPublicId || typeof urlOrPublicId !== "string") return null;

  try {
    let publicId = urlOrPublicId;

    if (urlOrPublicId.startsWith("http://") || urlOrPublicId.startsWith("https://")) {
      if (!urlOrPublicId.includes("cloudinary.com")) {
        return null;
      }
      const parts = urlOrPublicId.split("/upload/");
      if (parts.length > 1) {
        let afterUpload = parts[1];
        // Strip version prefix if present (e.g. v1712345678/)
        afterUpload = afterUpload.replace(/^v\d+\//, "");
        // Strip file extension
        publicId = afterUpload.replace(/\.[^/.]+$/, "");
      }
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.warn("Failed to delete from Cloudinary:", error.message);
    return null;
  }
};

export default cloudinary;

