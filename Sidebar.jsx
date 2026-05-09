import React from "react";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
  { id: "builder", icon: "ti-layout-list", label: "Form Builder" },
  { id: "preview", icon: "ti-eye",         label: "Preview" },
  { id: "submit",  icon: "ti-send",        label: "Submission" },
];

export default function Sidebar({ view, onSetView, onClear }) {
  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoWrap}>
        <div className={styles.logoDot}>
          <i className="ti ti-forms" aria-hidden="true" />
        </div>
        <div>
          <div className={styles.logoName}>FormCraft</div>
          <div className={styles.logoSub}>Infollion · Task 5</div>
        </div>
      </div>

      {/* Nav */}
      <nav aria-label="Main navigation">
        <p className={styles.sectionLabel}>Workspace</p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.navBtn} ${view === item.id ? styles.active : ""}`}
            onClick={() => onSetView(item.id)}
            aria-current={view === item.id ? "page" : undefined}
          >
            <i className={`ti ${item.icon}`} aria-hidden="true" />
            {item.label}
          </button>
        ))}

        <p className={styles.sectionLabel} style={{ marginTop: 16 }}>Actions</p>
        <button className={`${styles.navBtn} ${styles.danger}`} onClick={onClear}>
          <i className="ti ti-trash" aria-hidden="true" />
          Clear form
        </button>
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        Built for Infollion internship
      </div>
    </aside>
  );
}
