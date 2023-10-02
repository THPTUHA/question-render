import store from '../store';
import { ExamResult, QuestionChecked, QuestionRender } from 'question-convert';
import * as LoadActions from './slice';

const init = (data: { 
        questions: QuestionRender[], 
        start_time: number, 
        end_time: number, 
        duration: number, 
        is_doing?: number,
        title?: string,
        result?: any,
     }, storex = store)=>{
    storex.dispatch(LoadActions.init(data))
}

const select = (index: number, storex= store) =>{
    storex.dispatch(LoadActions.select({ index }))
}

const answer = (pos:{ a_index: number, i_index?: number, f_index ?: number },ans: string, storex = store) =>{
    storex.dispatch(LoadActions.updateAnswerPupil({ ...pos, ans }))
}

const result = (result: ExamResult, question_checked: QuestionChecked[], storex = store) => {
    storex.dispatch(LoadActions.updateResult({ result, question_checked }))
}

const stop = (storex = store) =>{
    storex.dispatch(LoadActions.stopDoing())
}

const view = (storex = store) => {
    storex.dispatch(LoadActions.view())
}

const dragHorizontal = (id: string, is_left: boolean, storex = store) =>{
    storex.dispatch(LoadActions.dragHorizontal({id, is_left}))
}

const dragToBoard = (pops: { src_label: string, src_index: number, dist_label: string, dist_index: number }, storex = store)=>{
    storex.dispatch(LoadActions.dragToBoard(pops))
}

const drawLine = ({src, dist}:{ src: string, dist: string }, storex = store) =>{
    storex.dispatch(LoadActions.drawLine({ src, dist }))
}
export const ExamFunctions = {
    init,
    stop,
    select,
    answer,
    result,
    view,
    drawLine,
    dragHorizontal,
    dragToBoard,
};