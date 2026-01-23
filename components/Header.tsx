import React from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <Link href="/" className="text-xl font-bold text-teal-600 dark:text-teal-400 hover:opacity-80 transition-opacity">
        TEKITO
      </Link>
      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <User className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>
    </header>
  );
};
