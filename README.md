# FormCraft — Infollion Internship Task 5

> **Dynamic Nested Form Builder** with recursive sub-questions, drag-and-drop reordering, localStorage persistence, and a premium dashboard UI.

---

## Live Demo

> After deploying to Vercel/Netlify, paste the URL here.

---

## Features

### Core Requirements ✅

| Feature | Details |
|---|---|
| Add parent questions | "Add question" button in topbar and builder panel |
| Question types | Short Answer · True / False |
| Nested sub-questions | True/False → True unlocks child questions (recursive, unlimited depth) |
| Auto-numbering | Hierarchical: Q1 · Q1.1 · Q1.1.1 · Q2 · Q2.1 … |
| Delete | Every question (parent or child) has a delete button; deletes all descendants |
| Form submission | Submission view shows full hierarchy; Preview view for pre-submit review |

### Bonus Features ✅

| Feature | Details |
|---|---|
| **localStorage persistence** | State auto-saves on every keystroke; "✓ Auto-saved" pill confirms |
| **Drag-and-drop reorder** | Grab the ⠿ handle on any parent question and drag to reorder |

### Premium Dashboard UI

- Sidebar navigation with three views: **Builder · Preview · Submission**
- Live stats bar: total questions, node count, Short/True-False split, max depth, answered %
- Animated progress bar for True/False answered percentage
- Full CSS Modules — no style collisions, scoped per component
- Inter + JetBrains Mono typography via Google Fonts

---

## Tech Stack

- **React 18** (Create React App)
- **CSS Modules** for scoped styling
- **HTML5 Drag and Drop API** for reordering
- **localStorage** for persistence
- **Tabler Icons** webfont for UI icons

---

## Project Structure

```
infollion-nested-form/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BuilderView.jsx       # Main form-building panel
│   │   ├── BuilderView.module.css
│   │   ├── QuestionCard.jsx      # Recursive question card
│   │   ├── QuestionCard.module.css
│   │   ├── Sidebar.jsx           # Navigation sidebar
│   │   ├── Sidebar.module.css
│   │   ├── StatsBar.jsx          # Live metrics row
│   │   ├── StatsBar.module.css
│   │   ├── PreviewView.jsx       # Read-only form preview
│   │   ├── SubmitView.jsx        # Hierarchical submission review
│   │   └── SubmitView.module.css
│   ├── useFormStore.js           # State management + localStorage hook
│   ├── App.js                    # Root layout + routing between views
│   ├── App.module.css
│   └── index.css                 # Global tokens + resets
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 16
- npm ≥ 8

### Installation & Run

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/infollion-nested-form.git
cd infollion-nested-form

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app opens at **http://localhost:3000**

### Production Build

```bash
npm run build
```

Outputs a production-ready bundle to `/build`.

---

## Deployment (Vercel — recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Create React App — no config needed.

---

## How It Works

### State Management (`useFormStore.js`)

All form state lives in a single custom hook. Every question is a node:

```js
{
  id:       "abc123",    // unique id
  text:     "",          // question text
  type:     "short",     // "short" | "truefalse"
  answer:   null,        // null | "true" | "false"
  children: []           // nested QuestionCard[]
}
```

Tree operations (`updateAtPath`, `deleteAtPath`, `addChildAtPath`) use a `path` array — e.g. `[0, 1, 2]` means `questions[0].children[1].children[2]` — for pure immutable deep updates.

### Recursive Rendering (`QuestionCard.jsx`)

`QuestionCard` renders itself for each child, passing `depth + 1` and the extended `path`. The True/False answer toggle controls whether the child section is visible and whether children are preserved on type change.

### Auto-numbering

The parent index + recursive child index produce the numbering string passed as a prop: `"1"` → `"1.2"` → `"1.2.3"`.

### Drag and Drop

Native HTML5 Drag and Drop on parent-level wrappers. `dragIdx` and `overIdx` are tracked in `BuilderView` state; on `drop`, `reorderParents` splices the array.

---

## Screenshots

> Add screenshots of Builder, Preview, and Submission views here.

---

## Author

**Vamshi** — IIT Kharagpur · Ocean Engineering & Naval Architecture  
Infollion Software Developer Intern Application · Task 5
