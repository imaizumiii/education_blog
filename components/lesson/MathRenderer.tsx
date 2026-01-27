import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  text: string;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ text, className = '' }) => {
  // 1. 数式 ($...$ または $$...$$) で分割
  const mathParts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

  return (
    <span className={className}>
      {mathParts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // ブロック数式
          return <BlockMath key={index} math={part.slice(2, -2)} />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          // インライン数式
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        } else {
          // 通常テキスト部分 -> 太字処理を実行
          return <BoldTextRenderer key={index} text={part} />;
        }
      })}
    </span>
  );
};

// 太字処理用のサブコンポーネント
const BoldTextRenderer: React.FC<{ text: string }> = ({ text }) => {
  // **bold** で分割
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // 太字部分
          return <strong key={idx} className="font-bold text-teal-400">{part.slice(2, -2)}</strong>;
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
};
