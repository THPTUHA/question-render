import React from "react";
import { FaCheck } from "react-icons/fa";
import { S_ANSWER_WRONG } from "question-convert";
import { ExamFunctions } from "../../store/exam/functions";
import { ExamHook } from "../../store/exam/hooks";

const getChecked = ({
  choose,
  status,
  answer_pupil,
  is_view,
  solution,
}: {
  choose?: string;
  status: number;
  answer_pupil?: string | null;
  is_view?: boolean;
  solution?: string | null;
}) => {
  if (choose) {
    if (is_view) {
      if (solution === choose) {
        return "border-primary s_answer_success text-green-500"; //dat them s_answer_success
      }
      return " text-transparent transition-all border-primary";
    }

    // Đáp án đã được check
    if (status) {
      // Hiển thị đáp án được chọn tương ứng với ô
      if (answer_pupil === choose) {
        if (answer_pupil === solution) return " text-green-500 border-green-500";
        return "text-red-500 border-red-500";
      }
    }

    if (answer_pupil === choose) {
      // console.log("CHECK--", status, answer_pupil, choose);
      return "border-primary";
    }
    return " text-transparent transition-all border-primary";
  }

  if (is_view) {
    if (solution) {
      return "border-primary s_answer_success text-green-500"; //dat them s_answer_success text-green-500
    }
    return " text-transparent transition-all border-primary";
  }

  if (status && answer_pupil != undefined) {
    if (
      answer_pupil === solution
    ) {
      // console.log("CHECKEDDD", answer_pupil, solution)
      return " text-green-500 border-green-500";
    }

    if (
      answer_pupil !== solution &&
      status === S_ANSWER_WRONG
    ) {
      if (answer_pupil) {
        return " text-red-500 border-red-500";
      }

      // return " text-transparent transition-all border-red-500"; //dat hide
    }
  }

  if (answer_pupil) {
    return "border-primary";
  }
  return " text-transparent transition-all border-primary";
};

const Selection = ({
  id,
  a_index,
  i_index,
  q_id,
  choose,
  is_view,
}: {
  id: string;
  a_index: number;
  i_index: number;
  q_id: number;
  choose?: string;
  is_view?: boolean;
}) => {

  const answer_pupil = ExamHook.useAnswerPupil({ a_index, i_index ,q_id});
  const solution = ExamHook.useSolution({ a_index, i_index, q_id });
  const status = ExamHook.useQuestionStatus(q_id);
  return (
    <div
      className={`flex h-8 w-8 items-center cursor-pointer 
                justify-center relative border-2 rounded-md 
                px-0.5 py-0.5 ${getChecked({
        choose,
        status,
        answer_pupil,
        is_view,
        solution,
      })}`}
      onClick={() => {
        ExamFunctions.answer(
          { a_index, i_index },
          choose !== undefined ? choose : id
        );
      }}
    >
      <input
        type="checkbox"
        className={`absolute left-0 opacity-0 top-0 `}
      // checked={choose !== undefined ? (
      //     answer_pupil == choose ? true : false
      // ) : !answer_pupil ? false : true}
      />
      <span
        className={`text-sm ${getChecked({
          choose,
          status,
          answer_pupil,
          is_view,
          solution,
        })}`}
      >
        <FaCheck />
      </span>
    </div>
  );
};

export default Selection;
