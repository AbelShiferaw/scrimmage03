"use client";
import { ChangeEvent, FormEvent } from "react";

interface FileUploadFormProps {
  excelFile: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const FileUploadForm = ({
  excelFile,
  onFileChange,
  onSubmit,
}: FileUploadFormProps) => {
  return (
    <form onSubmit={onSubmit} className="mb-5">
      <label className="block text-left text-sm font-bold mb-1">
        Upload Excel File
      </label>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={onFileChange}
        className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition mb-2"
      />
      {excelFile && (
        <p className="text-white mb-2">
          Selected file: {excelFile.name}
        </p>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-lg font-bold cursor-pointer transition mb-5"
      >
        Submit File
      </button>
    </form>
  );
};

export default FileUploadForm;
