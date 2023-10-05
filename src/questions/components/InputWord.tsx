import { useState, useEffect } from 'react';
import classCheckResult from '../../helper/classCheckResult';
import { ExamResult, QuestionRender } from 'question-convert';
import { onAnswerQuestion } from '../types';
import { getPupilAnswer, getQuestionSolution } from '../../utils';

const Input = ({
  a_index,
  i_index,
  question,
  className,
  is_view,
  exam_result,
  onAnswerQuestion,
}: {
  a_index: number;
  i_index: number;
  question: QuestionRender;
  className: any;
  is_view?: boolean;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  const answer_pupil = getPupilAnswer(question, { a_index, i_index });;
  const solution =  getQuestionSolution(question, { a_index, i_index });
  const [text, setText] = useState(is_view ? solution ?? "" : answer_pupil ?? "");

  useEffect(() => {
    if (is_view) {
      setText(is_view ? solution ?? "" : answer_pupil ?? "");
    }
  }, [is_view, solution, answer_pupil]);

  return (
    <input
      disabled={exam_result ? true : false}
      style={{ width: `${text.length > 0 ? (text.length === 1 ? 1.2 : text.length) : 2}ch`, lineHeight: '21px', marginTop: '2px' }}
      className={`${className} ${classCheckResult(answer_pupil, is_view, solution, exam_result)}`}
      value={is_view ? solution ?? "" : answer_pupil ?? ""}
      onChange={(e) => {
        setText(e.target.value);
        onAnswerQuestion({ a_index, i_index }, e.target.value);
      }}
    />
  );
};

export default Input;