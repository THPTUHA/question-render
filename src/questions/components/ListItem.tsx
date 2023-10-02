import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ElementRender } from "question-convert";

const ListItem = ({
  item,
  index,
  check,
  is_doing,
}: {
  item: ElementRender;
  index: number;
  check?: boolean;
  is_doing?: any;
}) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <div
            className={
              is_doing === 3
                ? `border-2 rounded-[5px] px-5 m-2 ${
                check ? "border-[#22c55e]" : "border-[#ff0000]"
                  }`
                : `border-2 rounded-[5px] border-dashed px-5 m-2 border-[#FF6700]`
            }
            ref={provided.innerRef}
            // snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span className=" items-center flex justify-center text-lg">
              {item.content}
            </span>
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
