import { createClient } from "@/lib/supabase/server";
import { uploadToCloudinary } from "@/services/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { image, generationId } = await request.json();

    if (!image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

    // Upload to Cloudinary
    const { url, publicId } = await uploadToCloudinary(
      image,
      `brandforge/logos/${user.id}`
    );

    // Update generation record with image URL
    if (generationId) {
      await supabase
        .from("logo_generations")
        .update({
          image_url: url,
          cloudinary_public_id: publicId,
        })
        .eq("id", generationId)
        .eq("user_id", user.id);
    }

    return NextResponse.json({ url, publicId });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
