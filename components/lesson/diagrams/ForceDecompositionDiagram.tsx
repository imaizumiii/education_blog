import React from 'react';
import { motion } from 'framer-motion';

export const ForceDecompositionDiagram = () => {
  return (
    <div className="bg-white p-6 rounded-xl w-full max-w-sm mx-auto my-4 aspect-video flex items-center justify-center relative overflow-hidden">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
          </marker>
          <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
          </marker>
          <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
          </marker>
        </defs>

        {/* Box */}
        <rect x="50" y="200" width="80" height="60" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
        <text x="90" y="235" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="bold">BOX</text>
        
        {/* Ground */}
        <line x1="20" y1="260" x2="380" y2="260" stroke="#94A3B8" strokeWidth="2" />

        {/* Diagonal Force F */}
        <motion.line 
          x1="130" y1="230" x2="280" y2="130" 
          stroke="#3B82F6" strokeWidth="4" markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <text x="220" y="170" fill="#3B82F6" fontSize="20" fontWeight="bold">F</text>

        {/* Angle */}
        <path d="M 180 230 Q 190 220 185 200" stroke="#94A3B8" fill="none" strokeDasharray="4" />
        <text x="200" y="215" fill="#64748B" fontSize="16">θ</text>

        {/* Components (Animate later) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {/* Fx (Horizontal) */}
          <line 
            x1="130" y1="230" x2="280" y2="230" 
            stroke="#10B981" strokeWidth="3" markerEnd="url(#arrowhead-green)" 
            strokeDasharray="5,5"
          />
          <text x="200" y="250" fill="#10B981" fontSize="16" fontWeight="bold">Fx (cos)</text>

          {/* Fy (Vertical) */}
          <line 
            x1="280" y1="230" x2="280" y2="130" 
            stroke="#EF4444" strokeWidth="3" markerEnd="url(#arrowhead-red)"
            strokeDasharray="5,5"
          />
          <text x="290" y="190" fill="#EF4444" fontSize="16" fontWeight="bold">Fy (sin)</text>
        </motion.g>
      </svg>
    </div>
  );
};
