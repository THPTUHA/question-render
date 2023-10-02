import React from "react";
import classCheckResult from "../../helper/classCheckResult";
import { ExamFunctions } from "../../store/exam/functions";
import { ExamHook } from "../../store/exam/hooks";

const CheckTypeRender = ({
  dataItem,
  q_id,
  a_index,
  i_index,
  f_index,
  is_view,
}: {
  dataItem: any;
  q_id: number,
  a_index: number;
  i_index: number;
  f_index: number,
  is_view?: any;
}) => {
  const answer_pupil = ExamHook.useAnswerPupil({ a_index, i_index, f_index , q_id});
  const result = ExamHook.useResult();
  const solution = ExamHook.useSolution({ a_index, i_index, f_index, q_id });
  const focus = ExamHook.useFocus();
  const text = is_view ? solution ?? "" : answer_pupil ?? "";

  return (
    <>
      {dataItem === "[]" ? (
        <div>
          <input
            disabled={result ? true : false}
            type={"text"}
            style={{ width: `${text.length > 0 ? (text.length === 1 ? 2 : text.length + 1) : 2}ch` }}
            className={`border-2 rounded-[5px] text-xl text-center 
                        mb-1 bg-slate-200 ${classCheckResult(answer_pupil, is_view, solution, result)}`}
            value={text}
            onChange={(e) => {
              // setText(e.target.value)
              ExamFunctions.answer(
                { a_index, i_index, f_index },
                e.target.value
              );
            }}
            autoFocus={focus === a_index + "#" + i_index + "#" + f_index}
          />
        </div>
      ) : (
        <p className="mx-1 center text-center">{dataItem}</p>
      )}
    </>
  );
};

const Fraction = ({
  item,
  q_id,
  a_index,
  i_index,
  is_view,
}: {
  item: any;
  q_id: number,
  a_index: number;
  i_index: number;
  is_view?: boolean;
}) => {

  const RenderItem = () => {
    return (
      <span>
        {item?.data?.length === 2 ? (
          <span className=" flex flex-col relative justify-items-center items-center">
            <span className=" border-b-2 border-[black] mb-1">
              <CheckTypeRender
                dataItem={item.data[0]}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                f_index={0}
                q_id={q_id}
              />
            </span>
            <CheckTypeRender
              dataItem={item.data[1]}
              a_index={a_index}
              i_index={i_index}
              is_view={is_view}
              f_index={1}
              q_id={q_id}
            />
          </span>
        ) : (
          <div className=" flex items-center justify-center">
            <span className=" mr-1">
              <CheckTypeRender
                dataItem={item.data[0]}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                f_index={0}
                q_id={q_id}
              />
            </span>
            <div className="flex flex-col relative justify-items-center mr-4 items-center">
              <span className=" border-b-2 border-[black] mb-1">
                <CheckTypeRender
                  dataItem={item.data[1]}
                  a_index={a_index}
                  i_index={i_index}
                  is_view={is_view}
                  f_index={1}
                  q_id={q_id}
                />
              </span>
              <CheckTypeRender
                dataItem={item.data[2]}
                a_index={a_index}
                is_view={is_view}
                i_index={i_index}
                f_index={2}
                q_id={q_id}
              />
            </div>
          </div>
        )}
      </span>
    );
  };

  return (
    <div className="flex items-center justify-items-center">
      {Array.isArray(item.data) && <RenderItem />}
    </div>
  );
};

export default Fraction;
