import React, { useMemo } from "react";
import { ITEM_TYPE, QUESTION_TYPE } from "question-convert";
import { Item } from "question-convert";
import Image from "../components/Image";
import Text from "../components/Text";

const TitleQuestionLTVC = ({ items, question_type }: { items: Item[], question_type: string }) => {
    const item_renders = useMemo(() => {
        const content: any = [];
        let author;
        let elements = [];
        for (const item of items) {
            if (item.type == ITEM_TYPE.READ_ND) {
                content.push({
                    data: item.data
                });
            } else if (item.type == ITEM_TYPE.READ_TG) {
                author = item.data
            } else {
                elements.push(item);
            }
        }
        elements.push({
            type: ITEM_TYPE.READ_ND,
            data: content
        })
        elements.push({
            type: ITEM_TYPE.READ_TG,
            data: author
        })
        return elements;
    }, [items]);
    return (
        <>
            {item_renders.map((item, index) => (
                <div key={index} className="flex flex-col">
                    {item.type == ITEM_TYPE.IMG && typeof item.data == "string" && (
                        <div className=" items-center justify-center flex mt-10">
                            <Image
                                src={item.data}
                                className=" h-60"
                            />
                        </div>
                    )}
                    {item.type == ITEM_TYPE.READ_TD && typeof item.data == "string" && (
                        <div className="text-center mt-4 font-bold">{item.data}</div>
                    )}
                    <div className="flex justify-around mt-1 px-5">
                        {item.type == ITEM_TYPE.READ_ND &&
                            Array.isArray(item.data) &&
                            item.data.map((item_child_1: any, i_child_1: number) => (
                                <div key={i_child_1} className={question_type === QUESTION_TYPE.TV_011 ? 'text-center' : ''}>
                                    {Array.isArray(item_child_1.data) &&
                                        item_child_1.data.map((item_child_2: any, i_child_2: number) => (
                                            <Text key={i_child_2 + i_child_1} str={item_child_2.data} />
                                        ))
                                    }
                                </div>
                            ))}
                    </div>
                    {item.type == ITEM_TYPE.READ_TG && typeof item.data == "string" && (
                        <div className="mt-4 ml-4">Tác giả: {item.data}</div>
                    )}
                </div>
            ))}
        </>
    );
}

export default TitleQuestionLTVC
