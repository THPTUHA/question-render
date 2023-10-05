import {
  AnswerRender,
  ExamResult,
  ITEM_TYPE,
  QuestionRender,
  S_ANSWER_WRONG,
} from "question-convert";
import AudioPlay from "./AudioPlay";
import Fraction from "./Fraction";
import Text from "./Text";
import Selection from "./Selection";
import formatUnit from "../../helper/formatUnit";
import { onAnswerQuestion } from "../types";
import { getPupilAnswer, getQuestionSolution } from "../../utils";

const setColorAnswer = ({
  status,
  answer_pupil,
  is_view,
  solution,
}: {
  status: number;
  answer_pupil?: string | null;
  is_view?: boolean;
  solution?: string | null;
}) => {
  if (status && !is_view && answer_pupil !== undefined) {
    if (answer_pupil === solution) {
      return "s_answer_success";
    }

    if (solution === undefined && status === S_ANSWER_WRONG) {
      return " s_answer_wrong border-[#ef4444]";
    }
  }
  if (is_view && solution) {
    return "s_answer_success";
  }
  return " border-[#FF6700]  border-dashed";
};

const ItemAnswerCh010 = ({
  a_index,
  i_index,
  is_view,
  question,
  answer,
  exam_result,
  onAnswerQuestion,
}: {
  id: string;
  a_index: number;
  i_index: number;
  choose?: string;
  is_view?: boolean;
  question: QuestionRender;
  answer: AnswerRender;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  const answer_pupil = getPupilAnswer(question,{ a_index, i_index });
  const solution = getQuestionSolution(question,{ a_index, i_index });

  return (
    <div
      key={a_index}
      className={`mb-5 flex grow border-2 rounded-[10px] py-2 items-center px-4 mx-5 border-[#FF6700] ${setColorAnswer(
        {
          status: question.status,
          answer_pupil,
          is_view,
          solution,
        }
      )}`}
    >
      <span className="">
        {answer.content.length > 0 && (
          <Selection
            id={answer.id}
            a_index={a_index}
            i_index={0}
            is_view={is_view}
            question={question}
            onAnswerQuestion={onAnswerQuestion}
          />
        )}
      </span>

      {answer.content.map((item: any, i_index: any) => (
        <div key={i_index} className="">
          {item.type == ITEM_TYPE.AUDIO && typeof item.data == "string" && (
            <div>
              <AudioPlay url={item.data} />
            </div>
          )}
          {item.type == ITEM_TYPE.TEXT && typeof item.data == "string" && (
            <div className=" text-xl text-black items-center justify-center flex pl-2 ml-2">
              <Text str={formatUnit(item.data)} />
            </div>
          )}

          {typeof item.data != "string" && item.type == ITEM_TYPE.FRACTION && (
            <div className=" text-lg ml-2 text-black">
              <Fraction
                item={item}
                a_index={0}
                i_index={0}
                is_view={true}
                question={question}
                exam_result={exam_result}
                onAnswerQuestion={onAnswerQuestion}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemAnswerCh010;
