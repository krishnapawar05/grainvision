// "use client";

// import { useEffect, useRef } from 'react';

// // Define the types to match the main page
// interface Detection {
//   box: [number, number, number, number];
//   label: string;
//   score: number;
// }

// interface Result {
//   filename: string;
//   detections: Detection[];
//   counts: { [key: string]: number };
// }

// interface ResultDisplayProps {
//   result: Result;
//   file: File;
// }

// // Helper function to get a color based on the label
// const getColor = (label: string) => {
//     // Simple hash function for consistent coloring
//     let hash = 0;
//     for (let i = 0; i < label.length; i++) {
//         hash = label.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
//     return "#" + "00000".substring(0, 6 - color.length) + color;
// }

// export default function ResultDisplay({ result, file }: ResultDisplayProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!file || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;
    
//     const img = new Image();
//     img.src = URL.createObjectURL(file);

//     img.onload = () => {
//       // Set canvas dimensions to image dimensions
//       canvas.width = img.width;
//       canvas.height = img.height;
      
//       // Draw the image on the canvas
//       ctx.drawImage(img, 0, 0);

//       // Draw detections
//       result.detections.forEach(det => {
//         const [x1, y1, x2, y2] = det.box;
//         const color = getColor(det.label);
        
//         // Coordinates are normalized, so scale them to image size
//         const absX = x1 * canvas.width;
//         const absY = y1 * canvas.height;
//         const absWidth = (x2 - x1) * canvas.width;
//         const absHeight = (y2 - y1) * canvas.height;
        
//         // Draw bounding box
//         ctx.strokeStyle = color;
//         ctx.lineWidth = 4;
//         ctx.strokeRect(absX, absY, absWidth, absHeight);
        
//         // Draw label background
//         ctx.fillStyle = color;
//         const text = `${det.label} (${(det.score * 100).toFixed(1)}%)`;
//         const textWidth = ctx.measureText(text).width;
//         ctx.fillRect(absX, absY, textWidth + 10, 25);
        
//         // Draw label text
//         ctx.fillStyle = "#ffffff";
//         ctx.font = '18px Arial';
//         ctx.fillText(text, absX + 5, absY + 18);
//       });
//     };
//   }, [file, result]);

//   return (
//     <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-4 shadow-md">
//       <h3 className="font-bold text-lg truncate text-emerald-300">{result.filename}</h3>
//       <div className="w-full">
//         <canvas ref={canvasRef} className="w-full h-auto rounded-md" />
//       </div>
//       <div>
//         <h4 className="font-semibold text-gray-300">Detection Summary:</h4>
//         <ul className="list-disc list-inside text-gray-400">
//             {Object.entries(result.counts).map(([label, count]) => (
//                 count > 0 && <li key={label}>{label}: {count}</li>
//             ))}
//             {result.detections.length === 0 && <li>No impurities detected.</li>}
//         </ul>
//       </div>
//     </div>
//   );
// }












// "use client";

// import { useEffect, useRef } from 'react';

// // Define the types to match the main page
// interface Detection {
//   box: [number, number, number, number];
//   label: string;
//   score: number;
// }

// interface Result {
//   filename: string;
//   detections: Detection[];
//   counts: { [key: string]: number };
// }

// interface ResultDisplayProps {
//   result: Result;
//   file: File;
// }

// // Helper function to get a color based on the label
// const getColor = (label: string) => {
//     // Simple hash function for consistent coloring
//     let hash = 0;
//     for (let i = 0; i < label.length; i++) {
//         hash = label.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
//     return "#" + "00000".substring(0, 6 - color.length) + color;
// }

// export default function ResultDisplay({ result, file }: ResultDisplayProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!file || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;
    
//     const img = new Image();
//     img.src = URL.createObjectURL(file);

//     img.onload = () => {
//       // Set canvas dimensions to image dimensions
//       canvas.width = img.width;
//       canvas.height = img.height;
      
//       // Draw the image on the canvas
//       ctx.drawImage(img, 0, 0);

//       // --- START OF FIX: DEFINE NEATER DRAWING STYLES ---
//       const fontSize = 12;
//       const lineWidth = 2;
//       ctx.font = `${fontSize}px Arial`;
//       // --- END OF FIX ---

//       // Draw detections
//       result.detections.forEach(det => {
//         const [x1, y1, x2, y2] = det.box;
//         const color = getColor(det.label);
        
//         // Coordinates are normalized, so scale them to image size
//         const absX = x1 * canvas.width;
//         const absY = y1 * canvas.height;
//         const absWidth = (x2 - x1) * canvas.width;
//         const absHeight = (y2 - y1) * canvas.height;
        
//         // Draw bounding box
//         ctx.strokeStyle = color;
//         ctx.lineWidth = lineWidth; // Use smaller line width
//         ctx.strokeRect(absX, absY, absWidth, absHeight);
        
//         // --- START OF FIX: NEAT LABEL DRAWING ---
//         ctx.fillStyle = color;
//         const text = `${det.label} (${(det.score * 100).toFixed(1)}%)`;
        
//         // Measure text for accurate background box width
//         const textWidth = ctx.measureText(text).width;
//         const textHeight = fontSize + 4; // Text height plus a small buffer
        
//         // Draw the label background rectangle ABOVE the top-left corner
//         // It starts at the top-left corner (absX, absY) and goes up by textHeight
//         ctx.fillRect(absX, absY - textHeight, textWidth + 8, textHeight);
        
//         // Draw label text
//         ctx.fillStyle = "#ffffff";
//         // Position text 4 pixels inside the left edge and 4 pixels up from the bottom edge of the rect
//         ctx.fillText(text, absX + 4, absY - 4); 
//         // --- END OF FIX ---
//       });
//     };
//   }, [file, result]);

//   return (
//     <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-4 shadow-md">
//       <h3 className="font-bold text-lg truncate text-emerald-300">{result.filename}</h3>
//       <div className="w-full">
//         {/* The canvas should maintain its original aspect ratio but scale with the container */}
//         <canvas ref={canvasRef} className="w-full h-auto rounded-md" />
//       </div>
//       <div>
//         <h4 className="font-semibold text-gray-300">Detection Summary:</h4>
//         <ul className="list-disc list-inside text-gray-400">
//             {Object.entries(result.counts).map(([label, count]) => (
//                 count > 0 && <li key={label}>{label}: {count}</li>
//             ))}
//             {result.detections.length === 0 && <li>No impurities detected.</li>}
//         </ul>
//       </div>
//     </div>
//   );
// }













"use client";

import { useEffect, useRef } from 'react';

// Define the types to match the main page
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

interface ResultDisplayProps {
  result: Result;
  file: File;
}

// Helper function to get a color based on the label
const getColor = (label: string) => {
    // Simple hash function for consistent coloring
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
        hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - color.length) + color;
}

export default function ResultDisplay({ result, file }: ResultDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Introduce an off-screen canvas (buffer) for sharp drawing
  const offScreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize the off-screen canvas on first render
  if (!offScreenCanvasRef.current) {
    offScreenCanvasRef.current = document.createElement('canvas');
  }

  useEffect(() => {
    if (!file || !canvasRef.current || !offScreenCanvasRef.current) return;

    const displayCanvas = canvasRef.current;
    const bufferCanvas = offScreenCanvasRef.current;
    
    const displayCtx = displayCanvas.getContext('2d');
    const bufferCtx = bufferCanvas.getContext('2d');

    if (!displayCtx || !bufferCtx) return;
    
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // 1. Configure the Buffer Canvas (Original Image Resolution)
      bufferCanvas.width = img.width;
      bufferCanvas.height = img.height;
      
      // 2. Configure the Display Canvas (For Responsive Scaling in UI)
      displayCanvas.width = img.width;
      displayCanvas.height = img.height;
      
      // Draw the image onto the buffer canvas
      bufferCtx.drawImage(img, 0, 0);

      // --- Drawing Configuration ---
      const fontSize = 16; // Slightly larger font for better legibility on a large canvas
      const lineWidth = 3; // Professional line width
      bufferCtx.font = `${fontSize}px sans-serif`;
      
      // Disable image smoothing for crisp lines/text on the buffer
      bufferCtx.imageSmoothingEnabled = false;

      // Draw detections onto the buffer
      result.detections.forEach(det => {
        const [x1, y1, x2, y2] = det.box;
        const color = getColor(det.label);
        
        // Coordinates are normalized, so scale them to the buffer size
        const absX = x1 * bufferCanvas.width;
        const absY = y1 * bufferCanvas.height;
        const absWidth = (x2 - x1) * bufferCanvas.width;
        const absHeight = (y2 - y1) * bufferCanvas.height;
        
        // Draw bounding box
        bufferCtx.strokeStyle = color;
        bufferCtx.lineWidth = lineWidth;
        bufferCtx.strokeRect(absX, absY, absWidth, absHeight);
        
        // Prepare label text
        const text = `${det.label} (${(det.score * 100).toFixed(1)}%)`;
        
        // Measure text for accurate background box width and height
        const metrics = bufferCtx.measureText(text);
        const textWidth = metrics.width;
        const textHeight = fontSize + 8; // Buffer + Font size
        const textYOffset = 4; // Buffer from the top of the rect
        
        // Draw the label background rectangle (positioned *above* the box)
        bufferCtx.fillStyle = color;
        bufferCtx.fillRect(absX - 1, absY - textHeight, textWidth + 10, textHeight);
        
        // Draw label text
        bufferCtx.fillStyle = "#ffffff";
        bufferCtx.fillText(text, absX + 4, absY - textYOffset); 
      });
      
      // Final step: Draw the sharp buffer content onto the display canvas
      displayCtx.drawImage(bufferCanvas, 0, 0);
    };
  }, [file, result]);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
      <h3 className="font-bold text-lg truncate text-emerald-300">{result.filename}</h3>
      <div className="w-full">
        {/* The displayed canvas will now contain a sharp image scaled by CSS */}
        <canvas ref={canvasRef} className="w-full h-auto rounded-md" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-300">Detection Summary:</h4>
        <ul className="list-disc list-inside text-gray-400">
            {Object.entries(result.counts).map(([label, count]) => (
                count > 0 && <li key={label} className="text-sm">{label}: {count}</li>
            ))}
            {result.detections.length === 0 && <li className="text-sm">No impurities detected.</li>}
        </ul>
      </div>
    </div>
  );
}