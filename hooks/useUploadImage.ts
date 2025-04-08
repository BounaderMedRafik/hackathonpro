import { useState } from "react";
import supabase from "@/app/supabase/supaClient";
import { toast } from "sonner";

const useUploadThumbnail = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadThumbnail = async (file: File, userId: string) => {
    if (!file || !userId) return;

    setIsLoading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `images/${userId}-${Date.now()}.${fileExt}`;

    // Upload file to "images" bucket
    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (error) {
      console.error("Error uploading thumbnail:", error);
      toast.error("Failed to upload thumbnail. Try again.");
      setIsLoading(false);
      return;
    }

    // Get public URL from "images" bucket
    const { data } = supabase.storage.from("images").getPublicUrl(fileName);

    if (!data.publicUrl) {
      toast.error("Failed to retrieve thumbnail URL.");
      setIsLoading(false);
      return;
    }

    setThumbnailUrl(data.publicUrl);
    toast.success("Thumbnail uploaded successfully!");
    setIsLoading(false);
  };

  const clearThumbnail = () => {
    setThumbnailUrl(null);
  };

  return { thumbnailUrl, isLoading, uploadThumbnail, clearThumbnail };
};

export default useUploadThumbnail;
