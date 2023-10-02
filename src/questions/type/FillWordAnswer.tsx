import React, { useMemo } from 'react';
import { ITEM_TYPE, S_ANSWER_CORRECT, S_ANSWER_WRONG, S_UNANSWER } from "question-convert";
import { QuestionRender } from "question-convert";
import AudioPlay from "../components/AudioPlay";
import Text from "../components/Text";
import InputWord from "../components/InputWord";
import { ExamHook } from '../../store/exam/hooks';
import checkCorectSolution from '../../helper/checkCorectSolution';
import checkStatusAnswer from '../../helper/checkStatusAnswer';

const Answers = ({ a_index, answer, is_view, q_id, question }: { a_index: any, answer: any, is_view: any, q_id: number, question: any }) => {
  // const questionCurrent: any = ExamHook.useQuestionCurrent();
  const result = ExamHook.useResult();
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
      className={`mb-5 grow border-2 border-dashed rounded-[10px] 
              border-[#FF6700] py-2 items-center px-4 mx-5 ${result && (!is_view ? checkStatusAnswer(checkAns) : checkCorectSolution(answer, a_index, question))}`}
    >
      {answer.content.map((item: any, i_index: any) => (
        <span key={i_index} className="">
          {item.type == ITEM_TYPE.AUDIO && typeof item.data == "string" && (
            <div className="mr-2 float-left">
              <AudioPlay url={item.data} />
            </div>
          )}
          {item.type == ITEM_TYPE.TEXT && typeof item.data == "string" && (
            <span className="">
              <Text str={item.data} />
            </span>
          )}
          {item.type == ITEM_TYPE.WORD && (
            <InputWord
              a_index={a_index}
              i_index={i_index}
              className="border-b-[1px] border-dashed text-center border-[#aaaaaa]"
              is_view={is_view}
              q_id={q_id}
            />
          )}
        </span>
      ))}
    </div>
  )
}

const FillWordAnswer = ({ question, is_view }: { question: QuestionRender, is_view?: boolean }) => {

  return (
    <div className=" justify-around mt-10 px-10">
      {question.answers.map((answer, a_index) => (
        <React.Fragment key={a_index}>
          <Answers question={question} answer={answer} a_index={a_index} is_view={is_view} q_id={question.id} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default FillWordAnswer;
