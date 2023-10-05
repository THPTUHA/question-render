import { useMemo } from "react";
import { AnswerRender, ExamResult, ITEM_TYPE, S_ANSWER_CORRECT, S_ANSWER_WRONG, S_UNANSWER } from "question-convert";
import { QuestionRender } from "question-convert";
import FractionCH009 from "../components/FractionCH009";
import Selection from "../components/Selection";
import Text from "../components/Text";
import formatUnit from "../../helper/formatUnit";
import checkCorectSolution from "../../helper/checkCorectSolution";
import checkStatusAnswer from "../../helper/checkStatusAnswer";
import { onAnswerQuestion } from "../types";

const Answers = ({
  answer,
  is_view,
  a_index,
  question,
  exam_result,
  onAnswerQuestion,
}: {
  answer: AnswerRender,
  is_view?: boolean,
  a_index: number,
  question: QuestionRender,
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {

  const checkAns = useMemo(() => {
    let check_result = S_UNANSWER;
    let key = a_index + '#0';
    if (question.answer_pupil[key]) {
      if (question.answer_pupil[key] === question.solutions[key]) {
        check_result = S_ANSWER_CORRECT
      } else {
        check_result = S_ANSWER_WRONG
      }
    }
    return check_result;
  }, [question, a_index]);

  const format_data = (str: any) => {
    if (str && str.includes(')-')) {
      let txt = str.slice(1, str.length - 2).trim();
      return formatUnit(txt)
    };
    return formatUnit(str);
  }
  return (
    <div className={`flex-1  border-2 items-center 
                    border-dashed rounded-[10px] border-[#FF6700] 
                    py-2 px-10 m-2 ${exam_result && (!is_view ? checkStatusAnswer(checkAns) : checkCorectSolution(answer, 0, question))}`}>
      {answer.content.map((item: any, i_index: number) => {
        return (

          <span key={i_index} className=" text-xl">
            {item.type == ITEM_TYPE.TEXT &&
              typeof item.data == "string" && <Text str={format_data(item.data)} />}
            {item.type == ITEM_TYPE.INPUT && typeof item != "string" && (
              <span className="w-6 h-6 bg-gray-300 rounded inline-flex flex-col align-middle"></span>
            )}
            {item.type == ITEM_TYPE.FRACTION &&
              typeof item.data != "string" && (
                <span className=" mx-2">
                  <FractionCH009
                    item={item}
                    a_index={0}
                    i_index={0}
                    is_view={true}
                    question={question}
                    exam_result={exam_result}
                    onAnswerQuestion={onAnswerQuestion}
                  />
                </span>
              )}
          </span>
        )
      })}
    </div>
  )
};

const ChooseTrueFalse = ({
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
    <div className="px-10 pt-5">
      <div className="grid flex-row justify-items-end">
        <div className=" flex flex-row">
          <div className="mx-12 font-bold text-lg">Đúng</div>
          <div className=" font-bold text-lg">Sai</div>
        </div>
      </div>
      {question.answers.map((answer, a_index) => (
        <div key={a_index} className="flex items-center justify-between">
          <Answers
            question={question}
            answer={answer}
            is_view={is_view}
            a_index={a_index}
            exam_result={exam_result}
            onAnswerQuestion={onAnswerQuestion}
          />
          <div>
            {answer.content.map((_, i_index) => (
              <div key={i_index} className="flex flex-row">
                {i_index + 1 === answer.content.length && (
                  <div className="flex flex-row grow">
                    <div className=" items-center flex mx-12">
                      <Selection
                        id={'D'}
                        i_index={0}
                        a_index={a_index}
                        choose={"D"}
                        is_view={is_view}
                        question={question}
                        onAnswerQuestion={onAnswerQuestion}
                      />
                    </div>
                    <div className=" items-center flex">
                      <Selection
                        id={'S'}
                        i_index={0}
                        a_index={a_index}
                        choose={"S"}
                        is_view={is_view}
                        question={question}
                        onAnswerQuestion={onAnswerQuestion}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChooseTrueFalse;
