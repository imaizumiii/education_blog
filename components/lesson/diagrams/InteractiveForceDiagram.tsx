import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const InteractiveForceDiagram = () => {
  const [angle, setAngle] = useState(45); // 角度の初期値
  const length = 150; // 矢印の長さ
  
  // SVGの中心設定
  const svgWidth = 350;
  const svgHeight = 300;
  const startX = svgWidth / 2; // 中心
  const startY = 250; // 下の方

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
  const efficiency = Math.round(Math.abs(Math.cos(radians)) * 100);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* SVGエリア */}
      <div className="bg-gray-800 p-4 rounded-xl w-full max-w-sm aspect-[4/3] relative overflow-hidden select-none border border-gray-700">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
          {/* 1. 矢印の先端の形を定義 (defs) - 小さくしました */}
          <defs>
            {/* 青い矢印 */}
            <marker id="arrow-blue" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#3B82F6" />
            </marker>
            {/* 緑の矢印 */}
            <marker id="arrow-green" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#10B981" />
            </marker>
            {/* 赤の矢印 */}
            <marker id="arrow-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#EF4444" />
            </marker>
          </defs>

          {/* ガイドの半円 */}
          <path 
            d={`M ${startX - length} ${startY} A ${length} ${length} 0 0 1 ${startX + length} ${startY}`} 
            stroke="#374151" 
            strokeWidth="1" 
            strokeDasharray="4,4"
            fill="none" 
          />
          <line x1={startX - length - 20} y1={startY} x2={startX + length + 20} y2={startY} stroke="#374151" strokeWidth="1" />

          {/* 荷物 (中心に配置) */}
          <rect 
            x={startX - 20} 
            y={startY - 15} 
            width="40" 
            height="30" 
            fill="#4B5563" 
            rx="4" 
          />

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
            fill="#10B981" fontSize="16" fontWeight="bold" // 文字サイズ変更: 12 -> 14
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
            x={startX + 10} 
            fill="#EF4444" fontSize="16" fontWeight="bold" // 文字サイズ変更: 12 -> 14
            animate={{ y: startY - (startY - fyEndY) / 2 }}
          >
            Fy
          </motion.text>

          {/* 補助線: Fの先端から各成分へ (長方形を作る) */}
          <motion.line 
            x1={endX} y1={endY} x2={fxEndX} y2={fxEndY}
            stroke="#4B5563" strokeWidth="1" strokeDasharray="4,4"
            animate={{ x1: endX, y1: endY, x2: fxEndX, y2: fxEndY }}
          />
          <motion.line 
            x1={endX} y1={endY} x2={fyEndX} y2={fyEndY}
            stroke="#4B5563" strokeWidth="1" strokeDasharray="4,4"
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
            fill="#3B82F6" fontSize="20" fontWeight="bold" // 文字サイズ変更: 14 -> 16
            animate={{ x: startX + (endX - startX) / 2 - 10, y: startY + (endY - startY) / 2 - 10 }}
          >
            F
          </motion.text>

          {/* 角度表示 */}
          <path 
            d={`M ${startX + 30} ${startY} A 30 30 0 0 0 ${startX + 30 * Math.cos(radians)} ${startY - 30 * Math.sin(radians)}`}
            stroke="#9CA3AF" fill="none"
          />
          <text x={startX + 40} y={startY - 5} fill="#9CA3AF" fontSize="14">θ = {angle}°</text>

        </svg>

        {/* 右上の情報ボックス */}
        <div className="absolute top-2 right-2 text-xs font-mono text-gray-400">
           Eff: {efficiency}%
        </div>
      </div>

      {/* コントロールパネル */}
      <div className="w-full max-w-xs bg-gray-800/50 p-2 rounded-xl">
        <div className="flex justify-between text-sm mb-1 text-gray-300 px-1">
          <span className="font-mono">θ (Angle)</span>
          <span>{angle}°</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="180" 
          value={angle} 
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-teal-500"
        />
      </div>
    </div>
  );
};
