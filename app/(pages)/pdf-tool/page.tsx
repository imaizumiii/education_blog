import React from 'react';
import { Header } from '@/components/Header';
import { Construction } from 'lucide-react';

export default function PdfToolPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-lg">
        <Header />
        <div className="flex-1 px-4 py-6 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <Construction className="w-10 h-10 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">PDF Tool</h1>
          <p className="text-gray-500 mb-8">
            この機能は現在開発中です。<br />
            今後のアップデートをお待ちください。
          </p>
        </div>
      </div>
    </div>
  );
}
