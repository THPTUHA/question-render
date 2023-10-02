import React from "react";
import { ITEM_TYPE } from "question-convert";
import { ExamHook } from "../../store/exam/hooks";
import { QuestionRender } from "question-convert";
import Image from "../components/Image";
import Input from "../components/Input";
import classCheckResult from "../../helper/classCheckResult";

const Answers = ({ a_index, i_index, is_view, item, q_id } : 
  { a_index: any, i_index: any, is_view: any, item: any, q_id : number}) => {
  const result = ExamHook.useResult();
  const answer_pupil = ExamHook.useAnswerPupil({ a_index, i_index , q_id});
  const solution = ExamHook.useSolution({ a_index, i_index , q_id});
  return (
    <div className={`flex flex-col border-2 rounded-[10px] 
                      border-dashed border-[#FF6700] items-center 
                      mx-4 mt-10 ${classCheckResult(answer_pupil, is_view, solution, result)}`}>
      <div className={`m-4 text-xl ${result ? '' : 'border-2 rounded-[5px]'}`}>
        <Input
          a_index={a_index}
          i_index={i_index}
          className={`text-center w-9 ${result ? 'border-2 rounded-[5px]' : ''}`}
          is_view={is_view}
          q_id={q_id}
        />
      </div>
      <div className=" h-30 flex justify-center m-3">
        {typeof item.data == "string" && (
          <Image src={item.data} className=" h-23" />
        )}
      </div>
    </div>
  )
}

const FillInputImage = ({
  question,
  is_view,
}: {
  question: QuestionRender;
  is_view?: boolean;
}) => {

  return (
    <div className="flex flex-row mt-6 justify-center">
      {question.answers.map((answer, a_index) => (
        <div key={a_index} className="flex flex-row">
          {answer.content.map((item, i_index) => (
            <div key={i_index} className="flex flex-auto">
              {item.type == ITEM_TYPE.IMG && (
                <React.Fragment>
                  <Answers a_index={a_index} i_index={i_index} is_view={is_view} item={item} q_id={question.id} />
                </React.Fragment>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FillInputImage;
