import React from "react";
import { useMemo } from "react";
import { ExamHook } from "../../store/exam/hooks";
import { QuestionRender } from "question-convert";
import { QUESTION_TYPE } from "question-convert";
import classCheckResult from "../../helper/classCheckResult";

const DropAnswer = ({
    a_index,
    i_index,
    is_view,
    on_click_drop,
    answer_content,
    question
  }: {
    a_index: number;
    i_index: number;
    is_view?: boolean;
    on_click_drop?: any;
    answer_content?: any;
    question: QuestionRender;
  }) => {
  const answer_pupil = ExamHook.useAnswerPupil({ a_index, i_index , q_id: question.id});
  const solution = ExamHook.useSolution({ a_index, i_index, q_id: question.id  });
    const result = ExamHook.useResult();

    const handleValue = (value: any) => {
      if ([QUESTION_TYPE.TA_014, QUESTION_TYPE.TV_014].includes(question.type)){
        let tmp_value = value?.split('_')?.[0];
        return tmp_value;
      }
      return value;
    }

    const getTextByResult = (list: any, result: any) => {
      let tmp_value_text = '';
      list.map((o: any) => {
        let tmp_value_num = o?.split('_')?.[0];
        if ([QUESTION_TYPE.TV_014, QUESTION_TYPE.TA_014].includes(question.type)){
          let tmp_result_value_num = result?.split('_')?.[0];
          // if(tmp_value_num == tmp_result_value_num && tmp_result_value_key == key){
          if(tmp_value_num == tmp_result_value_num){
            tmp_value_text = o?.split('_')?.[1];
          }
        } else if([QUESTION_TYPE.TV_007, QUESTION_TYPE.TA_007].includes(question.type)){
          if((tmp_value_num + '_' + a_index) == result){
            tmp_value_text = o?.split('_')?.[1];
          }
        } 
        else {
          if(tmp_value_num == result){
            tmp_value_text = o?.split('_')?.[1];
          }
        }
      })
      return tmp_value_text;
    }

    const viewAnswer = useMemo(() => {//lấy mảng danh sách câu hỏi (array keyVal)
      let tmpListAnwers = [];
      let tmpAnswer;
      let space_default = <span>&emsp;&emsp;&emsp;&emsp;&emsp;</span>;
      if (question.type === QUESTION_TYPE.TA_014){
        space_default = <span>&nbsp;&nbsp;</span>
      }
      if(answer_content){//lấy ds câu trả lời ở cuối mảng answers
        tmpListAnwers = answer_content?.[answer_content?.length - 1]?.data;
      }
      if(is_view){//xem kết quả đúng
        tmpAnswer = solution ? getTextByResult(tmpListAnwers, solution) : space_default;
      }else {//kết quả làm bài
        tmpAnswer = answer_pupil ? getTextByResult(tmpListAnwers, answer_pupil) : space_default;
      }
      return tmpAnswer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answer_content, answer_pupil, is_view, solution]);
  if (question.type === QUESTION_TYPE.TA_014){
      return (
        <span 
          style={{
            padding: '0.3rem',
            cursor: 'pointer',
            lineHeight: '45px',
            paddingLeft: '0.6rem',
            paddingRight: '0.6rem'
          }} 
          onClick={() => {
            on_click_drop();
          }}
          className={`h-8 w-10 rounded-[10px] mr-2 border-[#FF6700] border-dashed border-2 ${classCheckResult(handleValue(answer_pupil), is_view, handleValue(solution), result)}`}>
            {viewAnswer}
        </span>
      )
    }else if(question.type === QUESTION_TYPE.TA_008 || 
      question.type === QUESTION_TYPE.TV_008) {
      return (
        <span 
          style={{
            padding: '0.3rem',
            cursor: 'pointer',
            // lineHeight: '45px',
            paddingLeft: '0.6rem',
            paddingRight: '0.6rem'
          }} 
          onClick={() => {
            on_click_drop();
          }}
          className={` display-inline-block mb-2 rounded-[10px] mr-2 border-[#FF6700] border-dashed border-2 ${classCheckResult(handleValue(answer_pupil), is_view, handleValue(solution), result)}`}>
            {viewAnswer}
        </span>
      )
    } else {
      return (
        <span 
          style={{
            padding: '0.3rem',
            cursor: 'pointer',
            lineHeight: '45px',
            paddingLeft: '0.6rem',
            paddingRight: '0.6rem'
          }} 
          onClick={() => {
            on_click_drop();
          }}
          className={` mb-2 rounded-[10px] mr-2 border-[#FF6700] border-dashed border-2 ${classCheckResult(handleValue(answer_pupil), is_view, handleValue(solution), result)}`}>
            {viewAnswer}
        </span>
      )
    }
  }

export default DropAnswer;