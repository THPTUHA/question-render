import { createSlice } from '@reduxjs/toolkit'
import { QUESTION_TYPE } from 'question-convert';
import { ExamResult, QuestionChecked, QuestionRender } from 'question-convert'
import { EXAM_STATUS } from '../../constants';

type State = {
    questions: QuestionRender[],
    index_current: number | null,
    len: number,
    is_doing: number,
    start_time: number,
    end_time: number,
    duration: number,
    result: ExamResult | null,
    title: string
};

const initialState: State = {
    questions: [],
    index_current: null,
    len: 0,
    is_doing: EXAM_STATUS.WAIT,
    start_time: -1,
    end_time: -1,
    duration: -1,
    result: null,
    title: ""
};

const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        init(state, action: {
            payload: {
                questions: QuestionRender[],
                start_time: number,
                duration: number,
                end_time: number,
                is_doing?: number,
                title?: string,
                result?: any,
            }
        }) {
            const questions = action.payload.questions;
            const len = questions.length;
            const is_doing = action.payload.is_doing;
            const title = action.payload.title;
            state = {
                ...state,
                ...action.payload,
                index_current: 0,
                len: len,
                is_doing: is_doing ? is_doing : state.is_doing,
                title: title ? title: ""
            };

            return state;
        },
        select(state, action: { payload: { index: number } }) {
            const index = action.payload.index;
            state = {
                ...state,
                index_current: index,
            }
            return state;
        },
        updateResult(state, action: { payload: { result: ExamResult, question_checked: QuestionChecked[] } }) {
            const question_list = [];
            for (const question of state.questions) {
                let q = { ...question }
                for (const st of action.payload.question_checked) {
                    if (q.id == st.question_id) {
                        q.status = st.status;
                        break;
                    }
                }
                question_list.push(q)
            }
            state = {
                ...state,
                questions: question_list,
                result: action.payload.result,
                is_doing: EXAM_STATUS.SUBMIT
            }
            return state;
        },
        stopDoing(state) {
            state = {
                ...state,
                is_doing: EXAM_STATUS.WAIT
            }
            return state
        },
        view(state) {
            state = {
                ...state,
                index_current: 0,
                is_doing: EXAM_STATUS.VIEW
            }
            return state
        },
        drawLine(state, action: { payload: { src: string, dist: string } }){
            if (state.is_doing != EXAM_STATUS.VIEW) {
                if (state.index_current != null) {
                    let { src, dist } = action.payload;
                    const question_current = state.questions[state.index_current];
                    if ([
                        QUESTION_TYPE.CH_007,
                        QUESTION_TYPE.TV_005, QUESTION_TYPE.TA_005,
                        QUESTION_TYPE.TV_006, QUESTION_TYPE.TA_006,
                    ].includes(question_current.type)) {
                        const answer_pupil = { ...question_current.answer_pupil };
                        const connect = src > dist ? dist +  '_' + src : src + '_' + dist

                        if (answer_pupil[connect]){
                            delete answer_pupil[connect]
                        }else{
                            answer_pupil[connect] = 'true'
                        }

                        const question_update: QuestionRender = {
                            ...question_current,
                            answer_pupil: answer_pupil
                        }
                        //@ts-ignore
                        const questions = [...state.questions];
                        questions[state.index_current] = question_update;
                        state = {
                            ...state,
                            questions,
                            is_doing: EXAM_STATUS.DOING
                        }
                    }
                }
            }
            return state;
        },
        dragToBoard(state, action: { payload: { src_label: string, src_index: number, dist_label: string, dist_index: number } } ){
            if (state.is_doing != EXAM_STATUS.VIEW) {
                if (state.index_current != null) {
                    let { src_label, src_index, dist_label, dist_index } = action.payload;
                    const question_current = state.questions[state.index_current];
                    if ([QUESTION_TYPE.TV_009, QUESTION_TYPE.TA_009].includes(question_current.type)) {
                        let new_answer = question_current.answers;
                        const src = new_answer.filter(ans => ans.label === src_label);
                        const dist = new_answer.filter(ans => ans.label === dist_label)
                        const other = new_answer.filter(ans => (ans.label !== dist_label && ans.label !== src_label));
                        if(src_label !== dist_label){
                            const ans_src = {
                                ...src[src_index],
                                label: dist_label
                            };

                            src.splice(src_index, 1);
                            dist.splice(dist_index, 0, ans_src);
                            new_answer = [...other, ...src, ...dist]
                        }else{
                            src.splice(src_index, 1);
                            src.splice(dist_index, 0, src[src_index]);
                            new_answer=  [...other, ...dist]
                        }
                        // console.log("DIST", other, src, dist)
                        const question_update: QuestionRender = {
                            ...question_current,
                            answers: new_answer
                        }

                        // console.log("NEW ANSWER", new_answer)
                        //@ts-ignore
                        const questions = [...state.questions];
                        questions[state.index_current] = question_update;
                        state = {
                            ...state,
                            questions,
                            is_doing: EXAM_STATUS.DOING
                        }
                    }
                }
            }
            return state;
        },
        dragHorizontal(state, action: { payload: { id: string, is_left: boolean } }) {
            if (state.is_doing != EXAM_STATUS.VIEW) {
                if (state.index_current != null) {
                    const { id, is_left } = action.payload;
                    const question_current = state.questions[state.index_current];
                    if (question_current.type == QUESTION_TYPE.CH_008) {
                        const new_answer = [];
                        const ans_cur = question_current.answers.filter(a => a.id === id)[0];
                        if (ans_cur) {
                            const new_ans = {...ans_cur}
                            new_ans.pos +=  (is_left ? -1 : 1);
                            new_answer.push(new_ans);
                            for (const ans of question_current.answers) {
                                const _answer ={...ans}
                                if (ans.id !== id && ans.pos === new_ans.pos) {
                                    _answer.pos += (is_left ? 1 : -1);
                                }
                                if(ans.id !==id){
                                    new_answer.push(_answer)
                                }
                            }
                            const question_update: QuestionRender = {
                                ...question_current,
                                answers: new_answer,
                                focus: "true"
                            }
                            
                            const questions = [...state.questions];
                            questions[state.index_current] = question_update;
                            state = {
                                ...state,
                                questions,
                                is_doing: EXAM_STATUS.DOING,
                            }
                        }
                    }

                }
            }
        },
        updateAnswerPupil(state, action: { payload: { a_index: number, i_index?: number,f_index?: number, ans: string } }) {
            if (state.is_doing !== EXAM_STATUS.VIEW && state.is_doing !== EXAM_STATUS.SUBMIT) {
                if (state.index_current != null) {
                    const question_current = state.questions[state.index_current];
                    const { a_index, i_index,f_index, ans } = action.payload;
                    let answer_pupil;

                    let key = f_index !== undefined ? `${a_index}#${i_index}#${f_index}` : `${a_index}#${i_index}`
                    if ([
                        QUESTION_TYPE.CH_005, QUESTION_TYPE.TV_003, QUESTION_TYPE.TA_003,
                        QUESTION_TYPE.CH_006, QUESTION_TYPE.TV_004, QUESTION_TYPE.TA_004,
                        QUESTION_TYPE.TV_013, QUESTION_TYPE.TA_013, QUESTION_TYPE.CH_010,
                        QUESTION_TYPE.TV_007, QUESTION_TYPE.TA_007, QUESTION_TYPE.TV_014,
                        QUESTION_TYPE.TA_014
                    ].includes(question_current.type)) {
                        if (question_current.answer_pupil[key]) {
                            answer_pupil = {
                                ...question_current.answer_pupil,
                                [key]: ''
                            }

                            delete answer_pupil[key]
                        } else {
                            answer_pupil = {
                                ...question_current.answer_pupil,
                                [key]: ans
                            }
                        }
                    } else {
                        answer_pupil = {
                            ...question_current.answer_pupil,
                            [key]: ans
                        }
                    }

                    const question_update: QuestionRender = {
                        ...question_current,
                        answer_pupil: answer_pupil,
                        focus: key
                    }
                    //@ts-ignore
                    const questions = [...state.questions];
                    questions[state.index_current] = question_update;
                    state = {
                        ...state,
                        questions,
                        is_doing: EXAM_STATUS.DOING
                    }
                }
            }
            return state;
        }
    },
})

export const {
    init,
    view,
    drawLine,
    dragToBoard,
    dragHorizontal,
    select,
    stopDoing,
    updateResult,
    updateAnswerPupil,
} = examSlice.actions
export default examSlice.reducer