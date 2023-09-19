/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import EllipsisMenu from "../components/EllipsisMenu";
import Subtask from "../components/Subtask";
import boardsSlice from "../redux/boardsSlice";
import DeleteModal from "../modals/DeleteModal";
import AddEditTaskModal from "./AddEditTaskModal";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";

const TaskModal = ({ colIndex, taskIndex, setIsTaskOpenModal }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((state) => state.isActive);
  const columns = board.columns;
  const col = columns.find((item, index) => index === colIndex);
  const task = col.tasks.find((item, index) => index === taskIndex);
  const subtasks = task.subtasks;
  const [status, setStatus] = useState(task.status);
  const [ellipsisMenuOpen, setEllipsisMenuOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [watch, setWatch] = useState(false);

  let completed = 0;

  subtasks.forEach((subtasks) => {
    if (subtasks.isCompleted) {
      completed++;
    }
  });

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setEllipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setEllipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskOpenModal(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
      setIsTaskOpenModal(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center px-2 py-4 overflow-scroll scrollbar-default bg-darkDropDown"
      onClick={onClose}
    >
      {/* Modal Section */}

      <div
        className="scrollbar-hide overflow-y-hidden max-h-min max-w-[434px] w-full bg-white dark:bg-dark text-black
      dark:text-white font-bold shadow-md shadow-darkShadow mx-auto px-8 py-8 rounded-xl my-auto"
      >
        <div className="flex relative justify-between items-center w-full">
          <div className="flex items-center gap-x-2 justify-center">
            <h3 className="text-lg font-bold ">{task.title}</h3>
            {watch && (
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
          </div>
          <img
            src={ellipsis}
            alt="more"
            className="cursor-pointer h-6 "
            onClick={() => {
              setEllipsisMenuOpen((prev) => !prev);
            }}
          />
          {ellipsisMenuOpen && (
            <EllipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            ></EllipsisMenu>
          )}
        </div>

        <div className="mt-6 flex gap-x-9">
          {/* member */}
          <div>
            <p className=" text-gray-500 text-sm ">Members</p>
            <div className="flex justify-start items-center mt-1 flex-wrap">
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
                <li>
                  <div className=" w-6 h-6 items-center justify-center flex  bg-btnSecondary rounded-full hover:bg-secondary hover:text-white dark:hover:bg-secondary text-gray-400">
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* watch */}
          <div>
            <p className=" text-gray-500 text-sm ">Notification</p>
            <div
              className="flex justify-start items-center gap-x-2 dark:bg-secondaryHover bg-gray-100 px-2 py-[2px] cursor-pointer rounded-md mt-1"
              onClick={() => setWatch((prev) => !prev)}
            >
              {watch ? (
                <>
                  <p className="dark:text-green-400 text-green-600">
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
                  <p className="  dark:text-green-400 text-green-600 tracking-widest text-sm font-semibold ">
                    Watching
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-500 ">
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
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  </p>
                  <button className=" text-gray-500 tracking-widest text-sm font-semibold ">
                    Watch
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="mt-6">
          <p className=" text-gray-500 text-sm ">Date</p>
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
        </div>
        <p className="text-gray-500 text-sm font-semibold pt-6 tracking-wide">
          {task.description && task.description.trim() !== ""
            ? task.description
            : "This task no have description"}
        </p>
        <p className="pt-6 text-gray-500 text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        {/* Subtask Section */}
        <div className="mt-3 space-y-2">
          {subtasks.length > 0 &&
            subtasks.map((item, index) => (
              <Subtask
                key={index}
                colIndex={colIndex} //là col todo hay doing hay done là ô nội
                taskIndex={taskIndex} // là vị trí task cha bác cô gì của mỗi task ô nội
                index={index} //là vị trí thằng con trong mảng subtask của mỗi thằng task cha
              ></Subtask>
            ))}
        </div>

        {/* Current status Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        ></DeleteModal>
      )}
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          // device="mobile"
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
          setOpenAddEditTask={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskOpenModal}
        ></AddEditTaskModal>
      )}
    </div>
  );
};

export default TaskModal;
