import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  base64Image: string,
  folder: string = "brandforge/logos"
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(base64Image, {
    folder,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getOptimizedUrl(
  publicId: string,
  options: { width?: number; height?: number; quality?: string } = {}
): string {
  return cloudinary.url(publicId, {
    width: options.width || 800,
    height: options.height,
    quality: options.quality || "auto",
    fetch_format: "auto",
    crop: "limit",
  });
}
