import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const InteractiveForceDiagram = () => {
  const [angle, setAngle] = useState(45); // Degrees
  const length = 150; // Force vector length in pixels
  const startX = 50;
  const startY = 250;

  // Convert degrees to radians
  const radians = (angle * Math.PI) / 180;

  // Calculate end coordinates
  const endX = startX + length * Math.cos(radians);
  const endY = startY - length * Math.sin(radians);

  // Components length
  const fxLength = length * Math.cos(radians);
  const fyLength = length * Math.sin(radians);

  const efficiency = Math.round(Math.cos(radians) * 100);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-xl w-full max-w-sm aspect-[4/3] relative shadow-lg overflow-hidden select-none">
        <svg viewBox="0 0 350 300" className="w-full h-full">
          <defs>
            <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
            </marker>
            <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
            </marker>
            <marker id="arrow-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
            </marker>
          </defs>

          {/* Grid lines for reference */}
          <path d="M 50 50 L 50 250 L 300 250" stroke="#E2E8F0" strokeWidth="2" />

          {/* Box (Static) */}
          <rect x={startX - 20} y={startY - 15} width="40" height="30" fill="#94A3B8" rx="4" />

          {/* F (Main Force) */}
          <motion.line 
            x1={startX} y1={startY} x2={endX} y2={endY}
            stroke="#3B82F6" strokeWidth="4" markerEnd="url(#arrow-blue)"
            animate={{ x2: endX, y2: endY }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.text 
            x={startX + (endX - startX) / 2} y={startY + (endY - startY) / 2 - 10} 
            fill="#3B82F6" fontSize="14" fontWeight="bold"
            animate={{ x: startX + (endX - startX) / 2, y: startY + (endY - startY) / 2 - 10 }}
          >
            F
          </motion.text>

          {/* Fx (Horizontal Component) */}
          <motion.line 
            x1={startX} y1={startY} x2={startX + fxLength} y2={startY}
            stroke="#10B981" strokeWidth="3" markerEnd="url(#arrow-green)" strokeDasharray="5,5"
            animate={{ x2: startX + fxLength }}
          />
          <text x={startX + fxLength / 2} y={startY + 20} fill="#10B981" fontSize="12" fontWeight="bold">Fx (Horizontal)</text>

          {/* Fy (Vertical Component) */}
          <motion.line 
            x1={endX} y1={startY} x2={endX} y2={endY}
            stroke="#EF4444" strokeWidth="3" markerEnd="url(#arrow-red)" strokeDasharray="5,5"
            animate={{ x1: endX, x2: endX, y2: endY }}
          />
          <motion.text 
            x={endX + 5} y={startY - fyLength / 2} 
            fill="#EF4444" fontSize="12" fontWeight="bold"
            animate={{ x: endX + 5, y: startY - fyLength / 2 }}
          >
            Fy (Vertical)
          </motion.text>

          {/* Angle Arc */}
          <path 
            d={`M ${startX + 30} ${startY} A 30 30 0 0 0 ${startX + 30 * Math.cos(radians)} ${startY - 30 * Math.sin(radians)}`}
            stroke="#64748B" fill="none"
          />
          <text x={startX + 40} y={startY - 5} fill="#64748B" fontSize="12">{angle}°</text>

        </svg>

        <div className="absolute top-2 right-2 bg-white/90 p-2 rounded-lg shadow text-xs font-mono border border-gray-100">
          <div className="text-green-600 font-bold">Fx Efficiency: {efficiency}%</div>
          <div className="text-red-500">Fy Wasted: {Math.round(Math.sin(radians) * 100)}%</div>
        </div>
      </div>

      <div className="w-full max-w-xs bg-gray-800 p-4 rounded-xl">
        <div className="flex justify-between text-sm mb-2 text-gray-300">
          <span>Angle: {angle}°</span>
          <span>More Horizontal →</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="90" 
          value={angle} 
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-teal-500"
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
          角度を動かして、$F_x$（箱を動かす力）の変化を見てみよう
        </p>
      </div>
    </div>
  );
};
