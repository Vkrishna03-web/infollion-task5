import React, { useRef, useState } from "react";
import QuestionCard from "./QuestionCard";
import StatsBar from "./StatsBar";
import styles from "./BuilderView.module.css";

export default function BuilderView({
  questions,
  onUpdate,
  onDelete,
  onAddChild,
  onAddParent,
  onReorder,
}) {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);

  const handleDragStart = (idx) => setDragIdx(idx);
  const handleDragEnter = (idx) => setOverIdx(idx);
  const handleDragEnd = () => {
    if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx) {
      onReorder(dragIdx, overIdx);
    }
    setDragIdx(null);
    setOverIdx(null);
  };

  return (
    <div className={styles.wrap}>
      <StatsBar questions={questions} />

      <div className={styles.panel}>
        {/* Panel header */}
        <div className={styles.panelHead}>
          <div className={styles.panelTitle}>
            <i className="ti ti-edit" aria-hidden="true" />
            Questions
            <span className={styles.hint}>
              {questions.length} parent · drag ⠿ to reorder
            </span>
          </div>
        </div>

        {/* Panel body */}
        <div className={styles.panelBody}>
          {questions.length === 0 ? (
            <div className={styles.empty}>
              <i className="ti ti-file-plus" aria-hidden="true" />
              <p className={styles.emptyTitle}>No questions yet</p>
              <p className={styles.emptyHint}>
                Click <strong>Add question</strong> above to get started.
              </p>
            </div>
          ) : (
            <>
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className={`${styles.dragTarget} ${
                    overIdx === i && dragIdx !== i ? styles.dropOver : ""
                  }`}
                  onDragEnter={() => handleDragEnter(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDragEnd}
                >
                  <QuestionCard
                    question={q}
                    path={[i]}
                    numbering={`${i + 1}`}
                    depth={0}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onAddChild={onAddChild}
                    dragHandlers={{
                      onDragStart: () => handleDragStart(i),
                      onDragEnd:   handleDragEnd,
                      isDragging:  dragIdx === i,
                    }}
                  />
                </div>
              ))}

              <div className={styles.addRow}>
                <button className={styles.addBtn} onClick={onAddParent}>
                  <i className="ti ti-plus" aria-hidden="true" />
                  Add another question
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
