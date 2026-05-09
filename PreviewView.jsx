import React from "react";
import styles from "./SubmitView.module.css"; // reuses same styles

function QuestionRow({ question, numbering, depth = 0 }) {
  return (
    <div style={{ marginLeft: depth * 24 }}>
      <div className={`${styles.row} ${depth > 0 ? styles.child : ""}`}>
        <span className={styles.numBadge}>Q{numbering}</span>
        <div className={styles.info}>
          <p className={styles.qText}>
            {question.text || (
              <em style={{ color: "var(--text-tertiary)", fontWeight: 400 }}>
                (No text entered)
              </em>
            )}
          </p>
          <p className={styles.qMeta}>
            {question.type === "short"
              ? "Short answer field"
              : `True / False${
                  question.answer
                    ? ` · Answered: ${question.answer}`
                    : " · (not answered yet)"
                }`}
          </p>
        </div>
      </div>

      {question.children.map((child, ci) => (
        <QuestionRow
          key={child.id}
          question={child}
          numbering={`${numbering}.${ci + 1}`}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

export default function PreviewView({ questions }) {
  return (
    <div>
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <div className={styles.panelTitle}>
            <i className="ti ti-eye" aria-hidden="true" />
            Form preview
          </div>
          <span className={styles.hint}>read-only · reflects current form state</span>
        </div>

        <div className={styles.panelBody}>
          {questions.length === 0 ? (
            <div className={styles.empty}>
              <i className="ti ti-clipboard" aria-hidden="true" />
              <p className={styles.emptyTitle}>Nothing to preview</p>
              <p className={styles.emptyHint}>Go to the Builder and add questions.</p>
            </div>
          ) : (
            questions.map((q, i) => (
              <QuestionRow
                key={q.id}
                question={q}
                numbering={`${i + 1}`}
                depth={0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
