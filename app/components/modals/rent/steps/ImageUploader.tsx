"use client";
import { FC, useState } from "react";
import { UploadButton } from "@/src/utils/uploadthing";
import { toast } from "react-hot-toast";
interface TProps {
  onChange: (value: string) => void;
  value: string;
}
const imageUploader: FC<TProps> = (props) => {
  const { onChange, value } = props;

  return (
    <UploadButton
      endpoint="imageUploader"
      className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
      onClientUploadComplete={(res: { url: string }[]) => {
        console.log("Files: ", res);
        onChange(res[0].url);
        toast.success("Upload Completed");
      }}
      
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default imageUploader;
