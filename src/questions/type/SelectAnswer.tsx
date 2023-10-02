import React from "react";
import { QUESTION_TYPE } from "question-convert";
import { QuestionRender } from "question-convert";
import ItemAnswerSelect from "../components/ItemAnswerSelect";
import ItemAnswerSelectCH010 from "../components/ItemAnswerSelectCH010";

const SelectAnswer = ({
  question,
  is_view,
}: {
  question: QuestionRender;
  is_view?: boolean;
}) => {
  return (
    <div
      className={` justify-around mt-10 px-10 ${
        question.answers.length < 4 ? "" : "grid grid-cols-2"
      }`}
    >
      {question.answers.map((answer, a_index) => (
        <React.Fragment key={a_index}>
          {[QUESTION_TYPE.CH_010, QUESTION_TYPE.CH_006].includes(question.type) ? (
             <ItemAnswerSelectCH010
              id={answer.id}
              a_index={a_index}
              i_index={0}
              is_view={is_view}
              answer={answer}
              q_id={question.id}
            />
          ) : (
            <ItemAnswerSelect
              id={answer.id}
              a_index={a_index}
              i_index={0}
              is_view={is_view}
              answer={answer}
              q_id={question.id}
            />
          )}
         
        </React.Fragment>
      ))}
    </div>
  );
};

export default SelectAnswer;
