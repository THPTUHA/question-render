import React from "react";
import {useState, useEffect} from 'react';
import { ExamFunctions } from "../../store/exam/functions";
import { ExamHook } from "../../store/exam/hooks";
import classCheckResult from '../../helper/classCheckResult';

const Input = ({
  a_index,
  i_index,
  q_id,
  className,
  is_view,
}: {
  a_index: number;
  i_index: number;
    q_id: number;
  className: any;
  is_view?: boolean;
}) => {
  const answer_pupil = ExamHook.useAnswerPupil({ a_index, i_index , q_id});
  const result = ExamHook.useResult();
  const solution = ExamHook.useSolution({ a_index, i_index, q_id });
  const [text, setText] = useState(is_view ? solution ?? "" : answer_pupil ?? "");

  useEffect(() => {
    if(is_view){
      setText(is_view ? solution ?? "" : answer_pupil ?? "");
    }
  }, [is_view, solution, answer_pupil]);
  
  return (
    <input
      disabled={result ? true : false}
      style={{width: `${text.length > 0 ? (text.length === 1 ? 1.2 : text.length) : 2}ch`, lineHeight: '21px', marginTop: '2px'}}
      className={`${className} ${classCheckResult(answer_pupil, is_view, solution, result)}`}
      value={is_view ? solution ?? "" : answer_pupil ?? ""}
      onChange={(e) => {
        setText(e.target.value);
        ExamFunctions.answer({ a_index, i_index }, e.target.value);
      }}
    />
  );
};

export default Input;