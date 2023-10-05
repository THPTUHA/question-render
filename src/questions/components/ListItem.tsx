import { Draggable } from "react-beautiful-dnd";
import { ElementRender } from "question-convert";
import { EXAM_STATUS } from "../../constants";

const ListItem = ({
  item,
  index,
  check,
  exam_status,
}: {
  item: ElementRender;
  index: number;
  check?: boolean;
  exam_status: number;
}) => {
  return (
    //@ts-ignore
    <Draggable draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <div
            className={
              exam_status === EXAM_STATUS.VIEW
                ? `border-2 rounded-[5px] px-5 m-2 ${check ? "border-[#22c55e]" : "border-[#ff0000]"
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
