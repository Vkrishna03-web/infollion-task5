import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "infollion_nested_form_v1";

export const genId = () => Math.random().toString(36).substr(2, 9);

export const createQuestion = () => ({
  id: genId(),
  text: "",
  type: "short",    // "short" | "truefalse"
  answer: null,     // null | "true" | "false"
  children: [],
});

/**
 * Deeply update a question at a given path of indices.
 * path = [0, 1, 0] means questions[0].children[1].children[0]
 */
function updateAtPath(questions, path, updater) {
  const qs = [...questions];
  if (path.length === 1) {
    qs[path[0]] = updater(qs[path[0]]);
    return qs;
  }
  qs[path[0]] = {
    ...qs[path[0]],
    children: updateAtPath(qs[path[0]].children, path.slice(1), updater),
  };
  return qs;
}

/**
 * Delete a question at a given path of indices.
 */
function deleteAtPath(questions, path) {
  if (path.length === 1) {
    return questions.filter((_, i) => i !== path[0]);
  }
  const qs = [...questions];
  qs[path[0]] = {
    ...qs[path[0]],
    children: deleteAtPath(qs[path[0]].children, path.slice(1)),
  };
  return qs;
}

/**
 * Add a new child question to the node at a given path.
 */
function addChildAtPath(questions, path) {
  const qs = [...questions];
  if (path.length === 0) {
    return [...qs, createQuestion()];
  }
  qs[path[0]] = {
    ...qs[path[0]],
    children: addChildAtPath(qs[path[0]].children, path.slice(1)),
  };
  return qs;
}

/**
 * Compute stats by walking the entire tree.
 */
export function calcStats(questions) {
  let total = 0, tf = 0, answered = 0, maxDepth = 0;
  function walk(qs, depth) {
    qs.forEach((q) => {
      total++;
      maxDepth = Math.max(maxDepth, depth);
      if (q.type === "truefalse") { tf++; if (q.answer) answered++; }
      walk(q.children, depth + 1);
    });
  }
  walk(questions, 1);
  return { total, tf, short: total - tf, answered, maxDepth };
}

export function useFormStore() {
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedFlash, setSavedFlash] = useState(false);

  // Auto-save on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
      setSavedFlash(true);
      const t = setTimeout(() => setSavedFlash(false), 1800);
      return () => clearTimeout(t);
    } catch {}
  }, [questions]);

  const addParent = useCallback(() => {
    setQuestions((prev) => [...prev, createQuestion()]);
  }, []);

  const updateQuestion = useCallback((path, updater) => {
    setQuestions((prev) => updateAtPath(prev, path, updater));
  }, []);

  const deleteQuestion = useCallback((path) => {
    setQuestions((prev) => deleteAtPath(prev, path));
  }, []);

  const addChild = useCallback((path) => {
    setQuestions((prev) => addChildAtPath(prev, path));
  }, []);

  const reorderParents = useCallback((fromIdx, toIdx) => {
    setQuestions((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, []);

  const clearAll = useCallback(() => {
    setQuestions([]);
  }, []);

  return {
    questions,
    savedFlash,
    addParent,
    updateQuestion,
    deleteQuestion,
    addChild,
    reorderParents,
    clearAll,
  };
}
