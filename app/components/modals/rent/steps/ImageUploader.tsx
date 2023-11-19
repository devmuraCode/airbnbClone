"use client";

import { UploadButton } from "@/src/utils/uploadthing";
import { FC } from "react";
import { toast } from "react-hot-toast";

interface TProps {
  onChange: (value: string) => void;
  value: string;
}
const imageUploader:FC<TProps> = (props) => {
  const { onChange, value } = props;
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          onChange(res[0].url);
          toast.success("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}

export default imageUploader;