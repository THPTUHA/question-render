import React, { useMemo } from "react";
import { AnswerRender, ExamResult, ITEM_TYPE, QUESTION_TYPE, S_ANSWER_CORRECT, S_ANSWER_WRONG, S_UNANSWER } from "question-convert";
import { QuestionRender } from "question-convert";
import Fraction from "../components/Fraction";
import Input from "../components/Input";
import Image from "../components/Image";
import checkCorectSolution from "../../helper/checkCorectSolution";
import checkStatusAnswer from "../../helper/checkStatusAnswer";
import { onAnswerQuestion } from "../types";

const Answers = ({
  a_index,
  answer,
  is_view,
  question,
  exam_result,
  onAnswerQuestion,
}: {
  a_index: number,
  answer: AnswerRender,
  is_view?: boolean,
  question: QuestionRender,
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  const checkAns = useMemo(() => {
    let check_result = S_UNANSWER;
    answer.content.map((_: any, i_index: any) => {
      let key = a_index + '#' + i_index;
      if (question.type === QUESTION_TYPE.CH_004) {
        let key_0 = a_index + '#' + i_index + '#0';
        let key_1 = a_index + '#' + i_index + '#1';
        if (question.answer_pupil[key_0]) {
          if (question.answer_pupil[key_0] === question.solutions[key_0]) {
            check_result = S_ANSWER_CORRECT
          } else {
            check_result = S_ANSWER_WRONG
          }
        }
        if (question.answer_pupil[key_1]) {
          if (question.answer_pupil[key_1] === question.solutions[key_1]) {
            check_result = S_ANSWER_CORRECT
          } else {
            check_result = S_ANSWER_WRONG
          }
        }
      }
      if (question.answer_pupil[key]) {
        if (question.answer_pupil[key] === question.solutions[key]) {
          check_result = S_ANSWER_CORRECT
        } else {
          check_result = S_ANSWER_WRONG
        }
      }
    })
    return check_result;
  }, [a_index, answer, question]);

  return (
    <div
      key={a_index}
      className={`flex flex-row flex-wrap align-baseline border-2 
                  m-4 p-3 border-dashed rounded-[10px] 
                  border-[#FF6700] px-8 items-center ${exam_result && (!is_view ? checkStatusAnswer(checkAns) : checkCorectSolution(answer, a_index, question))}`}
    >
      {answer.content.map((item: any, i_index: number) => (
        <div
          key={i_index}
          className=" flex flex-row"
        >
          {item.type === ITEM_TYPE.IMG && typeof item.data === "string" && (
            <div className="flex justify-center h-60">
              <Image
                src={item.data}
                className=""
              />
            </div>
          )}
          {item.type === ITEM_TYPE.TEXT && typeof item.data === "string" && item.data !== ' ' && (
            <span className=" flex flex-row text-xl items-center min-w-[20px]">
              {/* <Text str={formatText(item.data)} /> */}
              {/* <Text str={item.data} /> */}
              {item.data.replace('</br>', '')}
            </span>
          )}
          {item.type === ITEM_TYPE.INPUT && (
            <div className=" mx-3">
              <Input
                className="border-2 text-center text-xl w-10 rounded-[5px]"
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                question={question}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
            </div>
          )}
          {item.type === ITEM_TYPE.FRACTION && (
            <div className="justify-center items-center mx-2">
              <Fraction
                item={item}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                question={question}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const FillExpression = ({
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
      className={` mt-10  ${question.answers.length < 4 ? "" : "grid grid-cols-2"
        }`}
    >
      {question.answers.map((answer, a_index) => {
        return (
          <React.Fragment key={a_index}>
            <Answers
              question={question}
              is_view={is_view}
              a_index={a_index}
              answer={answer}
              exam_result={exam_result}
              onAnswerQuestion={onAnswerQuestion}
            />
          </React.Fragment>
        )
      })}
    </div>
  );
};

export default FillExpression;
