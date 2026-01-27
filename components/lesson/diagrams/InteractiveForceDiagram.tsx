import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const InteractiveForceDiagram = () => {
  const [angle, setAngle] = useState(45); // 角度の初期値
  const length = 220; // 矢印の長さ (さらに少し長く)
  
  // SVGの設定
  const svgWidth = 350;
  const svgHeight = 300;
  
  // 原点 (始点) をさらに左下に配置
  const startX = 30; 
  const startY = 270;

  // 角度をラジアンに変換
  const radians = (angle * Math.PI) / 180;

  // メインの力 F の先端座標
  const endX = startX + length * Math.cos(radians);
  const endY = startY - length * Math.sin(radians);

  // 分解した力の成分
  const fxEndX = startX + length * Math.cos(radians);
  const fxEndY = startY;

  const fyEndX = startX;
  const fyEndY = startY - length * Math.sin(radians);

  // 効率（%）の計算
  const efficiency = Math.round(Math.cos(radians) * 100);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* SVGエリア: 背景白に変更 */}
      <div className="bg-white p-4 rounded-xl w-full max-w-sm aspect-[4/3] relative overflow-hidden select-none border border-gray-200 shadow-sm">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
          <defs>
            <marker id="arrow-blue" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#3B82F6" />
            </marker>
            <marker id="arrow-green" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#10B981" />
            </marker>
            <marker id="arrow-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#EF4444" />
            </marker>
          </defs>

          {/* ガイドの扇形: 円を大きく */}
          <path 
            d={`M ${startX + length} ${startY} A ${length} ${length} 0 0 0 ${startX} ${startY - length}`} 
            stroke="#E5E7EB" 
            strokeWidth="1" 
            strokeDasharray="4,4"
            fill="none" 
          />
          {/* 軸線 */}
          <line x1={startX} y1={startY} x2={svgWidth} y2={startY} stroke="#E5E7EB" strokeWidth="1" />
          <line x1={startX} y1={startY} x2={startX} y2={0} stroke="#E5E7EB" strokeWidth="1" />

          {/* 荷物: 大きくしました (40x30 -> 60x45) */}
          <rect 
            x={startX - 30} 
            y={startY - 22.5} 
            width="60" 
            height="45" 
            fill="#9CA3AF" 
            rx="6" 
          />
          <text x={startX} y={startY + 5} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BOX</text>

          {/* Fx (水平方向の力) */}
          <motion.line 
            x1={startX} y1={startY} x2={fxEndX} y2={fxEndY}
            stroke="#10B981" 
            strokeWidth="3" 
            markerEnd="url(#arrow-green)" 
            strokeDasharray="5,5"
            animate={{ x2: fxEndX }}
          />
          <motion.text 
            fill="#10B981" fontSize="16" fontWeight="bold"
            animate={{ x: startX + (fxEndX - startX) / 2, y: startY + 25 }}
          >
            Fx
          </motion.text>

          {/* Fy (垂直方向の力) */}
          <motion.line 
            x1={startX} y1={startY} x2={fyEndX} y2={fyEndY}
            stroke="#EF4444" 
            strokeWidth="3" 
            markerEnd="url(#arrow-red)" 
            strokeDasharray="5,5"
            animate={{ y2: fyEndY }}
          />
          <motion.text 
            fill="#EF4444" fontSize="16" fontWeight="bold"
            animate={{ x: startX - 30, y: startY - (startY - fyEndY) / 2 }}
          >
            Fy
          </motion.text>

          {/* 補助線 */}
          <motion.line 
            x1={endX} y1={endY} x2={fxEndX} y2={fxEndY}
            stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4"
            animate={{ x1: endX, y1: endY, x2: fxEndX, y2: fxEndY }}
          />
          <motion.line 
            x1={endX} y1={endY} x2={fyEndX} y2={fyEndY}
            stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4"
            animate={{ x1: endX, y1: endY, x2: fyEndX, y2: fyEndY }}
          />

          {/* F (メインの力) */}
          <motion.line 
            x1={startX} y1={startY} x2={endX} y2={endY}
            stroke="#3B82F6" 
            strokeWidth="4" 
            markerEnd="url(#arrow-blue)"
            animate={{ x2: endX, y2: endY }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.text 
            fill="#3B82F6" fontSize="20" fontWeight="bold"
            animate={{ x: startX + (endX - startX) / 2 - 10, y: startY + (endY - startY) / 2 - 10 }}
          >
            F
          </motion.text>

          {/* 角度の円弧: 大きくしました (40 -> 60) */}
          <path 
            d={`M ${startX + 60} ${startY} A 60 60 0 0 0 ${startX + 60 * Math.cos(radians)} ${startY - 60 * Math.sin(radians)}`}
            stroke="#6B7280" fill="none"
          />
          <text x={startX + 70} y={startY - 15} fill="#6B7280" fontSize="14">θ = {angle}°</text>

        </svg>

        {/* 右上の情報ボックス: 日本語に変更 */}
        <div className="absolute top-2 right-2 bg-white/90 p-2 rounded-lg shadow-sm border border-gray-100 text-sm font-mono text-gray-600">
           効率: <span className="text-green-600 font-bold">{efficiency}%</span>
        </div>
      </div>

      {/* コントロールパネル */}
      <div className="w-full max-w-xs bg-gray-800 p-3 rounded-xl shadow-lg">
        <div className="flex justify-between text-sm mb-2 text-gray-300 px-1">
          <span className="font-mono text-teal-400">θ (Angle)</span>
          <span className="font-bold">{angle}°</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="90" 
          value={angle} 
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-teal-500 hover:accent-teal-400 transition-all"
        />
      </div>
    </div>
  );
};
