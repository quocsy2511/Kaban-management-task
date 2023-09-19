/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDarkMode from "../hook/useDarkMode";
import boardsSlice from "../redux/boardsSlice";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import { Switch } from "@headlessui/react";
import darkIcon from "../assets/icon-dark-theme.svg";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";

const SideBar = ({ setIsSideBarOpen, isSideBarOpen }) => {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };
  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-dark  fixed top-[72px] h-screen  items-center left-0 z-20`
            : ` bg-secondary dark:bg-dark dark:hover:bg-secondary top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed flex w-[56px] h-[48px] rounded-r-full  `
        }
      >
        <div>
          {/* Rewrite modal */}
          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-dark    w-full   py-4 rounded-xl">
              <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className="  dropdown-borad flex flex-col h-[70vh]  justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-btnSecondary hover:text-secondary dark:hover:bg-white dark:hover:text-secondary dark:text-white  ${
                        board.isActive &&
                        " bg-secondary rounded-r-full text-white mr-8 "
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="  filter-white  h-4 " />{" "}
                      <p className=" text-lg font-bold ">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className=" flex  items-baseline space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-secondary px-5 py-4 hover:bg-btnSecondary hover:text-secondary dark:hover:bg-white  "
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <img src={boardIcon} className="   filter-white  h-4 " />
                    <p className=" text-lg font-bold  ">Create New Board </p>
                  </div>
                </div>

                <div className=" mx-2  p-4 relative space-x-2 bg-slate-100 dark:bg-darkSecondary flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="sun indicating light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-setext-secondary" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt="moon indicating dark mode" />
                </div>
              </div>
            </div>
          )}

          {/* Sidebar hide/show toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              className=" flex  items-center mt-2  absolute bottom-16  text-lg font-bold  rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white  space-x-2 justify-center  my-4 text-gray-500 "
            >
              <img
                className=" min-w-[20px]"
                src={hideSidebarIcon}
                alt=" side bar show/hide"
              />
              {isSideBarOpen && <p> Hide Sidebar </p>}
            </div>
          ) : (
            <div
              className="absolute p-5 left-0 top-0 right-0 bottom-0"
              onClick={() => toggleSidebar()}
            >
              {/* <img src={showSidebarIcon} alt="showSidebarIcon" /> */}
            </div>
          )}
        </div>
      </div>
      {isBoardModalOpen && (
        <AddEditBoardModal type="add" setBoardOpenModal={setIsBoardModalOpen} />
      )}
    </div>
  );
};

export default SideBar;
