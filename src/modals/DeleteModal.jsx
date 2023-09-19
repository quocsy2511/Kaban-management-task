/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const DeleteModal = ({
  type,
  title,
  onDeleteBtnClick,
  setIsDeleteModalOpen,
}) => {
  return (
    <div
      className="my-auto fixed right-0 left-0 bottom-0  top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-darkDropDown"
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setIsDeleteModalOpen(false);
      }}
    >
      <div className="bg-white w-full px-8 py-8 scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto text-black rounded-lg dark:bg-dark dark:text-gray-300 max-w-md">
        <h3 className="font-medium text-lg text-red-400 text-center dark:text-red-500">
          Delete this {type} ?
        </h3>
        {type === "task" ? (
          <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6 ">
            Are you sure you want to delete the{" "}
            <span className="text-green-600 font-bold text-sm">
              {" "}
              {`" ${title} "`}{" "}
            </span>{" "}
            task and its subtasks? This action cannot be reversed.
          </p>
        ) : (
          <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6 dark:text-white">
            Are you sure you want to delete the{" "}
            <span className="text-green-600 font-bold text-sm dark:text-green-500">
              {" "}
              {`" ${title} "`}{" "}
            </span>{" "}
            board? This action will remove all columns and tasks and cannot be
            reversed.
          </p>
        )}

        <div className="flex justify-center items-center space-x-4  w-full mt-4 ">
          <button
            className="font-semibold  w-full items-center bg-red-500 py-[2px] text-white rounded-full hover:opacity-75"
            onClick={onDeleteBtnClick}
          >
            Delete
          </button>
          <button
            className="font-semibold  w-full items-center py-[2px] bg-[#635fc71a] text-secondary rounded-full hover:opacity-75"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
