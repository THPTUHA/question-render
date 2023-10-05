import { Component } from "react";
import { ExamResult, QuestionRender } from "question-convert";
import { QUESTION_TYPE } from "question-convert";
import classCheckResult from "../../helper/classCheckResult";
import { getPupilAnswer, getQuestionSolution } from "../../utils";

type Props = {
  answer_content?: any;
  answer_pupil: string;
  is_view?: boolean;
  solution: string;
  question: QuestionRender;
  a_index: number;
}

type State = {
  viewAnswer: string | JSX.Element
}

class ViewAnswer extends Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {
      viewAnswer: ""
    }
  }

  getTextByResult = (list: any, exam_result: any) => {
    let tmp_value_text = '';
    list.map((o: any) => {
      let tmp_value_num = o?.split('_')?.[0];
      if ([QUESTION_TYPE.TV_014, QUESTION_TYPE.TA_014].includes(this.props.question.type)) {
        let tmp_result_value_num = exam_result?.split('_')?.[0];
        // if(tmp_value_num == tmp_result_value_num && tmp_result_value_key == key){
        if (tmp_value_num == tmp_result_value_num) {
          tmp_value_text = o?.split('_')?.[1];
        }
      } else if ([QUESTION_TYPE.TV_007, QUESTION_TYPE.TA_007].includes(this.props.question.type)) {
        if ((tmp_value_num + '_' + this.props.a_index) == exam_result) {
          tmp_value_text = o?.split('_')?.[1];
        }
      }
      else {
        if (tmp_value_num == exam_result) {
          tmp_value_text = o?.split('_')?.[1];
        }
      }
    })
    return tmp_value_text
  }
  componentDidMount() {
    this.handleUpdateViewAnswer();
  }

  componentDidUpdate(prevProp: Props, _: State) {
    if (prevProp.answer_content === this.props.answer_content &&
      prevProp.is_view === this.props.is_view &&
      prevProp.answer_pupil === this.props.answer_pupil &&
      prevProp.solution === this.props.solution
    ) return
    console.log("Run here");
    this.handleUpdateViewAnswer();
  }

  handleUpdateViewAnswer() {
    let tmpListAnwers = [];
    let tmpAnswer: string | JSX.Element;
    let space_default = <span>&emsp;&emsp;&emsp;&emsp;&emsp;</span>;
    if (this.props.question.type === QUESTION_TYPE.TA_014) {
      space_default = <span>&nbsp;&nbsp;</span>
    }
    const { answer_content, is_view, solution, answer_pupil } = this.props
    if (answer_content) {//lấy ds câu trả lời ở cuối mảng answers
      tmpListAnwers = answer_content?.[answer_content?.length - 1]?.data;
    }
    if (is_view) {//xem kết quả đúng
      tmpAnswer = solution ? this.getTextByResult(tmpListAnwers, solution) : space_default;
    } else {//kết quả làm bài
      tmpAnswer = answer_pupil ? this.getTextByResult(tmpListAnwers, answer_pupil) : space_default;
    }
    this.setState({ viewAnswer: tmpAnswer })
  }

  render() {
    return (
      <>{this.state.viewAnswer}</>
    )
  }
}

const DropAnswer = ({
  a_index,
  i_index,
  is_view,
  on_click_drop,
  answer_content,
  question,
  exam_result,
}: {
  a_index: number;
  i_index: number;
  is_view?: boolean;
  on_click_drop?: any;
  answer_content?: any;
  question: QuestionRender;
  exam_result: ExamResult | null;
}) => {
  const answer_pupil = getPupilAnswer(question, { a_index, i_index });
  const solution = getQuestionSolution(question, { a_index, i_index });

  const handleValue = (value: any) => {
    if ([QUESTION_TYPE.TA_014, QUESTION_TYPE.TV_014].includes(question.type)) {
      let tmp_value = value?.split('_')?.[0];
      return tmp_value;
    }
    return value;
  }

  if (question.type === QUESTION_TYPE.TA_014) {
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
        className={`h-8 w-10 rounded-[10px] mr-2 border-[#FF6700] border-dashed border-2 ${classCheckResult(handleValue(answer_pupil), is_view, handleValue(solution), exam_result)}`}>
        <ViewAnswer
          answer_content={answer_content}
          answer_pupil={answer_pupil}
          is_view={is_view}
          solution={solution}
          question={question}
          a_index={a_index}
        />
      </span>
    )
  } else if (question.type === QUESTION_TYPE.TA_008 ||
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
        className={` display-inline-block mb-2 rounded-[10px] mr-2 border-[#FF6700] border-dashed border-2 ${classCheckResult(handleValue(answer_pupil), is_view, handleValue(solution), exam_result)}`}>
        <ViewAnswer
          answer_content={answer_content}
          answer_pupil={answer_pupil}
          is_view={is_view}
          solution={solution}
          question={question}
          a_index={a_index}
        />
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
        className={` mb-2 rounded-[10px] mr-2 border-[#FF6700] border-dashed border-2 ${classCheckResult(handleValue(answer_pupil), is_view, handleValue(solution), exam_result)}`}>
        <ViewAnswer
          answer_content={answer_content}
          answer_pupil={answer_pupil}
          is_view={is_view}
          solution={solution}
          question={question}
          a_index={a_index}
        />
      </span>
    )
  }
}

export default DropAnswer;