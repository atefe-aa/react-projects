import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

function useQuiz() {
  const context = useContext(QuizContext);
  return context;
}

export { useQuiz };
