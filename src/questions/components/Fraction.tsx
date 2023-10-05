import { ExamResult, QuestionRender } from "question-convert";
import classCheckResult from "../../helper/classCheckResult";
import { onAnswerQuestion } from "../types";
import { getPupilAnswer, getQuestionSolution } from "../../utils";

const CheckTypeRender = ({
  dataItem,
  question,
  a_index,
  i_index,
  f_index,
  is_view,
  exam_result,
  onAnswerQuestion,
}: {
  dataItem: any;
  question: QuestionRender,
  a_index: number;
  i_index: number;
  f_index: number,
  is_view?: any;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  const answer_pupil = getPupilAnswer(question, { a_index, i_index, f_index });
  const solution = getQuestionSolution(question, { a_index, i_index, f_index });
  const text = is_view ? solution ?? "" : answer_pupil ?? "";

  return (
    <>
      {dataItem === "[]" ? (
        <div>
          <input
            disabled={exam_result ? true : false}
            type={"text"}
            style={{ width: `${text.length > 0 ? (text.length === 1 ? 2 : text.length + 1) : 2}ch` }}
            className={`border-2 rounded-[5px] text-xl text-center 
                        mb-1 bg-slate-200 ${classCheckResult(answer_pupil, is_view, solution, exam_result)}`}
            value={text}
            onChange={(e) => {
              onAnswerQuestion({ a_index, i_index, f_index }, e.target.value)
            }}
            autoFocus={question.focus === a_index + "#" + i_index + "#" + f_index}
          />
        </div>
      ) : (
        <p className="mx-1 center text-center">{dataItem}</p>
      )}
    </>
  );
};

const Fraction = ({
  item,
  question,
  a_index,
  i_index,
  is_view,
  exam_result,
  onAnswerQuestion,
}: {
  item: any;
  question: QuestionRender,
  a_index: number;
  i_index: number;
  is_view?: boolean;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {

  const RenderItem = () => {
    return (
      <span>
        {item?.data?.length === 2 ? (
          <span className=" flex flex-col relative justify-items-center items-center">
            <span className=" border-b-2 border-[black] mb-1">
              <CheckTypeRender
                question={question}
                dataItem={item.data[0]}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                f_index={0}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
            </span>
            <CheckTypeRender
              dataItem={item.data[1]}
              a_index={a_index}
              i_index={i_index}
              is_view={is_view}
              f_index={1}
              question={question}
              exam_result={exam_result}
              onAnswerQuestion={onAnswerQuestion}
            />
          </span>
        ) : (
          <div className=" flex items-center justify-center">
            <span className=" mr-1">
              <CheckTypeRender
                dataItem={item.data[0]}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                f_index={0}
                question={question}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
            </span>
            <div className="flex flex-col relative justify-items-center mr-4 items-center">
              <span className=" border-b-2 border-[black] mb-1">
                <CheckTypeRender
                  dataItem={item.data[1]}
                  a_index={a_index}
                  i_index={i_index}
                  is_view={is_view}
                  f_index={1}
                  question={question}
                  exam_result={exam_result}
                  onAnswerQuestion={onAnswerQuestion}
                />
              </span>
              <CheckTypeRender
                dataItem={item.data[2]}
                a_index={a_index}
                is_view={is_view}
                i_index={i_index}
                f_index={2}
                question={question}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
            </div>
          </div>
        )}
      </span>
    );
  };

  return (
    <div className="flex items-center justify-items-center">
      {Array.isArray(item.data) && <RenderItem />}
    </div>
  );
};

export default Fraction;
