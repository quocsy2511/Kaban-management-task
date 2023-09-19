/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars

import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import boardsSlice from "../redux/boardsSlice";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import TaskModal from "../modals/TaskModal";

const Column = ({ colIndex }) => {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((state) => state.isActive);
  const col = board.columns.find((item, index) => index === colIndex);
  // console.log("col : ", col);
  const col2 = board.columns;
  const [color, setColor] = useState(null);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);

  //xử lí ngăn cho load lại trang khi đang kéo phẩn tử
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  //xử lí phần từ sau khi được kéo thả ra :D
  const handleOnDrag = (e) => {
    // đầu tiên lấy 2 tham số mà đã set ở bên thằng Task ra (ở bên đó mình lưu tụi nó Json thì ở đây phải parse nó lại mảng) bằng getData
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );
    // console.log("taskIndex : ", taskIndex);
    // console.log("prevColIndex : ", prevColIndex);

    //đoạn này là xử lí khi nó được kéo qua 1 cột mới
    if (colIndex !== prevColIndex) {
      // console.log("prevColIndex : ", prevColIndex);
      // console.log("colIndex : ", colIndex); 
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
      // dispatch(boardsSlice.actions.setTaskStatus({}))
    }
  };

  useEffect(() => {
    setColor(shuffle(colors).pop()); //là nó sẽ trộn random bảng màu của Colors rồi  -> pop() sẽ làm nhiệm vụ xoá thằng đó ra khỏi mảng và trả về cái đó
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); //[dispatch] chỉ đơn giản là một cách để đảm bảo hiệu ứng này chỉ chạy một lần khi component được tạo lần đầu.

  return (
    <>
      <div
        className="scrollbar-hide pt-[90px] min-w-[280px] "
        onDrop={handleOnDrag} // khi bạn thả một phần tử vào phần tử <div>.
        onDragOver={handleOnDragOver} // Sự kiện này sẽ kích hoạt khi một phần tử đang được kéo và nằm trên phần tử <div>.
      >
        <div className=" bg-gray-100 dark:bg-secondaryHover py-3 scrollbar-hide rounded-xl shadow-darkShadow shadow-sm">
          <div className="font-semibold flex items-center gap-2 tracking-widest text-textCol dark:text-white px-4 justify-between ">
            <p className="flex items-center gap-2 ">
              <span className={`rounded-full w-4 h-4 ${color}`}></span>
              {col.name}({col.tasks?.length || `${0}`})
            </p>

            <span className="text-xs font-normal text-gray-400 underline underline-offset-4  ">
              {col.time}
            </span>
          </div>
          {col &&
            col.tasks?.map((item, index) => (
              <Task key={index} colIndex={colIndex} taskIndex={index}></Task>
            ))}
          <div
            className=" w-[250px] mx-auto mt-5 rounded-lg py-3 px-3 hover:text-secondary  text-gray-400 dark:hover:text-white dark:hover:bg-secondary  cursor-pointer hover:bg-white"
            onClick={() => setOpenAddEditTask((prev) => !prev)}
          >
            {/* <p className="font-normal text-sm tracking-wide"> +add new task</p> */}
            <p className="text-base font-semibold tracking-tighter">
              + Add a task
            </p>
          </div>
        </div>
      </div>
      {openAddEditTask && (
        <AddEditTaskModal
          prevColIndex={colIndex}
          statusNew={col.name}
          // openAddEditTask={openAddEditTask}
          setOpenAddEditTask={setOpenAddEditTask}
          // device="mobile"
          type="add"
        ></AddEditTaskModal>
      )}
    </>
  );
};

export default Column;
