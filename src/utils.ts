import { QuestionRender } from "question-convert";

export function getPupilAnswer(question: QuestionRender, { a_index, i_index, f_index}: {
    a_index: number, i_index: number, f_index?:number
}){
    return  f_index 
            ? question.answer_pupil[`${a_index}#${i_index}#${f_index}`] 
            : question.answer_pupil[`${a_index}#${i_index}`]
}

export function getQuestionSolution(question: QuestionRender, { a_index, i_index, f_index }: {
    a_index: number, i_index: number, f_index?: number
}) {
    return f_index
        ? question.solutions[`${a_index}#${i_index}#${f_index}`]
        : question.solutions[`${a_index}#${i_index}`]
}