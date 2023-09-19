/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import logo from "../assets/logo-mobile.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import EllipsisMenu from "./EllipsisMenu";
import HeaderDropDown from "./HeaderDropDown";

const Header = ({ boardOpenModal, setBoardOpenModal }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((item) => item.isActive === true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [boardType, setBoarType] = useState("add");

  const openDropDownClick = () => {
    setOpenDropDown((state) => !state);
    setIsEllipsisOpen(false);
    setBoarType("add");
  };

  const setOpenEditModal = () => {
    setBoardOpenModal(true);
    setIsEllipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard()); // gọi này để xoá
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    //sau khi xoá xong thì sẽ setActive lại cho thàng có vị trí index = 0 trong mangr active
    //nếu nó xoá thàng index = 0 trong mảng thì giờ đây thàng index =1 mảng cũ thì sẽ thành index = 0 mảng mới và sẽ  active thàng index =1 mảng cũ đó
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-dark z-50 right-0 ">
      <header className="flex justify-between dark:text-white items-center">

        {/* left side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">
            Kanban
          </h3>
          <div className="flex items-center gap-x-4">
            {/* truncate là kiểu text dài quá thì cho nó 3 chấm như text-Ellipsis */}
            <h3 className="truncate max-w-[200px] text-xl font-bold md:ml-20 md:text-2xl font-sans ">
              {board.name}
            </h3>
            <img
              src={openDropDown ? iconUp : iconDown}
              alt="dropDown-icon"
              className="w-3 ml-2 md:hidden cursor-pointer"
              onClick={openDropDownClick}
            />
            <div className="bg-gray-50 rounded-full shadow-inner p-1 flex items-center relative z-50">
              <div className="flex-1 px-5">
                <input
                  type="text"
                  placeholder="search board here"
                  className="bg-transparent placeholder:text-text4 text-text1 w-full focus:outline-none "
                />
              </div>
              <button className="w-[72px] flex items-center h-[40px] bg-primary justify-center rounded-full flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400 font-medium"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex space-x-3 items-center md:space-x-6">
          <div className="border-r-[1px] border-r-solid border-gray-400 pr-2">
            <div className=" flex justify-center items-center gap-x-2 px-4 py-2 cursor-pointer dark:hover:bg-secondaryHover rounded-lg hover:bg-secondaryHover hover:text-secondary">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </span>
              <p>Filter</p>
            </div>
          </div>

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
              <button className="flex items-center w-6 h-6 justify-center rounded-full hover:bg-gray-100 hover:text-secondary dark:hover:text-white dark:hover:bg-secondary">
                +1
              </button>
            </li>
          </ul>
          <button
            className="hidden md:block button"
            onClick={() => setOpenAddEditTask((prev) => !prev)}
          >
            + New Task
          </button>
          <button
            className="button py-1 px-3 md:hidden"
            onClick={() => setOpenAddEditTask((prev) => !prev)}
          >
            +
          </button>
          <img
            src={ellipsis}
            alt="more"
            className="cursor-pointer h-6"
            onClick={() => {
              setBoarType("edit");
              setOpenDropDown(false);
              setIsEllipsisOpen((prev) => !prev);
            }}
          />
          {isEllipsisOpen && (
            <EllipsisMenu
              setIsEllipsisOpen={setIsEllipsisOpen}
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            ></EllipsisMenu>
          )}
        </div>
      </header>

      {openDropDown && (
        <HeaderDropDown
          setOpenDropDown={setOpenDropDown}
          setBoardOpenModal={setBoardOpenModal}
        ></HeaderDropDown>
      )}
      {boardOpenModal && (
        <AddEditBoardModal
          setBoardOpenModal={setBoardOpenModal}
          type={boardType}
        />
      )}
      {openAddEditTask && (
        <AddEditTaskModal
          // openAddEditTask={openAddEditTask}
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          type="add"
        ></AddEditTaskModal>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          type="board"
          title={board.name}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
        ></DeleteModal>
      )}
    </div>
  );
};

export default Header;
