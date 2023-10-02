import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ExamHook } from "../../store/exam/hooks";
import { ElementRender } from "question-convert";
import ListItem from "./ListItem";

const DraggableElementAnswers = ({
  prefix,
  elements,
}: {
  prefix: string;
  elements: ElementRender[];
}) => {
  const is_doing = ExamHook.useIsDoing();

  return (
    <div className="flex justify-center px-10 min-w-full min-h-full">
      <Droppable
        droppableId={`${prefix}`}
        isDropDisabled={is_doing === 3 ? true : false}
      >
        {(provided) => (
          <div
            className=" flex min-w-full flex-wrap justify-center"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {elements.map((item: ElementRender, index: number) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DraggableElementAnswers;
