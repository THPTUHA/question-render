import React from "react";
import { useState } from "react";
import { QuestionRender } from "question-convert";
import ChooseTrueFalse from "./ChooseTrueFalse";
import ClickAnswer from "./ClickAnswer";
import Common from "./Common";
import ConnectAnswer from "./ConnectAnswer";
import ConnectImage from "./ConnectImage";
import DragDropGroup from "./DragDropGroup";
import DragDropImage from "./DragDropImage";
import DropListAnswer from "./DropListAnswer";
import DropListImage from "./DropListImage";
import FillInputImage from "./FillInputImage";
import FillWordAnswer from "./FillWordAnswer";
import FillWordImage from "./FillWordImage";
import SelectAnswer from "./SelectAnswer";
import SelectImage from "./SelectImage";
import FillExpressionCH004 from "../type/FIllExpressionCH004";
import SelectImageTA003 from "./SelectImageTA003";
import SelectAnswerTA004 from "./SelectAnswerTA004";
import SelectImageTA013 from "./SelectImageTA013";
import TitleQuestion from "../title/TitleQuestion";
import { QUESTION_TYPE } from "question-convert";
import { EXAM_STATUS } from "../../constants";

const handleContentRender = (question: QuestionRender) => {
    switch (question.type) {
        case QUESTION_TYPE.CH_001:
            return <Common question={question} is_view={true} />
        case QUESTION_TYPE.CH_002:
            return <FillInputImage question={question} is_view={true} />
        case QUESTION_TYPE.CH_003:
            return <FillExpressionCH004 question={question} is_view={true} />
        case QUESTION_TYPE.CH_004:
            return <FillExpressionCH004 question={question} is_view={true} />
        case QUESTION_TYPE.CH_005:
            return <SelectImage question={question} is_view={true} />
        case QUESTION_TYPE.CH_006:
            return <SelectAnswer question={question} is_view={true} />
        case QUESTION_TYPE.CH_007:
            return <ConnectImage question={question} is_view={true} />
        case QUESTION_TYPE.CH_008:
            return <DragDropImage question={question} is_view={true} />
        case QUESTION_TYPE.CH_009:
            return <ChooseTrueFalse question={question} is_view={true} />
        case QUESTION_TYPE.CH_010:
            return <SelectAnswer question={question} is_view={true} />

        case QUESTION_TYPE.TV_001:
        case QUESTION_TYPE.TA_001:
            return <DropListAnswer question={question} is_view={true} />;
        case QUESTION_TYPE.TV_002:
        case QUESTION_TYPE.TA_002:
            return <DropListImage question={question} is_view={true} />;
        case QUESTION_TYPE.TV_003:
        case QUESTION_TYPE.TA_003:
            return <SelectImageTA003 question={question} is_view={true} />;
        case QUESTION_TYPE.TV_004:
        case QUESTION_TYPE.TA_004:
            return <SelectAnswerTA004 question={question} is_view={true} />;
        case QUESTION_TYPE.TV_005:
        case QUESTION_TYPE.TA_005:
            return <ConnectAnswer question={question} is_view={true} />
        case QUESTION_TYPE.TV_006:
        case QUESTION_TYPE.TA_006:
            return <ConnectAnswer question={question} is_multi={true} is_view={true} />
        case QUESTION_TYPE.TV_007:
        case QUESTION_TYPE.TA_007:
            return <ClickAnswer question={question} is_view={true} />;
        case QUESTION_TYPE.TV_008:
        case QUESTION_TYPE.TA_008:
            return <ClickAnswer question={question} is_view={true} />;
        case QUESTION_TYPE.TV_009:
        case QUESTION_TYPE.TA_009:
            return <DragDropGroup question={question} is_view={true} preview={true} />;
        case QUESTION_TYPE.TA_011:
            return <FillWordAnswer question={question} is_view={true} />;
        case QUESTION_TYPE.TV_013:
        case QUESTION_TYPE.TA_013:
            return <SelectImageTA013 question={question} is_view={true} />;
        case QUESTION_TYPE.TV_014:
        case QUESTION_TYPE.TA_014:
            return <ClickAnswer question={question} is_view={true} />
        case QUESTION_TYPE.TA_010:
            return <FillWordImage question={question} is_view={true} />
        default:
            return <></>;
    }
};

const SolutionView = ({ question, is_doing, preview }: { question: QuestionRender, is_doing: number, preview?: any }) => {
    const [is_show, setIsShow] = useState(true);

    return (
        <div className="relative bottom-0 inset-x-0">
            {![QUESTION_TYPE.TV_011, QUESTION_TYPE.TV_012,
            QUESTION_TYPE.TV_010].includes(question?.type) && (
                    !preview && (
                        <div
                            className="flex justify-end mr-5 mt-5"
                        >
                        <img src={"/check.png"} style={{ width: "3%",cursor:"pointer" }} onClick={() => {
                            setIsShow(!is_show);
                        }} />
                        </div>)
                )}

            <div className="w-full relative">
                {question &&
                    is_show &&
                    is_doing == EXAM_STATUS.VIEW && <>
                        {
                            question.explain.length ?
                                <div className="flex justify-center"> <TitleQuestion question_type={question.type} items={question.explain} /></div>
                                : handleContentRender(question)
                        }
                    </>}
            </div>
        </div>
    )
}

export default SolutionView