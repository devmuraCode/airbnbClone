"use client";

import { UploadButton } from "@/src/utils/uploadthing";
import { FC } from "react";

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
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}

export default imageUploader;