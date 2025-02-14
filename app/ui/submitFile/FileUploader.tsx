"use client";
import { ChangeEvent } from "react";

interface FileUploaderProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange }) => {
  return (
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={onFileChange}
      className="mb-4 p-2 border border-gray-300 rounded"
    />
  );
};

export default FileUploader;
