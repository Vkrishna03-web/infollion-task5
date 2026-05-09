import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import BuilderView from "./components/BuilderView";
import PreviewView from "./components/PreviewView";
import SubmitView from "./components/SubmitView";
import { useFormStore } from "./useFormStore";
import styles from "./App.module.css";

const PAGE_META = {
  builder: {
    title: "Form Builder",
    sub:   "Build nested questions with hierarchical numbering",
  },
  preview: {
    title: "Preview",
    sub:   "Review your form structure before submitting",
  },
  submit: {
    title: "Submission Review",
    sub:   "Hierarchical view of all submitted questions",
  },
};

export default function App() {
  const [view, setView] = useState("builder");

  const {
    questions,
    savedFlash,
    addParent,
    updateQuestion,
    deleteQuestion,
    addChild,
    reorderParents,
    clearAll,
  } = useFormStore();

  const handleClear = () => {
    if (window.confirm("Clear all questions? This cannot be undone.")) {
      clearAll();
      setView("builder");
    }
  };

  return (
    <div className={styles.shell}>
      <h1 className="sr-only">FormCraft — Infollion Nested Form Builder</h1>

      <Sidebar view={view} onSetView={setView} onClear={handleClear} />

      <div className={styles.main}>
        {/* Top bar */}
        <div className={styles.topbar}>
          <div>
            <div className={styles.pageTitle}>{PAGE_META[view].title}</div>
            <div className={styles.pageSub}>{PAGE_META[view].sub}</div>
          </div>
          <div className={styles.actions}>
            {savedFlash && (
              <span className={styles.savedPill}>✓ Auto-saved</span>
            )}
            <button className={styles.btnGhost} onClick={addParent}>
              <i className="ti ti-plus" aria-hidden="true" />
              Add question
            </button>
            <button
              className={styles.btnPrimary}
              onClick={() => setView("submit")}
            >
              <i className="ti ti-send" aria-hidden="true" />
              Submit
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className={styles.content}>
          {view === "builder" && (
            <BuilderView
              questions={questions}
              onUpdate={updateQuestion}
              onDelete={deleteQuestion}
              onAddChild={addChild}
              onAddParent={addParent}
              onReorder={reorderParents}
            />
          )}
          {view === "preview" && <PreviewView questions={questions} />}
          {view === "submit"  && <SubmitView  questions={questions} />}
        </div>
      </div>
    </div>
  );
}
