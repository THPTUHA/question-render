import { useSelector } from 'react-redux'

const useQuestionList = () => {
    return useSelector((state) => {
        return state.exam.questions;
    });
};


const useQuestionCurrent = () => {
    return useSelector((state) => {
        if (state.exam.index_current != null)
            return state.exam.questions[state.exam.index_current];
        return null;
    });
};


const useIndexCurrent = () => {
    return useSelector((state) => {
        return state.exam.index_current;
    });
};

const useIsLast = ()=>{
    return useSelector((state) => {
        if (state.exam.index_current != null){
            return state.exam.index_current >= state.exam.len - 1
        }
        return false;
    });
}

const useIsFirst = () => {
    return useSelector((state) => {
        if (state.exam.index_current != null) {
            return state.exam.index_current <= 0
        }
        return false;
    });
}

const useAnswerPupil = ({ a_index, i_index, f_index, q_id }: { a_index: number, i_index?: number, f_index?: number, q_id?: number }) => {
    return useSelector((state) => {
        let question;
        if (q_id) {
            for (let q of state.exam.questions) {
                if (q.id == q_id) {
                    question = q;
                    break;
                }
            }
        }
        if (question) {
            if (f_index !== undefined) {
                return question.answer_pupil[`${a_index}#${i_index}#${f_index}`]
            }
            return question.answer_pupil[`${a_index}#${i_index}`]
        }
        return null
    });
}

const useSolution = ({ a_index, i_index, f_index, q_id }: { a_index: number, i_index?: number, f_index?: number, q_id?: number }) => {
    return useSelector((state) => {
        let question;
        if (q_id){
            for(let q of state.exam.questions){
                if(q.id == q_id){
                    question = q;
                    break;
                }
            }
        }
        if (question) {
            if (f_index !== undefined) {
                return question.solutions[`${a_index}#${i_index}#${f_index}`]
            }
            return question.solutions[`${a_index}#${i_index}`]
        }
        return null
    });
}


const useIsDoing = ()=>{
    return useSelector((state) => {
        return state.exam.is_doing
    });
}

const useStatus = ()=>{
    return useSelector((state) => {
        return {
            duration: state.exam.duration,
            start_time: state.exam.start_time,
            end_time: state.exam.end_time,
        }
    });
}


const useResult = () => {
    return useSelector((state) => {
        return state.exam.result
    });
}


const useQuestionStatus = (q_id?: number)=>{

    return useSelector((state) => {
        let question;
        if (q_id) {
            for (let q of state.exam.questions) {
                if (q.id == q_id) {
                    question = q;
                    break;
                }
            }
        }
        if (question) {
            return question.status
        }
        return 0
    });
}

const useFocus = ()=>{
    return useSelector((state) => {
        const index = state.exam.index_current;
        if (index != null) {
            return state.exam.questions[index].focus
        }
        return ""
    });
}

const useTitle = ()=>{
    return useSelector((state) => {
        return state.exam.title
    });
}

export const ExamHook = {
    useQuestionList,
    useQuestionCurrent,
    useIndexCurrent,
    useIsLast,
    useIsFirst,
    useAnswerPupil,
    useIsDoing,
    useStatus,
    useResult,
    useSolution,
    useQuestionStatus,
    useFocus,
    useTitle,
};