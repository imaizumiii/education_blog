export interface LessonSlide {
  id: string;
  type: 'title' | 'scene' | 'dialogue' | 'key-phrase' | 'completion' | 'content';
  content: {
    title?: string;
    subtitle?: string;
    speaker?: string;
    english?: string;
    japanese?: string;
    text?: string;
  };
}

export interface LessonData {
  title: string;
  slides: LessonSlide[];
}

export function parseLessonMarkdown(markdown: string): LessonData {
  const lines = markdown.split('\n');
  
  // 簡易フロントマター解析
  let title = '';
  let contentStartLine = 0;
  
  if (lines[0].trim() === '---') {
    let i = 1;
    while (i < lines.length && lines[i].trim() !== '---') {
      const line = lines[i];
      if (line.startsWith('title:')) {
        title = line.replace('title:', '').trim().replace(/^"(.*)"$/, '$1');
      }
      i++;
    }
    contentStartLine = i + 1;
  }

  const contentBody = lines.slice(contentStartLine).join('\n');
  const rawSlides = contentBody.split('---').map(s => s.trim()).filter(s => s.length > 0);

  const slides: LessonSlide[] = rawSlides.map((raw, index) => {
    const slideLines = raw.split('\n').filter(l => l.trim() !== '');
    
    // スライドタイプの判定ロジック
    
    // 会話 (Dialogue)
    // ***Speaker*** で始まる行がある場合 (アスタリスク3つに変更)
    const speakerMatch = slideLines[0].match(/^\*\*\*(.*)\*\*\*$/);
    if (speakerMatch) {
      // 本文全体を取得（1行目の話者名を除く）
      const fullText = slideLines.slice(1).join('\n');
      
      // === で英語と日本語を分割
      const [englishPart, japanesePart] = fullText.split('===');

      return {
        id: `slide-${index}`,
        type: 'dialogue',
        content: {
          speaker: speakerMatch[1].trim(),
          english: englishPart ? englishPart.trim() : '',
          japanese: japanesePart ? japanesePart.trim() : ''
        }
      };
    }

    // タイトル/シーン/キーフレーズ/完了
    const firstLine = slideLines[0];
    
    if (firstLine.startsWith('# ')) {
      const mainTitle = firstLine.replace('# ', '').trim();
      const subTitle = slideLines[1]?.startsWith('## ') ? slideLines[1].replace('## ', '').trim() : '';
      const text = slideLines.slice(subTitle ? 2 : 1).join('\n');

      let type: LessonSlide['type'] = 'content';
      if (mainTitle.toLowerCase().includes('lesson')) type = 'title';
      else if (mainTitle.toLowerCase().includes('scene')) type = 'scene';
      else if (mainTitle.toLowerCase().includes('key phrase')) type = 'key-phrase';
      else if (mainTitle.toLowerCase().includes('good job')) type = 'completion';

      return {
        id: `slide-${index}`,
        type,
        content: {
          title: mainTitle,
          subtitle: subTitle,
          text: text
        }
      };
    }

    // デフォルト
    return {
      id: `slide-${index}`,
      type: 'content',
      content: {
        text: raw
      }
    };
  });

  return {
    title,
    slides
  };
}
