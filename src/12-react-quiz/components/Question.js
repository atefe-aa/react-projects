import { useQuiz } from "../hooks/useQuiz";
import Options from "./Options";

function Question() {
  const { questions, answer, dispatch, index } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Question;
