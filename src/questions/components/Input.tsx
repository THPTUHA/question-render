import { ExamResult, QuestionRender } from "question-convert";
import classCheckResult from "../../helper/classCheckResult";
import { onAnswerQuestion } from "../types";
import { getPupilAnswer, getQuestionSolution } from "../../utils";

const Input = ({
  a_index,
  i_index,
  question,
  className,
  is_view,
  exam_result,
  onAnswerQuestion,
}: {
  a_index: number;
  i_index: number;
  className: any;
  is_view?: boolean;
  question: QuestionRender;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  const answer_pupil = getPupilAnswer(question, { a_index, i_index });;
  const solution =  getQuestionSolution(question, { a_index, i_index });
  const text = is_view ? solution ?? "" : answer_pupil ?? "";

  return (
    <input
      disabled={exam_result ? true : false}
      className={`${className} ${classCheckResult(answer_pupil, is_view, solution, exam_result)}`}
      style={{ width: `${text.length > 0 ? (text.length === 1 ? 2 : text.length + 1) : 2}ch` }}
      value={is_view ? solution ?? "" : answer_pupil ?? ""}
      onChange={(e) => {
        onAnswerQuestion({ a_index, i_index }, e.target.value);
      }}
    />
  );
};

export default Input;
