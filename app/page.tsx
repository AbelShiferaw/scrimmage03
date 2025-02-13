"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // States for manual input and file upload
  const [manualInput1, setManualInput1] = useState("");
  const [manualInput2, setManualInput2] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setExcelFile(e.target.files[0]);
    }
  };

  // When the file form is submitted, navigate to '/result'
  const handleFileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/result");
  };

  // When the manual data form is submitted, navigate to '/insert-data'
  const handleManualSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here we navigate to a new page where you plan to add database logic later.
    router.push("/insert-data");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Optional background canvas */}
      <canvas
        id="bgCanvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></canvas>

      {/* Welcome Text Positioned Above the Card */}
      <h1
        style={{
          color: "white",
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "20px",
          zIndex: 2,
        }}
      >
        Welcome!
      </h1>

      {/* The Card with Forms */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 30px rgba(255, 255, 255, 0.1)",
          textAlign: "center",
          width: "380px",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "20px",
          }}
        >
          Upload an Excel file or enter data manually
        </p>

        {/* Excel File Upload Form */}
        <form onSubmit={handleFileSubmit} style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Upload Excel File
          </label>
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              outline: "none",
              transition: "0.3s",
              marginBottom: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#00c6ff",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
              marginBottom: "20px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#0072ff")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "#00c6ff")
            }
          >
            Submit File
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "20px",
          }}
        >
          or
        </div>

        {/* Manual Data Entry Form */}
        <form onSubmit={handleManualSubmit}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            First Data
          </label>
          <input
            type="text"
            placeholder="Enter first data"
            value={manualInput1}
            onChange={(e) => setManualInput1(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              outline: "none",
              transition: "0.3s",
              marginBottom: "10px",
            }}
          />
          <label
            style={{
              display: "block",
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Second Data
          </label>
          <input
            type="text"
            placeholder="Enter second data"
            value={manualInput2}
            onChange={(e) => setManualInput2(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              outline: "none",
              transition: "0.3s",
              marginBottom: "20px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#00c6ff",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#0072ff")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "#00c6ff")
            }
          >
            Submit Data
          </button>
        </form>
      </div>
    </div>
  );
}
