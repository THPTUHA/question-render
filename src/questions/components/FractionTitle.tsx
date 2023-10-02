import React from "react";
import classCheckResult from "../../helper/classCheckResult";
import formatUnit from "../../helper/formatUnit";
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
        <span className="center">
          <input
            disabled={result ? true : false}
            type={"text"}
            style={{ width: `${text.length > 0 ? (text.length === 1 ? 2 : text.length + 1) : 2}ch` }}
            className={`border-2 rounded-[5px] h-[24px] text-xl text-center 
                         bg-slate-200 ${classCheckResult(answer_pupil, is_view, solution, result)}`}
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
        </span>
      ) : (
        <span className="mx-1 center text-center text-[24px]">{dataItem}</span>
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

  const format_data = (str: any) => {
    if (str && str.includes(')-')) {
        let txt = str.slice(1, str.length - 2).trim();
        return formatUnit(txt)
    };
    return formatUnit(str);
  }

  const RenderItem = () => {
    return (
      <>
        {item?.data?.length === 2 ? (
          <span className="inline-flex flex-col align-middle text-xl">
              <CheckTypeRender
                dataItem={format_data(item.data[0])}
                a_index={a_index}
                i_index={i_index}
                is_view={is_view}
                f_index={0}
                q_id={q_id}
              />
              <span className="border-t-2 border-t-solid border-[#243c5a] center">
                <CheckTypeRender
                  dataItem={format_data(item.data[1])}
                  a_index={a_index}
                  i_index={i_index}
                  is_view={is_view}
                  f_index={1}
                  q_id={q_id}
                />
              </span>
            </span>
            ) : (
              <span className="">
                <span className=" mr-1">
                  <CheckTypeRender
                    dataItem={format_data(item.data[0])}
                    a_index={a_index}
                    i_index={i_index}
                    is_view={is_view}
                    f_index={0}
                    q_id={q_id}
                  />
                </span>
                <span className="inline-flex flex-col align-middle text-xl">
                <CheckTypeRender
                  dataItem={format_data(item.data[1])}
                  a_index={a_index}
                  i_index={i_index}
                  is_view={is_view}
                  f_index={1}
                  q_id={q_id}
                />
                <span className="border-t-2 border-t-solid border-[#243c5a] center">
                  <CheckTypeRender
                    dataItem={(item.data[2])}
                    a_index={a_index}
                    i_index={i_index}
                    is_view={is_view}
                    f_index={2}
                    q_id={q_id}
                  />
                </span>
            </span>
          </span>
        )}
      </>
    );
  };

  return (
    <span className="">
      {Array.isArray(item.data) && <RenderItem />}
    </span>
  );
};

export default Fraction;
