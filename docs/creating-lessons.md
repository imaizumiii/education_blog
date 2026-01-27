# レッスンの作成方法

このプロジェクトでは、Markdownファイルを作成するだけで、TikTok風のスワイプ学習コンテンツを自動的に生成できます。

## 1. ファイルの作成

`data/lessons/` ディレクトリ内に新しい `.md` ファイルを作成します。
ファイル名がそのままURLのIDになります（例: `lesson-2.md` → `/lessons/lesson-2`）。

## 2. 基本フォーマット

ファイルの先頭には必ずメタデータ（Frontmatter）を記述してください。

```markdown
---
title: "Lesson 2: 挨拶と日常会話"
description: "朝、昼、晩の挨拶や、別れ際の表現を学びます。"
duration: "15 min"
level: "Easy"
---
```

## 3. スライドの作成

各スライドは水平線 `---` で区切ります。Markdownの内容によって、自動的にスライドの種類（レイアウト）が切り替わります。

### A. タイトル / 完了スライド

`#` (H1) で見出しを書くと、タイトル画面になります。
"Lesson" を含むとタイトル、"Good Job" を含むと完了画面として扱われます。

```markdown
# Lesson 2
## 挨拶と日常会話
基本的な挨拶を学びましょう。
```

### B. シーン導入スライド

`#` (H1) に "Scene" を含めると、シーン導入画面になります。

```markdown
# Scene 1
## 朝の挨拶
学校で先生に会いました。
```

### C. 会話 (Dialogue) スライド

`**名前**` で始めると、会話スライドになります。
1行目: キャラクター名（太字）
2行目: 英語フレーズ
3行目以降: 日本語訳（カッコ書きなど）

```markdown
**Ken**
Good morning, Ms. Smith.
(おはようございます、スミス先生。)
```

> **Note**: キャラクター名が "Ken" の場合は青、それ以外はピンクのアイコンが自動で割り当てられます。

### D. 重要フレーズ (Key Phrase) スライド

`#` (H1) に "Key Phrase" を含めると、重要表現の解説スライドになります。

```markdown
# Key Phrase 1
## Good morning.
「おはようございます」
朝の挨拶です。午前中に使います。
```

## 記述例（全体）

```markdown
---
title: "Lesson Sample"
description: "サンプルのレッスンです"
duration: "5 min"
level: "Easy"
---

# Lesson 1
## サンプルレッスン

---

# Scene 1
## 挨拶

---

**Ken**
Hello!
(こんにちは！)

---

**Emma**
Hi, Ken!
(やあ、ケン！)

---

# Good Job!
お疲れ様でした。
```
