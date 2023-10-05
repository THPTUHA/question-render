import React, { useMemo } from "react";
import {
  AnswerRender,
  ExamResult,
  ITEM_TYPE,
  S_ANSWER_CORRECT,
  S_ANSWER_WRONG,
  S_UNANSWER,
} from "question-convert";
import { QuestionRender } from "question-convert";
import DropList from "../components/DropList";
import Image from "../components/Image";
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
  a_index: number;
  answer: AnswerRender;
  is_view?: boolean;
  question: QuestionRender;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  const checkAns = useMemo(() => {
    let check_result = S_UNANSWER;
    answer.content.map((_: any, i_index: any) => {
      let key = a_index + "#" + i_index;
      if (question.answer_pupil[key]) {
        if (
          question.answer_pupil[key] === question.solutions[key]
        ) {
          check_result = S_ANSWER_CORRECT;
        } else {
          check_result = S_ANSWER_WRONG;
        }
      }
    });
    return check_result;
  }, [a_index, answer, question]);

  return (
    <div
      key={a_index}
      className={`flex-1 flex-col p-5 m-2 border-2 
                border-dashed rounded-[10px] justify-end
                border-[#FF6700] ${exam_result &&
        (!is_view
          ? checkStatusAnswer(checkAns)
          : checkCorectSolution(answer, a_index, question))
        }`}
    >
      {answer.content.map((item: any, i_index: number) => (
        <div key={i_index} className=" flex flex-col items-center">
          {item.type == ITEM_TYPE.IMG && typeof item.data == "string" && (
            <Image src={item.data} className="" />
          )}
        </div>
      ))}
      <div className="flex flex-wrap border-t-2 pt-3 justify-center">
        {answer.content.map((item: any, i_index: number) => (
          <div key={i_index} className=" items-center flex justify-center">
            {item.type == ITEM_TYPE.DROP_LIST && (
              <DropList
                options={item}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                className={"text-lg mx-1"}
                question={question}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
            )}
            {item.type == ITEM_TYPE.TEXT && typeof item.data == "string" && (
              <div className="text-ml">
                <Text str={item.data.replace("</br>", "")} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const DropListImage = ({
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
    <div className="flex flex-row mt-5 min-w-[600px] justify-center">
      {question.answers.map((answer, a_index) => (
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
      ))}
    </div>
  );
};

export default DropListImage;
