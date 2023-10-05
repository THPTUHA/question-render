import { ExamResult, QUESTION_TYPE, QuestionRender } from "question-convert";
import ChooseTrueFalse from "./questions/type/ChooseTrueFalse";
import ClickAnswer from "./questions/type/ClickAnswer";
import ConnectAnswer from "./questions/type/ConnectAnswer";
import ConnectImage from "./questions/type/ConnectImage";
import DragDropGroup from "./questions/type/DragDropGroup";
import DragDropImage from "./questions/type/DragDropImage";
import DropListImage from "./questions/type/DropListImage";
import FillExpressionCH004 from "./questions/type/FillExpressionCH004";
import FillInputImage from "./questions/type/FillInputImage";
import SelectAnswer from "./questions/type/SelectAnswer";
import SelectImage from "./questions/type/SelectImage";
import FillWordImage from "./questions/type/FillWordImage";
import FillWordAnswer from "./questions/type/FillWordAnswer";
import DropListAnswer from "./questions/type/DropListAnswer";
import SelectImageTA003 from "./questions/type/SelectImageTA003";
import SelectImageTA013 from "./questions/type/SelectImageTA013";
import SelectAnswerTA004 from "./questions/type/SelectAnswerTA004";
import FillExpressionCH003 from "./questions/type/FillExpressionCH003";
import Common from "./questions/type/Common";
import { onAnswerQuestion, onDragHorizontal, onDragToBoard, onDrawLine } from "./questions/types";

export const CH001 = Common
export const CH002 = FillInputImage
export const CH003 = FillExpressionCH003
export const CH004 = FillExpressionCH004
export const CH005 = SelectImage
export const CH006 = SelectAnswer
export const CH007 = ConnectImage
export const CH008 = DragDropImage
export const CH009 = ChooseTrueFalse
export const CH010 = SelectAnswer

export const TV001 = DropListAnswer
export const TV002 = DropListImage
export const TV003 = SelectImageTA003
export const TV004 = SelectAnswerTA004
export const TV005 = ConnectAnswer
export const TV006 = ConnectAnswer //is_multi = true
export const TV007 = ClickAnswer
export const TV008 = ClickAnswer
export const TV009 = DragDropGroup
export const TV010 = FillWordImage
export const TV011 = FillWordAnswer
export const TV013 = SelectImageTA013
export const TV014 = ClickAnswer

export const TA001 = DropListAnswer
export const TA002 = DropListImage
export const TA003 = SelectImageTA003
export const TA004 = SelectAnswerTA004
export const TA005 = ConnectAnswer
export const TA006 = ConnectAnswer //is_multi = true
export const TA007 = ClickAnswer
export const TA008 = ClickAnswer
export const TA009 = DragDropGroup
export const TA010 = FillWordImage
export const TA011 = FillWordAnswer
export const TA013 = SelectImageTA013
export const TA014 = ClickAnswer

export const handleContentRender = (
    question: QuestionRender,
    func: {
        onAnswerQuestion: onAnswerQuestion;
        onDrawLine: onDrawLine;
        onDragHorizontal: onDragHorizontal;
        onDragToBoard: onDragToBoard;
    },
    exam_result: ExamResult | null,
    exam_status: number,
    is_view?: boolean,
) => {
    exam_status
    switch (question.type) {
        // case QUESTION_TYPE.CH_001:
        //     return <CH001 {...func} question={question} exam_result={exam_result} is_view={is_view} />
        // case QUESTION_TYPE.CH_002: //check done
        //     return <CH002 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.CH_003:
        //     return <CH003 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.CH_004:
        //     return <CH004 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.CH_005:
        //     return <CH005 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        case QUESTION_TYPE.CH_006:
            return <CH006 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.CH_007:
        //     return <CH007 {...func} question={question} exam_status={exam_status} is_view={is_view} />;
        // case QUESTION_TYPE.CH_008:
        //     return <CH008 {...func} question={question} exam_status={exam_status}  is_view={is_view} />;
        // case QUESTION_TYPE.CH_009:
        //     return <CH009 {...func} question={question} exam_result={exam_result}  is_view={is_view} />;
        // case QUESTION_TYPE.CH_010:
        //     return <CH010 {...func} question={question} exam_result={exam_result}  is_view={is_view} />;

        // case QUESTION_TYPE.TV_001: //checked
        // case QUESTION_TYPE.TA_001:
        //     return <TV001 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.TV_002: //checked
        // case QUESTION_TYPE.TA_002:
        //     return <TV002 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.TV_003: //checked
        // case QUESTION_TYPE.TA_003:
        //     return <TV003 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.TV_004: //checked
        // case QUESTION_TYPE.TA_004:
        //     return <TV004 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.TV_005: //checked
        // case QUESTION_TYPE.TA_005:
        //     return <TV005 {...func} question={question} exam_status={exam_status} is_view={is_view} is_multi={false} />;
        // case QUESTION_TYPE.TV_006: //checked
        // case QUESTION_TYPE.TA_006:
        //     return <TV006 {...func} question={question} exam_status={exam_status} is_view={is_view} is_multi={true}/>; 
        // case QUESTION_TYPE.TV_007:
        // case QUESTION_TYPE.TA_007:
        //     return <TV007 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.TV_008:
        // case QUESTION_TYPE.TA_008:
        //     return <TV008 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.TV_009:
        // case QUESTION_TYPE.TA_009:
        //     return <TV009 {...func} question={question} exam_status={exam_status} is_view={is_view} />;
        // case QUESTION_TYPE.TA_010:
        //     return <TV010 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.TA_011:
        //     return <TV011 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.TV_013: //checked
        // case QUESTION_TYPE.TA_013:
        //     return <TV013 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        // case QUESTION_TYPE.TV_014:
        // case QUESTION_TYPE.TA_014:
        //     return <TV014 {...func} question={question} exam_result={exam_result} is_view={is_view} />;
        default:
            return <></>;
    }
};