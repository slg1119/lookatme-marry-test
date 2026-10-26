import { useEffect, useState } from "react";
import { submitResult } from "./result-api";

export type SyncStatus = "idle" | "saving" | "saved" | "error";

export function useResultSync(
  submissionId: string | undefined,
  answers: number[],
  enabled: boolean,
) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{ key: string; status: SyncStatus }>({
    key: "",
    status: "idle",
  });
  const answersJson = JSON.stringify(answers);
  const key =
    enabled && submissionId ? `${submissionId}:${answersJson}:${attempt}` : "";
  useEffect(() => {
    if (!key || !submissionId) return;
    let active = true;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 12_000);
    setState({ key, status: "saving" });
    void submitResult(submissionId, JSON.parse(answersJson), controller.signal)
      .then(() => {
        if (active) setState({ key, status: "saved" });
      })
      .catch(() => {
        if (active) setState({ key, status: "error" });
      })
      .finally(() => window.clearTimeout(timer));
    return () => {
      active = false;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [key, submissionId, answersJson]);
  return {
    status: !key
      ? ("idle" as const)
      : state.key === key
        ? state.status
        : ("saving" as const),
    retry: () => setAttempt((value) => value + 1),
  };
}
