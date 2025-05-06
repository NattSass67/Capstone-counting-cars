/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Line {
  id: string;
  name: string;
  start: [number, number];
  end: [number, number];
}

type Props = {
  bgImage: string | null;
  onChange: (data: any) => void;
};

export default function DrawableBoard({ bgImage = "", ...props }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [clickState, setClickState] = useState<[number, number] | null>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!clickState) {
      setClickState([x, y]);
    } else {
      const newLine: Line = {
        id: uuidv4(),
        name: `Line ${lines.length + 1}`,
        start: clickState,
        end: [x, y],
      };
      setLines((prev) => [...prev, newLine]);
      setClickState(null);
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !bgImage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = bgImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(...line.start);
        ctx.lineTo(...line.end);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw name text near the center of the line
        const centerX = (line.start[0] + line.end[0]) / 2;
        const centerY = (line.start[1] + line.end[1]) / 2;
        ctx.fillStyle = "white";
        ctx.font = "16px sans-serif";
        ctx.fillText(line.name, centerX + 5, centerY - 5);
      });
    };
  };

  useEffect(() => {
    draw();
    props.onChange(lines);
  }, [bgImage, lines]);

  const renameLine = (id: string) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      setLines((prev) =>
        prev.map((line) => (line.id === id ? { ...line, name: newName } : line))
      );
    }
  };

  const deleteLine = (id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="overflow-auto border rounded-lg shadow-md p-2 flex items-center">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="border-2 border-gray-400 rounded-md cursor-crosshair"
        />
      </div>

      {lines.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-amber-900">รายการเส้น:</h3>
          {lines.map((line) => (
            <div
              key={line.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm"
            >
              <span className="text-gray-800">{line.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => renameLine(line.id)}
                  className="text-blue-600 hover:underline"
                >
                  แก้ชื่อ
                </button>
                <button
                  onClick={() => deleteLine(line.id)}
                  className="text-red-600 hover:underline"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
