// Immutable v1 scoring contract. Keep identical in marry-test and lookatme-backend.
export const QUIZ_CONTRACT = {
  version: "marry-v1",
  questions: [
    {
      id: "self-weekend",
      axis: "pace",
      perspective: "self",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "self-dinner",
      axis: "pace",
      perspective: "self",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "self-evening",
      axis: "closeness",
      perspective: "self",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "self-hobby",
      axis: "closeness",
      perspective: "self",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "self-comfort",
      axis: "care",
      perspective: "self",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "self-disagreement",
      axis: "care",
      perspective: "self",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "partner-weekend",
      axis: "pace",
      perspective: "partner",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "partner-anniversary",
      axis: "pace",
      perspective: "partner",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "partner-time",
      axis: "closeness",
      perspective: "partner",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "partner-hobby",
      axis: "closeness",
      perspective: "partner",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "partner-comfort",
      axis: "care",
      perspective: "partner",
      scores: [-3, -1, 1, 3],
    },
    {
      id: "partner-disagreement",
      axis: "care",
      perspective: "partner",
      scores: [-3, -1, 1, 3],
    },
  ],
  profileIds: [
    "everyday-soulmate",
    "steady-teammate",
    "quiet-garden",
    "reliable-companion",
    "romantic-explorer",
    "adventure-partner",
    "free-spirited-friend",
    "growth-companion",
  ],
} as const;
