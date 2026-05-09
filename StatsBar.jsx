import React from "react";
import styles from "./StatsBar.module.css";
import { calcStats } from "../useFormStore";

export default function StatsBar({ questions }) {
  const { total, tf, short, answered, maxDepth } = calcStats(questions);
  const pct = tf > 0 ? Math.round((answered / tf) * 100) : 0;

  const cards = [
    { label: "Parent questions", value: questions.length, icon: "ti-list-numbers" },
    { label: "Total nodes",      value: total,             icon: "ti-hierarchy" },
    { label: "Short answer",     value: short,             icon: "ti-text-size" },
    { label: "True / False",     value: tf,                icon: "ti-toggle-left" },
    { label: "Max depth",        value: maxDepth,          icon: "ti-git-branch" },
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {cards.map((c) => (
          <div key={c.label} className={styles.card}>
            <div className={styles.label}>
              <i className={`ti ${c.icon}`} aria-hidden="true" />
              {c.label}
            </div>
            <div className={styles.value}>{c.value}</div>
          </div>
        ))}
      </div>

      {tf > 0 && (
        <div className={styles.progressWrap}>
          <div className={styles.progressMeta}>
            <span>True/False answered</span>
            <span className={styles.progressPct}>{pct}%</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
