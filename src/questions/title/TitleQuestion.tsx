import React, { useMemo } from "react";
import { ITEM_TYPE, QUESTION_TYPE } from "question-convert";
import { Item } from "question-convert";
import AudioPlay from "../components/AudioPlay";
import BreakLine from "../components/BreakLine";
import FractionTitle from "../components/FractionTitle";

import Image from "../components/Image";
import Text from "../components/Text";
import formatUnit from "../../helper/formatUnit";

const TitleQuestion = ({
  items,
  question_type,
}: {
  items: Item[];
  question_type: any;
}) => {
  const item_renders = useMemo(() => {
    const elements = [];
    let inline = [];
    for (const item of items) {
      if (item.type == ITEM_TYPE.BREAKLINE) {
        elements.push({
          type: ITEM_TYPE.INLINE,
          data: inline,
        });

        inline = [];
        elements.push(item);
      } else {
        inline.push(item);
      }
    }
    if (inline.length) {
      elements.push({
        type: ITEM_TYPE.INLINE,
        data: inline,
      });
    }
    return elements;
  }, [items]);

  const format_data = (str: any) => {
    if (str && str.includes(")-")) {
      let txt = str.slice(1, str.length - 2).trim();
      return formatUnit(txt);
    }
    return formatUnit(str);
  };

  return (
    <>
      {item_renders.map((item, _index) => {
        if (item.type == ITEM_TYPE.BREAKLINE) {
          return <BreakLine />;
        }
        if (item.type == ITEM_TYPE.INLINE) {
          return (
            <span className={`${"items-center"}`} key={_index}>
              {Array.isArray(item.data) &&
                item.data.map((item, index) => (
                  <span key={index}>
                    <span>
                      {typeof item != "string" &&
                        item.type == ITEM_TYPE.TEXT &&
                        typeof item.data == "string" && (
                          <span
                            className={`${
                              item.data.includes(")-")
                                ? "border-t-2 border-black"
                                : ""
                            }`}
                          >
                            <Text str={format_data(item.data)} />
                          </span>
                        )}
                    </span>
                    {question_type === QUESTION_TYPE.TA_004 &&
                      typeof item != "string" &&
                      item.type == ITEM_TYPE.IMG &&
                      typeof item.data == "string" && (
                        <span className="items-center justify-center flex mt-10">
                          <Image src={item.data} className=" h-60" />
                        </span>
                      )}
                    {typeof item != "string" &&
                      item.type == ITEM_TYPE.FRACTION && (
                        <FractionTitle
                          item={item}
                          a_index={0}
                          i_index={0}
                          q_id={0}
                          is_view={true}
                        />
                      )}
                    {typeof item != "string" &&
                      item.type == ITEM_TYPE.INPUT && (
                        <span
                          className={`h-8 w-8 bg-gray-300 rounded-lg 
                                          display-inline-block position-relative 
                                          ${
                                            [
                                              QUESTION_TYPE.CH_010,
                                              QUESTION_TYPE.CH_006,
                                            ].includes(question_type)
                                              ? "top-[10px]"
                                              : "mt-2 mx-4"
                                          }`}
                        ></span>
                      )}
                    {question_type !== QUESTION_TYPE.TV_007 &&
                      typeof item != "string" &&
                      item.type == ITEM_TYPE.AUDIO &&
                      typeof item.data == "string" && (
                        <div
                          className={`${
                            [
                              QUESTION_TYPE.TA_004,
                              QUESTION_TYPE.TA_013,
                            ].includes(question_type)
                              ? "inline"
                              : ""
                          }`}
                        >
                          <AudioPlay
                            className={`${
                              [
                                QUESTION_TYPE.TA_004,
                                QUESTION_TYPE.TA_013,
                              ].includes(question_type)
                                ? "inline"
                                : ""
                            }`}
                            classNameImage={`${
                              [
                                QUESTION_TYPE.TA_004,
                                QUESTION_TYPE.TA_013,
                              ].includes(question_type)
                                ? "inline"
                                : ""
                            }`}
                            url={item.data}
                          />
                        </div>
                      )}
                  </span>
                ))}
            </span>
          );
        }
        return <React.Fragment key={_index}></React.Fragment>;
      })}

      {question_type !== QUESTION_TYPE.TA_004 &&
        items.map((item, index) => (
          <div key={index} className="flex flex-col">
            {item.type == ITEM_TYPE.IMG && typeof item.data == "string" && (
              <div className=" items-center justify-center flex mt-10">
                <Image src={item.data} className=" " />
              </div>
            )}
          </div>
        ))}
      {items.map((item, index) => (
        <div key={index} className="px-10 mt-5">
          {question_type === QUESTION_TYPE.TV_007 &&
            typeof item != "string" &&
            item.type == ITEM_TYPE.AUDIO &&
            typeof item.data == "string" && (
              <div className="items-center px-2 py-2 mx-5 border-2 border-dashed rounded-[10px] border-[#FF6700] flex">
                {/* <AudioPlay url={item.data} /> */}
                <audio controls>
                  <source src={item.data} type="audio/ogg" />
                  <source src={item.data} type="audio/mpeg" />
                </audio>
              </div>
            )}
        </div>
      ))}
    </>
  );
};

export default TitleQuestion;
