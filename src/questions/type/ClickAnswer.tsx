import React from 'react';
import { ExamResult, QuestionRender } from "question-convert";
import ItemAnswerClick from '../components/ItemAnswerClick';
import { onAnswerQuestion } from '../types';

const ClickAnswer = ({
  question,
  is_view,
  exam_result,
  onAnswerQuestion,
}: {
  question: QuestionRender,
  is_view?: boolean,
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}) => {
  return (
    <div className="mt-5 px-10 flex flex-col self-center justify-center">
      {question.answers.map((answer, a_index) => {
        return (
          <React.Fragment key={a_index}>
            <ItemAnswerClick
              is_view={is_view}
              question={question}
              a_index={a_index}
              answer={answer}
              exam_result={exam_result}
              onAnswerQuestion={onAnswerQuestion}
            />
          </React.Fragment>
        )
      })}
    </div>
  );
};

export default ClickAnswer;
