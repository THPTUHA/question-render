import React from 'react';
import { QuestionRender } from "question-convert";
import ItemAnswerClick from '../components/ItemAnswerClick';

const ClickAnswer = ({ question, is_view }: { question: QuestionRender, is_view?: boolean }) => {
  return (
    <div className="mt-5 px-10 flex flex-col self-center justify-center">
      {question.answers.map((answer, a_index) => {
          return (
              <React.Fragment key={a_index}>
                  <ItemAnswerClick is_view={is_view} question={question} a_index={a_index} answer={answer} />
              </React.Fragment>
          )
      })}
    </div>
  );
};

export default ClickAnswer;
