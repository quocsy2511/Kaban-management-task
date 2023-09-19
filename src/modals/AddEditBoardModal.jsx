/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";

const AddEditBoardModal = ({ setBoardOpenModal, type }) => {
  console.log("type : ", type);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const onChangeTaskColumns = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((item) => item.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const validate = () => {
    setIsValid(false);
    //kiểm ra sau khi bỏ khoảng trống ở đầu và cuối thì name có phải là chuỗi rỗng hay không
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  // xoá task
  const deleteTaskHandle = (id) => {
    //khi set thì phải truyền vô 1 callback lấy thăng state trc đó rồi dùng filter để lọc rồi trả về 1 state mới
    setNewColumns((prev) => prev.filter((item) => item.id !== id));
  };

  //thêm task
  const addTaskHandle = () => {
    setNewColumns((state) => [...state, { name: "", tasks: [], id: uuidv4() }]);
  };

  const onSubmit = (type) => {
    setBoardOpenModal(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className=" my-auto fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setBoardOpenModal(false);
      }}
    >
      {/* modal section */}
      <div
        className="scrollbar-hide overflow-y-hidden max-h-[95vh] max-w-md w-full bg-white dark:bg-dark text-black
      dark:text-white font-bold shadow-md shadow-darkShadow mx-auto px-8 py-8 rounded-xl"
      >
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        <div className="mt-8 flex flex-col space-y-1">
          <label
            htmlFor="board-name-input" //lấy id :D
            className="text-sm dark:text-white text-gray-500 cursor-pointer"
          >
            Board Columns
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px]  border-gray-600 focus:outline-secondary outline-none ring-0"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* columns Task */}
        <div className="mt-8 flex flex-col space-y-1">
          <label
            htmlFor="board-task-input" //lấy id :D
            className="text-sm dark:text-white text-gray-500 cursor-pointer"
          >
            Board Columns
          </label>
          {newColumns.map((item, index) => (
            <div className="flex items-center w-full" key={index}>
              <input
                className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px]  border-gray-600 focus:outline-secondary outline-none ring-0 w-full"
                placeholder="something ... "
                value={item.name}
                onChange={(e) => onChangeTaskColumns(item.id, e.target.value)}
                id="board-task-input"
                type="text"
              />
              <img
                src={crossIcon}
                alt="close task "
                className="m-4 cursor-pointer"
                onClick={() => deleteTaskHandle(item.id)}
              />
            </div>
          ))}
        </div>

        <div>
          <button
            className="mt-2 w-full flex items-center justify-center py-2 bg-secondary rounded-full text-white dark:text-secondary dark:bg-white"
            onClick={() => addTaskHandle()}
          >
            + Add New Columns
          </button>
          <button
            className="mt-2 w-full flex items-center justify-center py-2 bg-secondary rounded-full text-white dark:text-secondary dark:bg-white"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
          >
            {type === "add" ? "Create new board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditBoardModal;
