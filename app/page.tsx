"use client";

import { BookOpen, FileText, Search, User, Home as HomeIcon, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function Home() {
  // 現在の時刻に基づいて挨拶を生成
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "おはようございます";
    if (hour < 18) return "こんにちは";
    return "こんばんは";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* アプリコンテナ - モバイルビュー中心、最大幅md、中央揃え */}
      <div className="w-full max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-lg">
        {/* ヘッダー */}
        <Header />

        {/* メインコンテンツ */}
        <main className="flex-1 px-4 py-6 pb-24 overflow-y-auto">
          {/* ヒーローセクション */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {getGreeting()}、Student!
            </h2>
            {/* 進捗サマリーカード */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-4 text-white shadow-md">
              <p className="text-sm opacity-90 mb-2">今週の目標</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">3 / 5</p>
                  <p className="text-sm opacity-90">レッスン完了</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">60%</span>
                </div>
              </div>
            </div>
          </section>

          {/* メインメニュー - 3つのカード */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">メニュー</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* Lessons カード */}
              <Link
                href="/lessons"
                className="bg-white border-2 border-teal-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-teal-400 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">📖 レッスン</h4>
                    <p className="text-sm text-gray-600">学習コンテンツと解説</p>
                  </div>
                </div>
              </Link>

              {/* Quizzes カード */}
              <Link
                href="/quiz"
                className="bg-white border-2 border-orange-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-orange-400 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">🎮 クイズ</h4>
                    <p className="text-sm text-gray-600">4択問題で理解度を確認</p>
                  </div>
                </div>
              </Link>

              {/* PDF Tool カード */}
              <Link
                href="/pdf-tool"
                className="bg-white border-2 border-yellow-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-yellow-400 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">📄 PDFツール</h4>
                    <p className="text-sm text-gray-600">学習資料を生成</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* 最近の更新 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">最近の更新</h3>
            <div className="space-y-3">
              {[
                { title: "数学：二次関数の基礎", date: "2時間前", category: "数学" },
                { title: "英語：現在完了形の使い方", date: "5時間前", category: "英語" },
                { title: "物理：運動方程式の解説", date: "1日前", category: "物理" },
                { title: "化学：有機化合物の命名法", date: "2日前", category: "化学" },
              ].map((article, index) => (
                <Link
                  key={index}
                  href={`/articles/${index + 1}`}
                  className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full">
                          {article.category}
                        </span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* ボトムナビゲーションバー - スティッキーフッター */}
        <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-around py-3">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 text-teal-600 active:opacity-70"
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs font-medium">ホーム</span>
            </Link>
            <Link
              href="/search"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 active:opacity-70"
            >
              <Search className="w-6 h-6" />
              <span className="text-xs font-medium">検索</span>
            </Link>
            <Link
              href="/profile"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 active:opacity-70"
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium">プロフィール</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
