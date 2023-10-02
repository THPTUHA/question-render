import React, {useMemo, useState} from "react";
import {
  ITEM_TYPE,
  QUESTION_TYPE,
  S_ANSWER_CORRECT,
  S_ANSWER_WRONG,
  S_UNANSWER,
} from "question-convert";
import { ExamHook } from "../../store/exam/hooks";
import Text from "./Text";
import DropAnswer from "./DropAnswer";
import { ExamFunctions } from "../../store/exam/functions";
import lodash from 'lodash';
import checkCorectSolution from "../../helper/checkCorectSolution";
import checkStatusAnswer from "../../helper/checkStatusAnswer";

//item answer
const AnswerItem = ({
  value, 
  onClick, 
  activeKey, 
  index
} : {
  value?: string, 
  onClick: any, 
  activeKey: number, 
  index: number
}) => {
  return (
      <span  
          style={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              margin: '0.3rem',
              display: 'flex',
              cursor: 'pointer',
              backgroundColor: activeKey === index ? 'orange' : 'white'
          }}
          onClick={onClick}
          className={`border-2 border-dashed rounded-[10px] border-[#FF6700]`}>
          {value}
      </span>
  )
}

const DEFAULT_INFO_CLICK_SELECTED = {
  answer_value: '', 
  answer_key: '',
  question_id: ''
}
const ItemAnswerClick = ({
  a_index,
  is_view,
  answer,
  question
}: {
  a_index: number,
  is_view?: boolean;
  answer: any;
  question: any;
}) => {
  
  const result = ExamHook.useResult();
  const [infoClickSeleted, setInfoClickSeleted] = useState<{answer_value: any;
                                                            answer_key: any;
                                                            question_id: any;}>(DEFAULT_INFO_CLICK_SELECTED);
                                                            
  const checkAns = useMemo(() => {
    let check_result: any = '';
    let hasData = false;
    Object.values(question.answer_pupil).map(item => {
      if(item){//nếu có đáp án được điền
        hasData = true;
      }
    })
    if(hasData){//nếu đã trả lời ít nhất 1 câu
      if([QUESTION_TYPE.TA_014, QUESTION_TYPE.TV_014].includes(question.type)){
        let answer_pupil_list = Object.values(question.answer_pupil).map((o: any) => {
          let tmp_value = o?.split('_')?.[0];
          return tmp_value;
        });
        let solutions_list = Object.values(question.solutions).map((o: any) => {
          let tmp_value = o?.split('_')?.[0];
          return tmp_value;
        });
        if(lodash.isEqual(answer_pupil_list, solutions_list)){
          check_result = S_ANSWER_CORRECT;
        } else {
          check_result = S_ANSWER_WRONG;
        }
      } else {
        if(lodash.isEqual(question.answer_pupil, question.solutions)){
          check_result = S_ANSWER_CORRECT;
        } else {
          check_result = S_ANSWER_WRONG;
        }
      }
    } else {//nếu không trả lời đáp án nào
      return S_UNANSWER;
    }
    return check_result;
  }, [question]);

  //hàm xử lý khi click/doubleClick vào câu trả lời
  const handleDragAnswer = (result_value: any, key: number) => {
      if(result) return;
      if(infoClickSeleted?.answer_key === key){
          setInfoClickSeleted(DEFAULT_INFO_CLICK_SELECTED);
      } else {
          setInfoClickSeleted({
              answer_value: result_value,
              answer_key: key,
              question_id: question?.id
          })
      }
  }

  //hàm xử lý khi click/doubleClick vào ô trống của câu hỏi
  const handleDropAnswer = (a_index: number, i_index: number) => {
      if(result) return;
      ExamFunctions.answer({ a_index, i_index }, '');
      if(
          infoClickSeleted?.answer_key !== '' &&
          infoClickSeleted?.answer_value !== ''
      ){
          if([QUESTION_TYPE.TA_014, QUESTION_TYPE.TV_014].includes(question.type)){
              ExamFunctions.answer({ a_index, i_index }, infoClickSeleted?.answer_value + '_' + infoClickSeleted?.answer_key);
          } else if([QUESTION_TYPE.TA_007, QUESTION_TYPE.TV_007].includes(question.type)){
            ExamFunctions.answer({ a_index, i_index }, infoClickSeleted?.answer_value + '_' + a_index);
          } else {
              ExamFunctions.answer({ a_index, i_index }, infoClickSeleted?.answer_value);
          }
      }
      //đặt thông tin dữ liệu câu hỏi click được về default
      setInfoClickSeleted(DEFAULT_INFO_CLICK_SELECTED);
  }
  const truncateItems = (list: any, t_a_index: any) => {
    let answer_pupil: any = question?.answer_pupil ? Object.values(question?.answer_pupil) : [];
    return list.map((o: any, key: number) => {
        let tmp_value_num = o?.split('_')?.[0];
        if([QUESTION_TYPE.TA_014, QUESTION_TYPE.TV_014].includes(question.type)){
            if(!answer_pupil.includes(tmp_value_num + '_' + key)){
              return o;
            }
        } else if([QUESTION_TYPE.TA_007, QUESTION_TYPE.TV_007].includes(question.type)){
          if(!answer_pupil.includes(tmp_value_num + '_' + t_a_index)){
            return o;
          }
        }else {
            if(!answer_pupil.includes(tmp_value_num)){
              return o;
            }
        }
    });
  }
  let TYPE_007 = question.type === QUESTION_TYPE.TV_007 || question.type === QUESTION_TYPE.TA_007;
  return (
    <div
      className={`mb-5 py-2 items-center px-4 mx-5 w-full 
      ${TYPE_007 ? 'border-2 border-dashed rounded-[10px] border-[#FF6700]' : 'text-center'} 
      ${result && (!is_view ? checkStatusAnswer(checkAns) : checkCorectSolution(answer, a_index, question))}`}
    >
        {answer.content.map((item: any, i_index: number) => {
          if(item.type == ITEM_TYPE.TEXT && typeof item.data == "string"){
            return <span className='mr-2' key={i_index}><Text str={item.data} /></span>
          }
          if(item.type == ITEM_TYPE.DROP_ANSWER){
              if (Array.isArray(item.data) && !item.data?.[0]) {//nếu phần tử trong mảng có 1 phần tử = rỗng => hiển thị ô drop
                return (
                    <React.Fragment key={i_index}>
                      <DropAnswer
                        question={question}
                        answer_content={answer.content}
                        on_click_drop={() => handleDropAnswer(a_index, i_index)}
                        a_index={a_index}
                        i_index={i_index}
                        is_view={is_view}
                      />
                    </React.Fragment>
                );
              } else {//nếu phần tử trong mảng có nhiều phần tử và không có giá trị rỗng => hiển thị ô drag
                if(!result){
                    return (
                        <div key={i_index} className={`flex justify-center mt-5 flex-wrap`}>
                            {Array.isArray(item.data) && truncateItems(item.data, a_index).map((val: any, key: number) => {
                                if(val){
                                    let str_value_split = val?.split('_');
                                    let result_value = str_value_split?.[0];
                                    val = str_value_split?.[1]; //get name
                                    return <React.Fragment key={key}>
                                            <AnswerItem 
                                                activeKey={infoClickSeleted?.answer_key}
                                                index={key}
                                                value={val} 
                                                onClick={() => handleDragAnswer(result_value, key)} 
                                            />
                                        </React.Fragment>
                                }
                                return <></>
                            })}
                        </div>
                    )
                }
            }
          }
          return <></>
      })}
    </div>
  );
};

export default ItemAnswerClick;
