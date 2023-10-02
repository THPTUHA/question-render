import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ExamHook } from "../../store/exam/hooks";
import { ElementRender, Item } from "question-convert";
import AudioPlay from "./AudioPlay";
import Image from "./Image";
import ListItem from "./ListItem";
import Text from "./Text";
import { ITEM_TYPE } from "question-convert";

const DraggableElement = ({
  prefix,
  elements,
  label,
  solution,
  preview,
}: {
  prefix: string;
  elements: ElementRender[];
  is_view?: boolean;
  label: Item[];
  solution: any;
  preview: any;
}) => {
  const is_doing = ExamHook.useIsDoing();
  return (
    <div
      className={` border-2 rounded-[10px] border-[#FF6700] grow ${
        preview ? "mx-1" : "mx-2"
      }`}
    >
      <div className=" rounded-t-[8px] flex justify-center py-2 border-b border-[#FF6700]">
        {label.map((item, index) => (
          <div key={index} className=" text-center text-lg">
            {item.type === ITEM_TYPE.TEXT && typeof item.data === "string" && (
              <Text str={item.data} />
            )}
            {item.type === ITEM_TYPE.AUDIO && typeof item.data === "string" && (
              <div className=" mr-2">
                <AudioPlay url={item.data} />
              </div>
            )}
            {item.type === ITEM_TYPE.IMG && typeof item.data === "string" && (
              <Image src={item.data} />
            )}
          </div>
        ))}
      </div>
      <Droppable
        droppableId={`${prefix}`}
        isDropDisabled={is_doing === 3 ? true : false}
      >
        {(provided) => (
          <div
            className={` ${elements && elements.length === 0 ? "py-6" : "p-3"} items-center`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {elements &&
              elements.map((item, index) => {
                let check;
                if (is_doing === 3) {
                  solution[item.prefix]?.map((i: any) => {
                    if (i.id === item.id) {
                      check = true;
                    }
                  });
                }
                return (
                  <ListItem
                    key={item.id}
                    item={item}
                    index={index}
                    check={check}
                    is_doing={is_doing}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DraggableElement;
