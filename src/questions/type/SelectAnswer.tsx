import { ExamResult, QUESTION_TYPE } from "question-convert";
import { QuestionRender } from "question-convert";
import ItemAnswerSelect from "../components/ItemAnswerSelect";
import ItemAnswerSelectCH010 from "../components/ItemAnswerSelectCH010";
import { Fragment } from "react";
import { onAnswerQuestion } from "../types";

const SelectAnswer = ({
  question,
  is_view,
  exam_result,
  onAnswerQuestion,
}: {
  question: QuestionRender;
  is_view?: boolean;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  return (
    <div
      className={` justify-around mt-10 px-10 ${question.answers.length < 4 ? "" : "grid grid-cols-2"
        }`}
    >
      {question.answers.map((answer, a_index) => (
        <Fragment key={a_index}>
          {[QUESTION_TYPE.CH_010, QUESTION_TYPE.CH_006].includes(question.type) ? (
            <ItemAnswerSelectCH010
              id={answer.id}
              a_index={a_index}
              i_index={0}
              is_view={is_view}
              answer={answer}
              question={question}
              exam_result={exam_result}
              onAnswerQuestion={onAnswerQuestion}
            />
          ) : (
            <ItemAnswerSelect
              id={answer.id}
              a_index={a_index}
              i_index={0}
              is_view={is_view}
              answer={answer}
              question={question}
              exam_result={exam_result}
              onAnswerQuestion={onAnswerQuestion}
            />
          )}

        </Fragment>
      ))}
    </div>
  );
};

export default SelectAnswer;
