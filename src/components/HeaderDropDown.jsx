/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import useDarkMode from "../hook/useDarkMode";
import boardsSlice from "../redux/boardsSlice";

const HeaderDropDown = ({ setOpenDropDown, setBoardOpenModal }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const [colorTheme, setColorTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setColorTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-darkDropDown"
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setOpenDropDown(false);
      }}
    >
      {/* dropDown Model */}
      <div className="bg-white dark:bg-dark shadow-md shadow-darkShadow w-full py-4 rounded-xl">
        <h3 className="text-gray-600 font-semibold mx-4 mb-8 dark:text-gray-300">
          All Boards ({boards?.length})
        </h3>
        <div>
          {boards &&
            boards.map((item, index) => (
              <div
                className={`flex items-baseline space-x-2 px-5 py-4 cursor-pointer ${
                  item.isActive &&
                  "bg-secondary rounded-r-full text-white mr-8 "
                }`}
                key={index}
                onClick={
                  () => dispatch(boardsSlice.actions.setBoardActive({ index })) //set thằng board cho nó active
                }
              >
                <img src={boardIcon} alt="iconDropDown" className="h-4" />
                <p className="text-lg font-extrabold dark:text-white">
                  {item.name}
                </p>
              </div>
            ))}

          <div
            className="flex items-baseline space-x-2 px-5 py-4 text-secondary cursor-pointer"
            onClick={() => {
              setBoardOpenModal(true);
              setOpenDropDown(false);
            }}
          >
            <img src={boardIcon} alt="iconDropDown" className="h-4" />
            <p className="text-lg font-bold ">Create New Board</p>
          </div>

          <div className="mx-2 p-4 space-x-2 bg-slate-200 dark:bg-darkSecondary flex justify-center items-center rounded-lg">
            <img
              src={lightIcon}
              alt="lightModeIcon"
              className={`${darkSide ? "w-4" : "w-6"} shadow-xl`}
            />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-secondary" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <img
              src={darkIcon}
              alt="darkModeIcon"
              className={`${darkSide ? "w-5" : "w-3"} shadow-xl`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropDown;
