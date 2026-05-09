import React from "react";
import StatsBar from "./StatsBar";
import styles from "./SubmitView.module.css";

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
              ? "Short answer"
              : `True / False${
                  question.answer
                    ? ` · Answer: ${question.answer}`
                    : " · (not answered)"
                }`}
            {question.children.length > 0 && (
              <span className={styles.childCount}>
                {" "}· {question.children.length} sub-question
                {question.children.length > 1 ? "s" : ""}
              </span>
            )}
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

export default function SubmitView({ questions }) {
  return (
    <div>
      <StatsBar questions={questions} />

      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <div className={styles.panelTitle}>
            <i className="ti ti-check" aria-hidden="true" />
            Submitted form
            <span className={styles.badge}>Submitted</span>
          </div>
          <span className={styles.hint}>hierarchical view · read-only</span>
        </div>

        <div className={styles.panelBody}>
          {questions.length === 0 ? (
            <div className={styles.empty}>
              <i className="ti ti-clipboard-off" aria-hidden="true" />
              <p className={styles.emptyTitle}>Nothing submitted yet</p>
              <p className={styles.emptyHint}>
                Build your form and click <strong>Submit</strong>.
              </p>
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
