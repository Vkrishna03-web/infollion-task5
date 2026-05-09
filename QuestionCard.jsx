import React, { useRef } from "react";
import styles from "./QuestionCard.module.css";

/**
 * Recursive question card.
 * Props:
 *   question    – the question object
 *   path        – array of indices from root, e.g. [0] or [0, 1, 2]
 *   numbering   – display string, e.g. "1", "1.2", "1.2.3"
 *   depth       – integer nesting depth (0 = parent)
 *   onUpdate    – (path, updaterFn) => void
 *   onDelete    – (path) => void
 *   onAddChild  – (path) => void
 *   dragHandlers – { onDragStart, onDragEnter, onDragEnd, isDragging } (depth === 0 only)
 */
export default function QuestionCard({
  question,
  path,
  numbering,
  depth,
  onUpdate,
  onDelete,
  onAddChild,
  dragHandlers,
}) {
  const showChildSection =
    question.type === "truefalse" && question.answer === "true";

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    onUpdate(path, (old) => ({
      ...old,
      type: newType,
      answer: null,
      children: newType === "short" ? [] : old.children,
    }));
  };

  const handleAnswer = (val) => {
    onUpdate(path, (old) => ({
      ...old,
      answer: val,
      children: val === "true" ? old.children : [],
    }));
  };

  const updateChild = (childPath, updater) => onUpdate(childPath, updater);
  const deleteChild = (childPath) => onDelete(childPath);
  const addGrandChild = (childPath) => onAddChild(childPath);

  const isDragging = dragHandlers?.isDragging ?? false;

  return (
    <div
      className={`${styles.wrapper} ${isDragging ? styles.dragging : ""}`}
      style={{ marginLeft: depth > 0 ? 28 : 0 }}
      onDragEnter={depth === 0 ? dragHandlers?.onDragEnter : undefined}
      onDragOver={depth === 0 ? (e) => e.preventDefault() : undefined}
      onDrop={depth === 0 ? dragHandlers?.onDrop : undefined}
    >
      {/* Card */}
      <div className={`${styles.card} ${depth > 0 ? styles.child : ""}`}>
        {/* Row 1: handle + number + input + type + delete */}
        <div className={styles.row}>
          {depth === 0 && (
            <span
              className={styles.handle}
              draggable
              onDragStart={dragHandlers?.onDragStart}
              onDragEnd={dragHandlers?.onDragEnd}
              title="Drag to reorder"
              aria-label="Drag handle"
            >
              ⠿
            </span>
          )}

          <span className={styles.numBadge}>Q{numbering}</span>

          <input
            type="text"
            className={styles.textInput}
            placeholder="Type your question here…"
            value={question.text}
            onChange={(e) =>
              onUpdate(path, (old) => ({ ...old, text: e.target.value }))
            }
          />

          <select
            className={styles.typeSelect}
            value={question.type}
            onChange={handleTypeChange}
          >
            <option value="short">Short Answer</option>
            <option value="truefalse">True / False</option>
          </select>

          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(path)}
            aria-label="Delete question"
            title="Delete this question"
          >
            <i className="ti ti-trash" aria-hidden="true" />
          </button>
        </div>

        {/* Row 2: True/False answer selector */}
        {question.type === "truefalse" && (
          <div className={styles.tfRow}>
            {["true", "false"].map((val) => (
              <button
                key={val}
                onClick={() => handleAnswer(val)}
                className={`${styles.tfBtn} ${
                  question.answer === val
                    ? val === "true"
                      ? styles.tfTrue
                      : styles.tfFalse
                    : ""
                }`}
              >
                {val === "true" ? "✓ True" : "✗ False"}
              </button>
            ))}
            {question.answer && (
              <span className={styles.tfHint}>
                {showChildSection
                  ? "Sub-questions unlocked →"
                  : "No sub-questions for False."}
              </span>
            )}
          </div>
        )}

        {/* Nested children */}
        {question.children.map((child, ci) => (
          <QuestionCard
            key={child.id}
            question={child}
            path={[...path, ci]}
            numbering={`${numbering}.${ci + 1}`}
            depth={depth + 1}
            onUpdate={updateChild}
            onDelete={deleteChild}
            onAddChild={addGrandChild}
          />
        ))}

        {/* Add sub-question button */}
        {showChildSection && (
          <button
            className={styles.addChildBtn}
            onClick={() => onAddChild([...path, question.children.length])}
          >
            <i className="ti ti-plus" aria-hidden="true" />
            Add sub-question to Q{numbering}
          </button>
        )}
      </div>
    </div>
  );
}
