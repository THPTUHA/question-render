const classCheckResult = (
  t_answer_pupil: any,
  t_is_view: any,
  t_solution: any,
  t_result?: any
) => {
  if (t_is_view) {
    //nếu là phần xem đáp án
    return "s_answer_success border_solid";
  }
  if(t_result){
    //nếu đã submit kết quả
    if(t_solution === t_answer_pupil){
      //nếu câu trả lời = đáp án
      return "s_answer_success border_solid";
    } else {
      //nếu câu trả lời != đáp án
      if(t_answer_pupil){
        //nếu đã điền đáp án
        return "s_answer_wrong border_solid";
      } else {
        return {};
      }
    }
  }

  return ""
};
export default classCheckResult;
