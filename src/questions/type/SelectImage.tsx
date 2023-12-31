import React, { useMemo } from "react";
import { AnswerRender, ExamResult, ITEM_TYPE, S_ANSWER_CORRECT, S_ANSWER_WRONG, S_UNANSWER } from "question-convert";
import { QuestionRender } from "question-convert";
import AudioPlay from "../components/AudioPlay";
import Image from "../components/Image";
import Selection from "../components/Selection";
import Text from "../components/Text";
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
      className={`border-2 border-dashed rounded-[10px] 
                  border-[#FF6700] mx-2 mt-10 p-3 flex 
                  flex-col ${exam_result && (!is_view ? checkStatusAnswer(checkAns) : checkCorectSolution(answer, a_index, question))}`}
    >
      {answer.content.length > 0 && (
        <div className="w-10 h-10">
          <Selection
            id={answer.id}
            a_index={a_index}
            i_index={0}
            is_view={is_view}
            question={question}
            onAnswerQuestion={onAnswerQuestion}
          />
        </div>
      )}
      {answer.content.map((item: any, i_index: number) => (
        <div key={i_index}>
          {item.type == ITEM_TYPE.IMG && typeof item.data == "string" && (
            <div className={"flex justify-center"}>
              <Image
                src={item.data}
                className={""}
              />
            </div>
          )}

          {item.type == ITEM_TYPE.AUDIO && typeof item.data == "string" && (
            <div className=" border-t-2 pt-2 mt-2 justify-center flex">
              <AudioPlay url={item.data} />
            </div>
          )}

          {item.type == ITEM_TYPE.TEXT && typeof item.data == "string" && (
            <div className=" justify-center flex text-2xl">
              <Text str={item.data} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const SelectImage = ({
  question,
  is_view,
  exam_result,
  onAnswerQuestion,
}: {
  question: QuestionRender,
  is_view?: boolean,
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  return (
    <div className="grid sm:grid-cols-4 xl:grid-cols-4 flex flex-row justify-center">
      {question.answers.map((answer, a_index) => {
        return (
          <React.Fragment key={a_index}>
            <Answers
              question={question}
              a_index={a_index}
              answer={answer}
              is_view={is_view}
              exam_result={exam_result}
              onAnswerQuestion={onAnswerQuestion}
            />
          </React.Fragment>
        )
      })}
    </div>
  );
};

export default SelectImage;
