"use client";

import { useState, DragEvent } from 'react';
import ResultDisplay from '../components/ResultDisplay';

// Define the structure of our API response
interface Detection {
  box: [number, number, number, number];
  label: string;
  score: number;
}
interface Result {
  filename: string;
  detections: Detection[];
  counts: { [key: string]: number };
}

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
      setResults([]); // Reset results
      setError(null);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleClear = () => {
    setFiles([]);
    setResults([]);
    setError(null);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      setError("Please select one or more images to upload.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/predict/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Server error: ${response.statusText}`);
      }
      const data: Result[] = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-12 md:p-24 bg-gray-900 text-gray-200">
      <div className="w-full max-w-5xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-wider">
          GrainVision AI
        </h1>
        <p className="text-gray-400 mt-2">Powered by YOLOv8</p>
      </div>
      
      {results.length === 0 && (
        <>
          <div 
            className={`w-full max-w-3xl p-8 bg-gray-800 border-2 border-dashed rounded-xl shadow-lg transition-all ${isDragging ? 'border-emerald-400 bg-gray-700' : 'border-gray-600'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
              <label htmlFor="file-upload" className="relative cursor-pointer font-semibold text-emerald-400 hover:text-emerald-500">
                <span>Select Images</span>
                <input id="file-upload" type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e.target.files)} className="sr-only" />
              </label>
              <p className="pl-1 text-gray-500">or drag and drop</p>
              <p className="text-xs text-gray-500 mt-2">Upload one or more images for batch processing</p>
            </div>
          </div>

          {files.length > 0 && !isLoading && (
              <div className="w-full max-w-3xl mt-8 p-6 bg-gray-800 border border-gray-700 rounded-xl">
                <p className="text-sm font-medium text-gray-300">Selected Files:</p>
                <ul className="mt-2 text-sm list-decimal list-inside text-gray-400 space-y-1">
                  {files.map(file => <li key={file.name} className="truncate">{file.name}</li>)}
                </ul>
                <div className="mt-6 text-center">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-10 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors text-lg"
                    >
                        {`Detect in ${files.length} Image(s)`}
                    </button>
                </div>
              </div>
            )}
        </>
      )}

      {error && (
        <div className="mt-8 w-full max-w-3xl text-center p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {isLoading && (
        <div className="mt-8 flex flex-col items-center justify-center">
           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-400"></div>
           <p className="mt-4 text-gray-300">Analyzing images, please wait...</p>
        </div>
      )}

      {results.length > 0 && !isLoading && (
        <div className="w-full max-w-5xl mt-4">
            <div className="text-center mb-8">
                <button onClick={handleClear} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                    Start New Analysis
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {results.map((result, index) => (
                    <ResultDisplay key={index} result={result} file={files.find(f => f.name === result.filename)!} />
                ))}
            </div>
        </div>
      )}
    </main>
  );
}