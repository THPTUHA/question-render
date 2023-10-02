import { QUESTION_TYPE } from "question-convert";

const checkCorectSolution = (t_answer: any, t_a_index: number, t_question_current: any) => {
    let active = '';
    t_answer.content.map((_: any, i_index: any) => {
      let key = t_a_index + '#' + i_index;
      if(t_question_current.type === QUESTION_TYPE.CH_004){
        let key_0 = t_a_index + '#' + i_index + '#0';
        let key_1 = t_a_index + '#' + i_index + '#1';
        if(t_question_current.solutions[key_0]){
          active = 's_answer_success border_solid';
        }
        if(t_question_current.solutions[key_1]){
          active = 's_answer_success border_solid';
        }
      } 
      if(t_question_current.solutions[key]){
        active = 's_answer_success border_solid';
      }
    })
    return active;
}

export default checkCorectSolution;