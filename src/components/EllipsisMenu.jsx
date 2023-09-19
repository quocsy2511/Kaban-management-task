/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const EllipsisMenu = ({
  type,
  setIsEllipsisOpen,
  setOpenEditModal,
  setOpenDeleteModal,
}) => {
  return (
    <div
      className={
        type === "Boards" ? "absolute top-16 right-5" : "absolute top-6 right-4"
      }
    >
      <div className="flex justify-end items-center">
        <div
          className=" w-40 text-sm z-50 font-medium shadow-md shadow-darkShadow bg-gray-300 space-y-4
        py-5 px-4 rounded-lg h-auto pr-12 dark:bg-darkSecondary"
        >
          <p
            className=" cursor-pointer hover:text-secondary dark:text-gray-400 text-gray-700 dark:hover:text-secondary"
            onClick={() => {
              setOpenEditModal();
            }}
          >
            Edit {type}
          </p>
          <p
            className=" cursor-pointer hover:text-rose-300   text-red-700"
            onClick={() => {
              setOpenDeleteModal();
            }}
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EllipsisMenu;
