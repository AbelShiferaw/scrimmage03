"use client";

import { useState, useEffect, ChangeEvent } from "react";
import * as XLSX from "xlsx";

interface ProcessedRow {
  group: string | number;
  name: string;
  traits: string[];
}

export default function Result() {
  // State to hold the selected file
  const [file, setFile] = useState<File | null>(null);
  // State to hold the processed data from the Excel file
  const [processedRows, setProcessedRows] = useState<ProcessedRow[]>([]);

  // Event handler for file input changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // Save the first file in state
    }
  };

  // Function to process the Excel file
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target;
      if (!target) return;
      const data = target.result;
      // Read the workbook using XLSX library
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet into JSON: an array of arrays (each inner array is a row)
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      // Map each row into an object with group, name, and traits
      const rows = jsonData.map((row: any[]) => {
        const group = row[0];
        const name = row[1];
        const traits = row.slice(2, 7); // get the next 5 cells as traits
        return { group, name, traits };
      });

      // Save the processed rows in state (for preview, etc.)
      setProcessedRows(rows);

      // Send the processed data to the server to update the database
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

    // Read the file as a binary string
    reader.readAsBinaryString(file);
  };

  // useEffect watches for changes in 'file'; when a file is set, process it
  useEffect(() => {
    if (file) {
      processFile(file);
    }
  }, [file]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Processed Excel Data</h1>
      {/* File input element */}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4"
      />
      <div>
        {processedRows.length > 0 ? (
          <ul>
            {processedRows.map((row, index) => (
              <li key={index} className="mb-2">
                <strong>Group:</strong> {row.group} |{" "}
                <strong>Name:</strong> {row.name} |{" "}
                <strong>Traits:</strong> {row.traits.join(", ")}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data processed yet.</p>
        )}
      </div>
    </div>
  );
}
