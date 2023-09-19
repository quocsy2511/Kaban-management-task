/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import AddEditBoardModal from "../modals/AddEditBoardModal";

const Center = ({ setBoardOpenModal, boardOpenModal }) => {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((state) => state.isActive === true);
  const columns = board.columns;
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? "bg-gradient-to-bl from-secondary to-blue-50 dark:bg-darkSecondary dark:from-slate-900 dark:to-secondaryHover flex h-screen scrollbar-hide overflow-x-scroll gap-6 ml-[261px]"
          : "bg-gradient-to-bl from-secondary to-blue-50 dark:bg-darkSecondary dark:from-slate-900 dark:to-secondaryHover  flex h-screen scrollbar-hide overflow-x-scroll gap-6 "
      }
    >
      {/* sideBar */}
      {windowSize[0] >= 768 && (
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        ></SideBar>
      )}

      {/* columns Section */}
      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index}></Column>
          ))}

          {/* default add new col */}
          {/* <div
            className="h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-secondary transition duration-300 cursor-pointer bg-[#e9effa] scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828fa3] mt-[135px] rounded-lg"
            onClick={() => {
              setBoardOpenModal(true);
            }}
          >
            + New Column
          </div> */}

          <div className=" scrollbar-hide  pt-[90px] min-w-[280px]  mb-2 mr-5 ">
            <div
              className="text-gray-400  hover:text-secondary dark:hover:text-white dark:bg-secondaryHover  bg-[#e9effa]  py-3 scrollbar-hide rounded-lg shadow-darkShadow shadow-sm  hover:bg-gray-100 dark:hover:bg-secondary transition duration-300  cursor-pointer"
              onClick={() => {
                setBoardOpenModal(true);
              }}
            >
              <p className="font-semibold flex items-center gap-2  pl-4">
                + Add other list
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <EmptyBoard type="edit"></EmptyBoard>
        </>
      )}

      {boardOpenModal && (
        <AddEditBoardModal
          type="edit"
          setBoardOpenModal={setBoardOpenModal}
        ></AddEditBoardModal>
      )}
    </div>
  );
};

export default Center;
