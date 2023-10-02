import React from "react";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DraggableElement from "../components/DraggableElement";
import DraggableElementAnswers from "../components/DraggableElementAnswers";
import {
  AnswerRender,
  ElementRender,
  Item,
  QuestionRender,
} from "question-convert";
import { ITEM_TYPE } from "question-convert";
import { ExamFunctions } from "../../store/exam/functions";

const DragDropContextContainer = styled.div`
  padding: 20px;
`;

const MAIN_BOARD = "main";

type Elements = {
  [key: string]: ElementRender[];
};

type GroupComp = {
  id: string;
  label: Item[];
};

const removeFromList = (list: ElementRender[], index: number) => {
  const [removed] = list.splice(index, 1);
  return removed;
};

const addToList = (
  list: ElementRender[],
  index: number,
  element: ElementRender
) => {
  list.splice(index, 0, element);
  return list;
};

const generateLists = (
  lists: GroupComp[],
  answers: AnswerRender[]
): Elements => {
  const rel = lists.reduce((acc, comp) => {
    return {
      ...acc,
      [comp.id]: answers
        .filter((ans) => ans.label === comp.id)
        .map((ans) => {
          return {
            id: ans.id,
            prefix: comp.id,
            content: ans.content[0].data,
            label: comp.label,
          };
        }),
    };
  }, {});
  // console.log({ rel })
  return rel;
};

function DragDropGroup({
  question,
  is_view,
  preview,
}: {
  question: QuestionRender;
  is_view?: boolean;
  preview?: boolean;
}) {

  const [elements, setElements] = useState<Elements>({});
  const [solution, setSolution] = useState<Elements>({});

  const lists = useMemo(() => {
    let result: GroupComp[] = [];

    const group = question.title.filter(
      (item) => item.type === ITEM_TYPE.GROUP
    )[0];

    if (group && typeof group.data == "object" && !Array.isArray(group.data)) {
      const keys = Object.keys(group.data);
      for (const key of keys) {
        result.push({
          id: key,
          label: group.data[key],
        });
      }
      result.push({
        id: MAIN_BOARD,
        label: [
          {
            type: ITEM_TYPE.TEXT,
            data: MAIN_BOARD,
          },
        ],
      });
    }

    const elemets = generateLists(result, question.answers);
    setElements(elemets);
    return result;
  }, [question]);

  useEffect(() => {
    //đáp án
    let newArr: AnswerRender[] = [];
    Object.keys(question.solutions).forEach((key) => {
      let value = question.solutions[key];
      question.answers.map((item) => {
        if (value.indexOf(item.id) != -1) {
          item = { ...item, label: key };
          newArr.push(item);
        }
      });
    });
    let sol = generateLists(lists, newArr);
    setSolution(sol);
  }, [question]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    ExamFunctions.dragToBoard({
      src_index: result.source.index,
      src_label: result.source.droppableId,
      dist_index: result.destination.index,
      dist_label: result.destination.droppableId,
    });
    const sourceList = listCopy[result.source.droppableId];
    const removedElement = removeFromList(sourceList, result.source.index);

    listCopy[result.source.droppableId] = sourceList;

    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setElements(listCopy);
  };

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-around">
          {lists.map(
            (comp, index) =>
              comp.id !== MAIN_BOARD && (
                <span key={index} className=" flex-1">
                  <DraggableElement
                    elements={
                      is_view && solution
                        ? solution[comp.id]
                        : elements[comp.id]
                    }
                    key={index}
                    prefix={comp.id}
                    is_view={is_view}
                    label={comp.label}
                    solution={solution}
                    preview={preview}
                  />
                </span>
              )
          )}
        </div>
        {!is_view && (
          <div className="flex items-center justify-center mt-5">
            {lists.map(
              (comp, index) =>
                comp.id === MAIN_BOARD && (
                  <DraggableElementAnswers
                    elements={elements[comp.id]}
                    key={index}
                    prefix={comp.id}
                  />
                )
            )}
          </div>
        )}
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default DragDropGroup;
