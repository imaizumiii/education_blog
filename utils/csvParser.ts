import { Quiz, QuizQuestion } from '@/types/quiz';

// CSVの行を配列に分割する（ダブルクォート考慮）
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuote = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (inQuote) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          // エスケープされたダブルクォート ("")
          current += '"';
          i++;
        } else {
          // クォート終了
          inQuote = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuote = true;
      } else if (char === ',') {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
  }
  result.push(current);
  return result;
}

export function parseQuizCsv(csvContent: string): Quiz | null {
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');
  
  if (lines.length < 3) return null;

  // 1行目: メタデータ
  // #Meta,id,title,category,difficulty
  const metaLine = lines[0];
  if (!metaLine.startsWith('#Meta')) return null;
  
  const metaParts = parseCSVLine(metaLine);
  // parseCSVLineの結果、要素0は'#Meta'
  if (metaParts.length < 5) return null;

  const id = metaParts[1].trim();
  const title = metaParts[2].trim();
  const category = metaParts[3].trim();
  const difficulty = metaParts[4].trim() as 'Easy' | 'Medium' | 'Hard';

  // 2行目: ヘッダー（スキップ）
  // id,question,option1,option2,option3,option4,correct,explanation

  // 3行目以降: データ
  const questions: QuizQuestion[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const parts = parseCSVLine(line);
    
    if (parts.length < 8) continue;

    const [qId, questionText, opt1, opt2, opt3, opt4, correctStr, explanation] = parts;

    // CSV上のcorrectは 1-4 なので、0-3 に変換
    const correctIndex = parseInt(correctStr.trim(), 10) - 1;

    questions.push({
      id: qId.trim(),
      question: questionText.trim(),
      options: [opt1.trim(), opt2.trim(), opt3.trim(), opt4.trim()],
      correct: correctIndex,
      explanation: explanation.trim()
    });
  }

  return {
    id,
    title,
    category,
    difficulty,
    questions,
    relatedLessons: [] // CSVには現状含めない
  };
}
