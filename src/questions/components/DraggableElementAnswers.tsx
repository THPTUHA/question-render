import { Droppable } from "react-beautiful-dnd";
import { ElementRender } from "question-convert";
import ListItem from "./ListItem";
import { EXAM_STATUS } from "../../constants";

const DraggableElementAnswers = ({
  prefix,
  elements,
  exam_status,
}: {
  prefix: string;
  elements: ElementRender[];
  exam_status: number;
}) => {

  return (
    <div className="flex justify-center px-10 min-w-full min-h-full">
     {
        //@ts-ignore
        <Droppable
          droppableId={`${prefix}`}
          isDropDisabled={exam_status === EXAM_STATUS.VIEW ? true : false}
        >
          {(provided) => (
            <div
              className=" flex min-w-full flex-wrap justify-center"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {elements.map((item: ElementRender, index: number) => (
                <ListItem
                  key={item.id}
                  item={item}
                  index={index}
                  exam_status={exam_status}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
     }
    </div>
  );
};

export default DraggableElementAnswers;
