import { ExamResult, ITEM_TYPE, Item } from "question-convert";
import { QuestionRender } from "question-convert";
import Image from "../components/Image";
import Input from "../components/Input";
import classCheckResult from "../../helper/classCheckResult";
import { Fragment } from "react";
import { onAnswerQuestion } from "../types";
import { getPupilAnswer, getQuestionSolution } from "../../utils";

const Answers = ({
  a_index,
  i_index,
  is_view,
  item,
  question,
  exam_result,
  onAnswerQuestion,
}: {
  a_index: number,
  i_index: number,
  is_view?: boolean,
  item: Item,
  question: QuestionRender,
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {

  const answer_pupil = getPupilAnswer(question, { a_index, i_index });;
  const solution =  getQuestionSolution(question, { a_index, i_index });
  return (
    <div className={`flex flex-col border-2 rounded-[10px] 
                      border-dashed border-[#FF6700] items-center 
                      mx-4 mt-10 ${classCheckResult(answer_pupil, is_view, solution, exam_result)}`}>
      <div className={`m-4 text-xl ${exam_result ? '' : 'border-2 rounded-[5px]'}`}>
        <Input
          a_index={a_index}
          i_index={i_index}
          className={`text-center w-9 ${exam_result ? 'border-2 rounded-[5px]' : ''}`}
          is_view={is_view}
          question={question}
          exam_result={exam_result}
          onAnswerQuestion={onAnswerQuestion}
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
  exam_result,
  onAnswerQuestion,
}: {
  question: QuestionRender;
  is_view?: boolean;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {

  return (
    <div className="flex flex-row mt-6 justify-center">
      {question.answers.map((answer, a_index) => (
        <div key={a_index} className="flex flex-row">
          {answer.content.map((item, i_index) => (
            <div key={i_index} className="flex flex-auto">
              {item.type == ITEM_TYPE.IMG && (
                <Fragment>
                  <Answers
                    a_index={a_index}
                    i_index={i_index}
                    is_view={is_view}
                    item={item}
                    question={question}
                    exam_result={exam_result}
                    onAnswerQuestion={onAnswerQuestion}
                  />
                </Fragment>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FillInputImage;
