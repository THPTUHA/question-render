import { AnswerRender, Item, QuestionRender } from "question-convert";

export type onAnswerQuestion = (pos: { a_index: number, i_index?: number, f_index?: number }, ans: string) => void;
export type onDrawLine = ({ src, dist }: {
    src: string;
    dist: string;
})=>void

export type onDragHorizontal = (id: string, is_left: boolean)=>void


export type ComponentProps = {
    question: QuestionRender,
    options?: Item;
    a_index: number;
    i_index: number;
    is_view?: boolean;
    className?: string;
}

export type AnswerProps = {
    question: QuestionRender,
    answer: AnswerRender,
    a_index: number,
    is_view?: boolean
}

export type QuestionContentProps = {
    question: QuestionRender;
    is_view?: boolean;
}

export type getQuestionStatus = (question?: number) => number;

export type onDragToBoard = (pops: {
    src_label: string;
    src_index: number;
    dist_label: string;
    dist_index: number;
}) => void
