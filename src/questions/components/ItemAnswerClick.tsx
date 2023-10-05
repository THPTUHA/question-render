import {
  AnswerRender,
  ExamResult,
  ITEM_TYPE,
  QUESTION_TYPE,
  QuestionRender,
  S_ANSWER_CORRECT,
  S_ANSWER_WRONG,
  S_UNANSWER,
} from "question-convert";
import Text from "./Text";
import DropAnswer from "./DropAnswer";
import lodash from 'lodash';
import checkCorectSolution from "../../helper/checkCorectSolution";
import checkStatusAnswer from "../../helper/checkStatusAnswer";
import { onAnswerQuestion } from "../types";
import React, { Component } from "react";

//item answer
const AnswerItem = ({
  value,
  onClick,
  activeKey,
  index
}: {
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
  answer_key: -1,
  question_id: -1,
}

type Props = {
  a_index: number,
  is_view?: boolean;
  answer: AnswerRender;
  question: QuestionRender;
  exam_result: ExamResult | null;
  onAnswerQuestion: onAnswerQuestion;
}

type State = {
  infoClickSeleted: {
    answer_value: string;
    answer_key:  number;
    question_id: number;
  };
  checkAns: number
}

class ItemAnswerClick extends Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {
      infoClickSeleted: DEFAULT_INFO_CLICK_SELECTED,
      checkAns: 0
    }
  }

  componentDidUpdate(prevProp: Props, _: State) {
    if (prevProp.question != this.props.question) {
      const { question } = this.props
      let check_result = 0;
      let hasData = false;
      Object.values(question.answer_pupil).map(item => {
        if (item) {//nếu có đáp án được điền
          hasData = true;
        }
      })
      if (hasData) {//nếu đã trả lời ít nhất 1 câu
        if ([QUESTION_TYPE.TA_014, QUESTION_TYPE.TV_014].includes(question.type)) {
          let answer_pupil_list = Object.values(question.answer_pupil).map((o: any) => {
            return o?.split('_')?.[0];
          });
          let solutions_list = Object.values(question.solutions).map((o: any) => {
            return o?.split('_')?.[0];
          });
          if (lodash.isEqual(answer_pupil_list, solutions_list)) {
            check_result = S_ANSWER_CORRECT;
          } else {
            check_result = S_ANSWER_WRONG;
          }
        } else {
          if (lodash.isEqual(question.answer_pupil, question.solutions)) {
            check_result = S_ANSWER_CORRECT;
          } else {
            check_result = S_ANSWER_WRONG;
          }
        }
      } else {//nếu không trả lời đáp án nào
        check_result = S_UNANSWER;
      }
      this.setState({ checkAns: check_result })
    }
  }

  handleDropAnswer = (a_index: number, i_index: number) => {
    const { exam_result, question, onAnswerQuestion } = this.props
    const { infoClickSeleted } = this.state
    if (exam_result) return;
    onAnswerQuestion({ a_index, i_index }, '');
    if (
      infoClickSeleted?.answer_key !== -1 &&
      infoClickSeleted?.answer_value !== ''
    ) {
      if ([QUESTION_TYPE.TA_014, QUESTION_TYPE.TV_014].includes(question.type)) {
        onAnswerQuestion({ a_index, i_index }, infoClickSeleted?.answer_value + '_' + infoClickSeleted?.answer_key);
      } else if ([QUESTION_TYPE.TA_007, QUESTION_TYPE.TV_007].includes(question.type)) {
        onAnswerQuestion({ a_index, i_index }, infoClickSeleted?.answer_value + '_' + a_index);
      } else {
        onAnswerQuestion({ a_index, i_index }, infoClickSeleted?.answer_value);
      }
    }
    //đặt thông tin dữ liệu câu hỏi click được về default
    this.setState({ infoClickSeleted: DEFAULT_INFO_CLICK_SELECTED });
  }

  //hàm xử lý khi click/doubleClick vào câu trả lời
  handleDragAnswer = (result_value: any, key: number) => {
    if (this.props.exam_result) return;
    if (this.state.infoClickSeleted?.answer_key === key) {
      this.setState({ infoClickSeleted: DEFAULT_INFO_CLICK_SELECTED })
    } else {
      this.setState({
        infoClickSeleted: {
          answer_value: result_value,
          answer_key: key,
          question_id: this.props.question?.id
        } })
    }
  }

  truncateItems = (list: any, t_a_index: any) => {
    const question = this.props.question
    let answer_pupil: any = question?.answer_pupil ? Object.values(question?.answer_pupil) : [];
    return list.map((o: any, key: number) => {
      let tmp_value_num = o?.split('_')?.[0];
      if ([QUESTION_TYPE.TA_014, QUESTION_TYPE.TV_014].includes(question.type)) {
        if (!answer_pupil.includes(tmp_value_num + '_' + key)) {
          return o;
        }
      } else if ([QUESTION_TYPE.TA_007, QUESTION_TYPE.TV_007].includes(question.type)) {
        if (!answer_pupil.includes(tmp_value_num + '_' + t_a_index)) {
          return o;
        }
      } else {
        if (!answer_pupil.includes(tmp_value_num)) {
          return o;
        }
      }
    });
  }

  render() {
    const { question, is_view, exam_result, answer, a_index } = this.props;
    const { checkAns, infoClickSeleted } = this.state;
    let TYPE_007 = question.type === QUESTION_TYPE.TV_007 || question.type === QUESTION_TYPE.TA_007;
    return (
      <div
        className={`mb-5 py-2 items-center px-4 mx-5 w-full 
      ${TYPE_007 ? 'border-2 border-dashed rounded-[10px] border-[#FF6700]' : 'text-center'} 
      ${exam_result && (!is_view ? checkStatusAnswer(checkAns) : checkCorectSolution(answer, a_index, question))}`}
      >
        {answer.content.map((item: any, i_index: number) => {
          if (item.type == ITEM_TYPE.TEXT && typeof item.data == "string") {
            return <span className='mr-2' key={i_index}><Text str={item.data} /></span>
          }
          if (item.type == ITEM_TYPE.DROP_ANSWER) {
            if (Array.isArray(item.data) && !item.data?.[0]) {//nếu phần tử trong mảng có 1 phần tử = rỗng => hiển thị ô drop
              return (
                <React.Fragment key={i_index}>
                  <DropAnswer
                    question={question}
                    answer_content={answer.content}
                    on_click_drop={() => this.handleDropAnswer(a_index, i_index)}
                    a_index={a_index}
                    i_index={i_index}
                    is_view={is_view}
                    exam_result={exam_result}
                  />
                </React.Fragment>
              );
            } else {//nếu phần tử trong mảng có nhiều phần tử và không có giá trị rỗng => hiển thị ô drag
              if (!exam_result) {
                return (
                  <div key={i_index} className={`flex justify-center mt-5 flex-wrap`}>
                    {Array.isArray(item.data) && this.truncateItems(item.data, a_index).map((val: any, key: number) => {
                      if (val) {
                        let str_value_split = val?.split('_');
                        let result_value = str_value_split?.[0];
                        val = str_value_split?.[1]; //get name
                        return <React.Fragment key={key}>
                          <AnswerItem
                            activeKey={infoClickSeleted?.answer_key}
                            index={key}
                            value={val}
                            onClick={() => this.handleDragAnswer(result_value, key)}
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
    )
  }
}

export default ItemAnswerClick;
