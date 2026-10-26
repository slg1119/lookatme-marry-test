"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";
import { readSession } from "../lib/session";
import type { SavedSession } from "../lib/session";

type SessionContext = {
  saved: SavedSession | null;
  setSaved: Dispatch<SetStateAction<SavedSession | null>>;
  answers: number[];
  setAnswers: Dispatch<SetStateAction<number[]>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  hydrated: boolean;
};
const Context = createContext<SessionContext | null>(null);

export function QuizSessionProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<SavedSession | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const session = readSession();
    setSaved(session);
    setAnswers(session?.answers ?? []);
    setStep(session?.step ?? 0);
    setHydrated(true);
  }, []);
  return (
    <Context.Provider
      value={{ saved, setSaved, answers, setAnswers, step, setStep, hydrated }}
    >
      {children}
    </Context.Provider>
  );
}

export function useQuizSession() {
  const context = useContext(Context);
  if (!context) throw new Error("QuizSessionProvider is required");
  return context;
}
