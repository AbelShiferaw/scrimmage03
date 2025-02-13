// app/page.tsx
"use client"; // ✅ This is needed for client-side components

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation' // ✅ Fix: Use 'next/navigation' instead of 'next/router'

export default function Home() {
  const router = useRouter()

  const [manualInput1, setManualInput1] = useState<string>('')
  const [manualInput2, setManualInput2] = useState<string>('')
  const [excelFile, setExcelFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setExcelFile(e.target.files[0])
    }
  }

  const handleFileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/result') // ✅ Navigates to another page
  }

  const handleManualSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/result') // ✅ Navigates to another page
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Upload or Enter Data
        </h1>

        {/* Excel File Upload Form */}
        <form onSubmit={handleFileSubmit} className="mb-8">
          <label className="block text-gray-700 mb-2">Upload Excel File</label>
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Submit File
          </button>
        </form>

        <div className="text-center text-gray-500 font-semibold mb-4">or</div>

        {/* Manual Data Entry Form */}
        <form onSubmit={handleManualSubmit}>
          <label className="block text-gray-700 mb-2">
            Enter Data Manually
          </label>
          <input
            type="text"
            placeholder="First Data"
            value={manualInput1}
            onChange={(e) => setManualInput1(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Second Data"
            value={manualInput2}
            onChange={(e) => setManualInput2(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Submit Data
          </button>
        </form>
      </div>
    </div>
  )
}
