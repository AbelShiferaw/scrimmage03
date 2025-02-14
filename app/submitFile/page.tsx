"use client";

import { useState, useEffect, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import ResultHeader from "../ui/submitFile/ResultHeader";
import FileUploader from "../ui/submitFile/FileUploader";
import ProcessedDataList, {ProcessedRow} from "../ui/submitFile/ProcessedDataList";

export default function Result() {
  const [file, setFile] = useState<File | null>(null);
  const [processedRows, setProcessedRows] = useState<ProcessedRow[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target;
      if (!target) return;
      const data = target.result;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      const rows = jsonData.map((row: any[],index) => {
        console.log(`Row ${index}:`, row);
        const group = parseInt(row[0],10);
        const name = row[1];
        const traits = row.slice(2, 7); 
        return { group, name, traits };
      });

      setProcessedRows(rows);

      fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rows }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Database updated:", data);
        })
        .catch((error) => {
          console.error("Error updating database:", error);
        });
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    if (file) {
      processFile(file);
    }
  }, [file]);

  return (
    <div className="p-8">
      <ResultHeader />
      <FileUploader onFileChange={handleFileChange} />
      <ProcessedDataList processedRows={processedRows} />
    </div>
  );
}
