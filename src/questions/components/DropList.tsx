import { ExamResult, Item, QuestionRender } from "question-convert";
import classCheckResult from "../../helper/classCheckResult";
import { onAnswerQuestion } from "../types";
import { getPupilAnswer, getQuestionSolution } from "../../utils";

const DropList = ({
  options,
  question,
  a_index,
  i_index,
  is_view,
  className,
  exam_result,
  onAnswerQuestion
}: {
  options: Item;
  question: QuestionRender,
  a_index: number;
  i_index: number;
  is_view?: boolean;
  className: string;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  const answer_pupil = getPupilAnswer(question, { a_index, i_index });;
  const solution =  getQuestionSolution(question, { a_index, i_index });
  return (
    <select
      // disabled={exam_result ? true : false}
      value={is_view ? solution ?? "" : answer_pupil ?? ""}
      // className="focus:outline-none text-xl border-2 rounded-[5px] mx-2 items-center justify-center flex"
      // className={`focus:outline-none text-xl border-2 rounded-[5px] mx-2 items-center justify-center ${getChecked({ status, answer_pupil, solution, is_view })}`}
      className={`${answer_pupil ? 'select-hide-arrow' : ''} focus:outline-none text-xl border-2 
                  rounded-[5px] mx-2 items-center 
                  justify-center ${classCheckResult(answer_pupil, is_view, solution, exam_result)} ${className}`}
      onChange={(e) => {
        onAnswerQuestion({ a_index, i_index }, e.target.value);
      }}
    >
      <option value=""></option>
      {Array.isArray(options.data)
        ? options.data.map((item, key) => (
          <option value={item} key={key}>
            {item}
          </option>
        ))
        : ""}
    </select>
  );
};

export default DropList;
