import React from "react";
import { ExamFunctions } from "../../store/exam/functions";
import { ExamHook } from "../../store/exam/hooks";
import { Item } from "question-convert";
import classCheckResult from "../../helper/classCheckResult";

const DropList = ({
  options,
  q_id,
  a_index,
  i_index,
  is_view,
  className,
}: {
  q_id: number,
  options: Item;
  a_index: number;
  i_index: number;
  is_view?: boolean;
  className?: any;
}) => {
  const answer_pupil: any = ExamHook.useAnswerPupil({ a_index, i_index , q_id});
  const solution = ExamHook.useSolution({ a_index, i_index , q_id });
  const result = ExamHook.useResult();
  return (
    <select
      // disabled={result ? true : false}
      value={is_view ? solution ?? "" : answer_pupil ?? ""}
      // className="focus:outline-none text-xl border-2 rounded-[5px] mx-2 items-center justify-center flex"
      // className={`focus:outline-none text-xl border-2 rounded-[5px] mx-2 items-center justify-center ${getChecked({ status, answer_pupil, solution, is_view })}`}
      className={`${answer_pupil ? 'select-hide-arrow' : ''} focus:outline-none text-xl border-2 
                  rounded-[5px] mx-2 items-center 
                  justify-center ${classCheckResult(answer_pupil, is_view, solution, result)} ${className}`}
      onChange={(e) => {
        ExamFunctions.answer({ a_index, i_index }, e.target.value);
      }}
    >
      <option value=""></option>
      {Array.isArray(options.data)
        ? options.data.map((item, key) => (
            <option value={item} key={key}>
              {item}
            </option>
          ))
        : ""}
    </select>
  );
};

export default DropList;
