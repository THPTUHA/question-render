import {
  AnswerRender,
  ExamResult,
  ITEM_TYPE,
  QuestionRender,
  S_ANSWER_WRONG,
} from "question-convert";
import AudioPlay from "./AudioPlay";
import FractionCH009 from "./FractionCH009";
import Text from "./Text";
import SelectionCH010 from "./SelectionCH010";
import formatUnit from "../../helper/formatUnit";
import { getPupilAnswer, getQuestionSolution } from "../../utils";
import { onAnswerQuestion } from "../types";

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


    if (
      solution === undefined &&
      status === S_ANSWER_WRONG
    ) {
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
  exam_result: ExamResult | null,
  onAnswerQuestion: onAnswerQuestion
}) => {
  const answer_pupil = getPupilAnswer(question, { a_index, i_index });
  const solution = getQuestionSolution(question, { a_index, i_index });

  const format_data = (str: any) => {
    if (str && str.includes(')-')) {
      let txt = str.slice(1, str.length - 2).trim();
      return formatUnit(txt)
    };
    return formatUnit(str);
  }

  return (
    <div
      key={a_index}
      className={`mb-5 flex border-2 rounded-[10px] py-2 items-center px-4 mx-5 border-[#FF6700] ${setColorAnswer(
        {
          status: question.status,
          answer_pupil,
          is_view,
          solution,
        }
      )}`}
    >
      {answer.content.length > 0 && (
        <div>
          <SelectionCH010
            question={question}
            id={answer.id}
            a_index={a_index}
            i_index={0}
            is_view={is_view}
            onAnswerQuestion={onAnswerQuestion}
          />
        </div>
      )}
      <span className="inline-table ml-3">
        {answer.content.map((item: any, i_index: any) => (
          <span key={i_index} className="">
            {item.type == ITEM_TYPE.AUDIO && typeof item.data == "string" && (
              <div>
                <AudioPlay url={item.data} />
              </div>
            )}
            {item.type == ITEM_TYPE.TEXT && typeof item.data == "string" && item.data != ' ' && (
              <span className=" text-xl text-black items-center text-center justify-center  mx-1">
                <Text str={format_data(item.data)} />
              </span>
            )}

            {typeof item.data != "string" && item.type == ITEM_TYPE.FRACTION && (
              <span className=" text-lg text-black mx-1">
                <FractionCH009
                  exam_result={exam_result}
                  item={item}
                  a_index={0}
                  i_index={0}
                  is_view={true}
                  question={question}
                  onAnswerQuestion={onAnswerQuestion}
                />
              </span>
            )}
          </span>
        ))}
      </span>
    </div>
  );
};

export default ItemAnswerCh010;
