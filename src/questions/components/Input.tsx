import React from "react";
import classCheckResult from "../../helper/classCheckResult";
import { ExamFunctions } from "../../store/exam/functions";
import { ExamHook } from "../../store/exam/hooks";

const Input = ({
  a_index,
  i_index,
  q_id,
  className,
  is_view,
}: {
  a_index: number;
  i_index: number;
  className: any;
  is_view?: boolean;
  q_id: number;
}) => {
  const answer_pupil = ExamHook.useAnswerPupil({ a_index, i_index , q_id});
  const result = ExamHook.useResult();
  const solution = ExamHook.useSolution({ a_index, i_index, q_id });
  const text = is_view ? solution ?? "" : answer_pupil ?? "";

  return (
    <input
      disabled={result ? true : false}
      // className={`${className} ${
      //   is_view && solution
      //     ? ""
      //     : answer_pupil && status == S_ANSWER_CORRECT
      //     ? "border-2 border-green-500 "
      //     : status === S_ANSWER_WRONG
      //     ? " border-2 border-red-500 "
      //     : ""
      // } `}
      className={`${className} ${classCheckResult(answer_pupil, is_view, solution, result)}`}
      style={{ width: `${text.length > 0 ? (text.length === 1 ? 2 : text.length + 1) : 2}ch` }}
      value={is_view ? solution ?? "" : answer_pupil ?? ""}
      onChange={(e) => {
        ExamFunctions.answer({ a_index, i_index }, e.target.value);
      }}
    />
  );
};

export default Input;
