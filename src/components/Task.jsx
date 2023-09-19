/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";

const Task = ({ colIndex, taskIndex }) => {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((state) => state.isActive);
  const columns = board.columns;
  const col = columns.find((item, index) => index === colIndex);
  const task = col.tasks.find((item, index) => index === taskIndex);
  const [isTaskOpenModal, setIsTaskOpenModal] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtasks) => {
    if (subtasks.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    //dataTransfer: Là một đối tượng trong sự kiện kéo (drag event) chứa thông tin về dữ liệu được kéo và thả. 
    //setData : là lấy cái data trong div của m kéo bỏ vô dataTransfer 2  đối só là 
    // 1 : text là loại dữ liệu ở đây là vẵn bản
    // 2 : là data ,  ở đây nó đc chuyển qua 1 chuỗi String 
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <>
      <div
        draggable //cho phép phần tử này trở thành một mục tiêu kéo và thả, 
        onDragStart={handleOnDrag} //khi bạn bắt đầu kéo một phần tử.
        className="w-[250px] mx-auto my-5 rounded-lg bg-white dark:bg-dark shadow-darkShadow py-3 px-3 shadow-lg hover:opacity-80 dark:text-white cursor-pointer"
        onClick={() => {
          setIsTaskOpenModal(true);
        }}
      >
        <p className="font-normal text-sm tracking-wide hover:text-secondary dark:hover:text-secondary ">
          {task.title}
        </p>

        {/* summary */}
        <div className="flex justify-start items-center gap-x-2 cursor-pointer mt-1 flex-wrap">
          {task.watched && (
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </p>
          )}
          {task.time && (
            <p
              className={`px-[6px] py-[2px] w-fit text-xs font-medium flex justify-start items-center gap-x-1 ${
                task.color === "red"
                  ? "bg-red-300 bg-opacity-20 text-red-600 dark:bg-red-600 dark:bg-opacity-40 dark:text-red-400 rounded-md"
                  : task.color === "green"
                  ? "bg-green-300 bg-opacity-20 text-green-600 dark:bg-green-600 dark:bg-opacity-40 dark:text-green-400 rounded-md"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {task.time}
            </p>
          )}
          {task.comment?.length > 0 && (
            <p className="flex justify-center items-center gap-x-1 text-xs font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              {task.comment.length}
            </p>
          )}
          {task.attachments?.length > 0 && (
            <p className="flex justify-center items-center gap-x-1 text-xs font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>

              {task.attachments.length}
            </p>
          )}
        </div>

        <p className="mt-2 text-xs font-normal tracking-tighter text-gray-500">
          {completed}/{subtasks.length} completed
        </p>
        <div className="flex justify-end items-center mt-4">
          <ul className="flex space-x-1 cursor-pointer ">
            <li>
              <img
                src={avatar1}
                alt="avatar"
                className="h-6 w-6 object-cover rounded-full hover:opacity-80"
              />
            </li>
            <li>
              <img
                src={avatar2}
                alt="avatar"
                className="h-6 w-6 object-cover rounded-full hover:opacity-80"
              />
            </li>
            <li>
              <img
                src={avatar3}
                alt="avatar"
                className="h-6 w-6 object-cover rounded-full hover:opacity-80"
              />
            </li>
          </ul>
        </div>
      </div>
      {isTaskOpenModal && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskOpenModal={setIsTaskOpenModal}
        ></TaskModal>
      )}
    </>
  );
};

export default Task;
