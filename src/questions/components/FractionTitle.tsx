import { ExamResult, QuestionRender } from "question-convert";
import classCheckResult from "../../helper/classCheckResult";
import formatUnit from "../../helper/formatUnit";
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
  is_view?: boolean;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  const answer_pupil = getPupilAnswer(question, {a_index, i_index, f_index});
  const solution = getQuestionSolution(question, { a_index, i_index, f_index });
  const text = is_view ? solution ?? "" : answer_pupil ?? "";

  return (
    <>
      {dataItem === "[]" ? (
        <span className="center">
          <input
            disabled={exam_result ? true : false}
            type={"text"}
            style={{ width: `${text.length > 0 ? (text.length === 1 ? 2 : text.length + 1) : 2}ch` }}
            className={`border-2 rounded-[5px] h-[24px] text-xl text-center 
                         bg-slate-200 ${classCheckResult(answer_pupil, is_view, solution, exam_result)}`}
            value={text}
            onChange={(e) => {
              onAnswerQuestion({ a_index, i_index, f_index }, e.target.value)
            }}
            autoFocus={question.focus === a_index + "#" + i_index + "#" + f_index}
          />
        </span>
      ) : (
        <span className="mx-1 center text-center text-[24px]">{dataItem}</span>
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

  const format_data = (str: any) => {
    if (str && str.includes(')-')) {
      let txt = str.slice(1, str.length - 2).trim();
      return formatUnit(txt)
    };
    return formatUnit(str);
  }

  const RenderItem = () => {
    return (
      <>
        {item?.data?.length === 2 ? (
          <span className="inline-flex flex-col align-middle text-xl">
            <CheckTypeRender
              dataItem={format_data(item.data[0])}
              a_index={a_index}
              i_index={i_index}
              is_view={is_view}
              f_index={0}
              question={question}
              exam_result={exam_result}
              onAnswerQuestion={onAnswerQuestion}
            />
            <span className="border-t-2 border-t-solid border-[#243c5a] center">
              <CheckTypeRender
                dataItem={format_data(item.data[1])}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                f_index={1}
                question={question}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
            </span>
          </span>
        ) : (
          <span className="">
            <span className=" mr-1">
              <CheckTypeRender
                dataItem={format_data(item.data[0])}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                f_index={0}
                question={question}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
            </span>
            <span className="inline-flex flex-col align-middle text-xl">
              <CheckTypeRender
                dataItem={format_data(item.data[1])}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                f_index={1}
                question={question}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
              <span className="border-t-2 border-t-solid border-[#243c5a] center">
                <CheckTypeRender
                  dataItem={(item.data[2])}
                  a_index={a_index}
                  i_index={i_index}
                  is_view={is_view}
                  f_index={2}
                  question={question}
                  exam_result={exam_result}
                  onAnswerQuestion={onAnswerQuestion}
                />
              </span>
            </span>
          </span>
        )}
      </>
    );
  };

  return (
    <span className="">
      {Array.isArray(item.data) && <RenderItem />}
    </span>
  );
};

export default Fraction;
