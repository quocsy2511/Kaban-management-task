/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

const Subtask = ({ colIndex, index, taskIndex }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((state) => state.isActive);
  const columns = board.columns;
  const col = columns.find((item, index) => index === colIndex);
  const task = col.tasks.find((item, index) => index === taskIndex);
  const subtask = task.subtasks.find((item, i) => i === index);
  const checkedSubtask = subtask.isCompleted;

  const changStatusSubtask = () => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({
        index,
        taskIndex,
        colIndex,
      })
    );
  };

  return (
    <div className="flex w-full hover:bg-secondaryHover dark:hover:bg-secondaryHover rounded-lg relative items-center justify-start dark:bg-darkSecondary p-3 gap-4 bg-sideBarBg">
      <input
        type="checkbox"
        className="h-4 w-4 accent-secondary cursor-pointer"
        checked={checkedSubtask}
        onChange={changStatusSubtask}
      />
      <p
        className={
          checkedSubtask
            ? "line-through decoration-red-700 decoration-2 opacity-30  "
            : ""
        }
      >
        {subtask.title}
      </p>
    </div>
  );
};

export default Subtask;
