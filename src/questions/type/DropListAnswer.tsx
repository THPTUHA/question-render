import React, { useMemo } from "react";
import { ITEM_TYPE, S_ANSWER_CORRECT, S_ANSWER_WRONG, S_UNANSWER } from "question-convert";
import { ExamHook } from "../../store/exam/hooks";
import { QuestionRender } from "question-convert";
import AudioPlay from "../components/AudioPlay";
import DropList from "../components/DropList";
import Text from "../components/Text";
import checkCorectSolution from "../../helper/checkCorectSolution";
import checkStatusAnswer from "../../helper/checkStatusAnswer";

const Answers = ({ a_index, answer, is_view, q_id, question }: { a_index: any, answer: any, is_view: any, q_id :number, question: any}) => {
  // const questionCurrent: any = ExamHook.useQuestionCurrent();
  const result = ExamHook.useResult();
  const checkAns = useMemo(() => {
    let check_result = S_UNANSWER;
    answer.content.map((_: any, i_index: any) => {
      let key = a_index + '#' + i_index;
      if(question.answer_pupil[key]){
        if(question.answer_pupil[key] === question.solutions[key]){
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
      className={`flex-row border-2 mx-20 mt-10 p-5 
                  border-dashed rounded-[10px] 
                  border-[#FF6700] ${result && (!is_view ? checkStatusAnswer(checkAns) : checkCorectSolution(answer, a_index, question))}`}
    >
      {answer.content.map((item: any, i_index: number) => (
        <span key={i_index} className="leading-9">
          {item.type == ITEM_TYPE.AUDIO &&
            typeof item.data == "string" && (
              <AudioPlay className="inline" classNameImage="inline" url={item.data} />
            )}
          {item.type == ITEM_TYPE.TEXT &&
            typeof item.data == "string" && (
              <span className="text-xl">
                <Text str={item.data} />
              </span>
            )}
          {item.type == ITEM_TYPE.DROP_LIST && (
            <span className="">
              <DropList
                options={item}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                q_id={q_id}
              />
            </span>
          )}
        </span>
      ))}
    </div>
  )
}

const DropListAnswer = ({
  question,
  is_view,
}: {
  question: QuestionRender;
  is_view?: boolean;
}) => {
  return (
    <div className="">
      {
        // Answers chỉ có 1 phần tử
        question.answers.map((answer, a_index) => (
          <React.Fragment key={a_index}>
            <Answers question={question} a_index={a_index} answer={answer} is_view={is_view} q_id={question.id} />
          </React.Fragment>
        ))
      }
    </div>
  );
};

export default DropListAnswer;
