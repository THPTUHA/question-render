import React from "react";
import { QUESTION_TYPE, QuestionRender } from "question-convert";
import ChooseTrueFalse from "./questions/type/ChooseTrueFalse";
import ClickAnswer from "./questions/type/ClickAnswer";
import ConnectAnswer from "./questions/type/ConnectAnswer";
import ConnectImage from "./questions/type/ConnectImage";
import DragDropGroup from "./questions/type/DragDropGroup";
import DragDropImage from "./questions/type/DragDropImage";
import DropListImage from "./questions/type/DropListImage";
import FillExpressionCH004 from "./questions/type/FIllExpressionCH004";
import FillInputImage from "./questions/type/FillInputImage";
import SelectAnswer from "./questions/type/SelectAnswer";
import SelectImage from "./questions/type/SelectImage";
import FillWordImage from "./questions/type/FillWordImage";
import FillWordAnswer from "./questions/type/FillWordAnswer";
import DropListAnswer from "./questions/type/DropListAnswer";
import SelectImageTA003 from "./questions/type/SelectImageTA003";
import SelectImageTA013 from "./questions/type/SelectImageTA013";
import SelectAnswerTA004 from "./questions/type/SelectAnswerTA004";
import FIllExpressionCH003 from "./questions/type/FIllExpressionCH003";
import Common from "./questions/type/Common";

export const handleContentRender = (question: QuestionRender) => {
    switch (question.type) {
        case QUESTION_TYPE.CH_001: //check done
            return <Common question={question} />;
        case QUESTION_TYPE.CH_002: //check done
            return <FillInputImage question={question} />;
        case QUESTION_TYPE.CH_003:
            return <FIllExpressionCH003 question={question} />;
        case QUESTION_TYPE.CH_004:
            return <FillExpressionCH004 question={question} />;
        case QUESTION_TYPE.CH_005:
            return <SelectImage question={question} />;
        case QUESTION_TYPE.CH_006:
            return <SelectAnswer question={question} />;
        case QUESTION_TYPE.CH_007:
            return <ConnectImage question={question} />;
        case QUESTION_TYPE.CH_008:
            return <DragDropImage question={question} />;
        case QUESTION_TYPE.CH_009:
            return <ChooseTrueFalse question={question} />;
        case QUESTION_TYPE.CH_010:
            return <SelectAnswer question={question} />;

        case QUESTION_TYPE.TV_001: //checked
        case QUESTION_TYPE.TA_001:
            return <DropListAnswer question={question} />;
        case QUESTION_TYPE.TV_002: //checked
        case QUESTION_TYPE.TA_002:
            return <DropListImage question={question} />;
        case QUESTION_TYPE.TV_003: //checked
        case QUESTION_TYPE.TA_003:
            return <SelectImageTA003 question={question} />;
        case QUESTION_TYPE.TV_004: //checked
        case QUESTION_TYPE.TA_004:
            return <SelectAnswerTA004 question={question} />;
        case QUESTION_TYPE.TV_005: //checked
        case QUESTION_TYPE.TA_005:
            return <ConnectAnswer question={question} />
        case QUESTION_TYPE.TV_006: //checked
        case QUESTION_TYPE.TA_006:
            return <ConnectAnswer question={question} is_multi={true} />
        case QUESTION_TYPE.TV_007:
        case QUESTION_TYPE.TA_007:
            return <ClickAnswer question={question} />;
        case QUESTION_TYPE.TV_008:
        case QUESTION_TYPE.TA_008:
            return <ClickAnswer question={question} />;
        case QUESTION_TYPE.TV_009:
        case QUESTION_TYPE.TA_009:
            return <DragDropGroup question={question} is_view={false} />;
        case QUESTION_TYPE.TA_010:
            return <FillWordImage question={question} />;
        case QUESTION_TYPE.TA_011:
            return <FillWordAnswer question={question} />;
        case QUESTION_TYPE.TV_013: //checked
        case QUESTION_TYPE.TA_013:
            return <SelectImageTA013 question={question} />;
        case QUESTION_TYPE.TV_014:
        case QUESTION_TYPE.TA_014:
            return <ClickAnswer question={question} />
        default:
            return <></>;
    }
};