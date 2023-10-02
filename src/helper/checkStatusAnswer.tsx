import { S_ANSWER_CORRECT, S_ANSWER_WRONG, S_UNANSWER } from "question-convert";

const checkStatusAnswer = (status: any) => {
    switch (status) {
        case S_ANSWER_CORRECT:
            return 's_answer_success border_solid';
        case S_ANSWER_WRONG:
            return 's_answer_wrong border_solid';
        case S_UNANSWER:
            return ''
    }
    return ''
}

export default checkStatusAnswer