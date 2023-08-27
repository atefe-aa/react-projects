import MainAPP from "./components/MainApp";
import { QuizProvider } from "./contexts/QuizContext";
import "./css/index.css";

export default function APP() {
  return (
    <QuizProvider>
      <MainAPP />
    </QuizProvider>
  );
}
