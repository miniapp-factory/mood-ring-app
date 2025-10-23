"use client";

import { useState } from "react";
import MoodRing from "@/components/mood-ring";

const questions = [
  {
    question: "What food do you feel like eating right now?",
    options: ["Pizza", "Pasta", "Fried Chicken", "Salad", "Sushi"],
    // Higher index = happier choice
    scores: [1, 2, 3, 4, 5],
  },
  {
    question: "How would you describe your energy level today?",
    options: ["High", "Medium", "Low", "Very Low", "Energized"],
    scores: [5, 4, 3, 2, 1],
  },
  {
    question: "Which activity would you choose for a break?",
    options: ["Dance", "Read", "Jog", "Meditate", "Play Games"],
    scores: [5, 3, 4, 2, 1],
  },
  {
    question: "What color best matches your mood?",
    options: ["Red", "Blue", "Green", "Yellow", "Purple"],
    scores: [5, 4, 3, 2, 1],
  },
  {
    question: "How many hours of sleep did you get last night?",
    options: ["0-2", "3-5", "6-8", "9-10", "More than 10"],
    scores: [1, 2, 3, 4, 5],
  },
  {
    question: "What type of music do you prefer right now?",
    options: ["Rock", "Pop", "Jazz", "Classical", "Hip‑Hop"],
    scores: [4, 5, 3, 2, 1],
  },
  {
    question: "Which animal do you feel most like?",
    options: ["Lion", "Dolphin", "Elephant", "Owl", "Panda"],
    scores: [5, 4, 3, 2, 1],
  },
  {
    question: "What is your favorite season?",
    options: ["Spring", "Summer", "Autumn", "Winter", "All"],
    scores: [4, 5, 3, 2, 1],
  },
  {
    question: "How do you feel about your day so far?",
    options: ["Great", "Good", "Okay", "Bad", "Terrible"],
    scores: [5, 4, 3, 2, 1],
  },
  {
    question: "What would you do if you had a free day?",
    options: ["Travel", "Stay Home", "Party", "Work", "Volunteer"],
    scores: [5, 3, 4, 2, 1],
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (index: number) => {
    const question = questions[current];
    const selectedScore = question.scores[index];
    setScore((s) => s + selectedScore);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  // Updated thresholds for a more nuanced mood mapping
  const getMood = () => {
    const avg = score / (questions.length * 5); // 0-1
    if (avg < 0.25) return "sad";
    if (avg < 0.5) return "relaxed";
    if (avg < 0.75) return "excited";
    return "happy";
  };

  return (
    <main className="flex flex-col gap-4 place-items-center px-4 py-8">
      {!finished ? (
        <>
          <h2 className="text-xl font-semibold">{questions[current].question}</h2>
          <div className="grid gap-2">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                className="w-full rounded-md bg-muted px-4 py-2 text-left hover:bg-muted-foreground"
                onClick={() => handleSelect(idx)}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold">Your Mood: {getMood()}</h2>
          <MoodRing mood={getMood()} />
          <p className="text-muted-foreground">
            You are in a {getMood()} mood!
          </p>
        </>
      )}
    </main>
  );
}
