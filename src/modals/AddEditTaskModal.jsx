/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";

const AddEditTaskModal = ({
  setIsTaskModalOpen,
  type,
  device,
  setOpenAddEditTask,
  prevColIndex = 0, //là cột mình muốn edit hoặc thêm như là todo ...
  taskIndex,
  statusNew,
}) => {
  const board = useSelector((state) => state.boards).find(
    (state) => state.isActive //nó sẽ lấy project nào mình đang chọn
  );
  const dispatch = useDispatch();
  const columns = board.columns; //lấy 1 mẩng các mục như là todo doing done trong thằng board mình chọn
  const col = columns.find((state, index) => index === prevColIndex); // nó lấy ra 1 cột như là todo doing hay done do mình chọn để  edit
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : []; //lấy 1 task trong 1 mảng task của cái cột mà mình chọn như là todo hay doing
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex); // tạo ra newCol mới để cập nhật status khi task đc chuyển đổi
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  //load tasks
  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtasks) => {
        return { ...subtasks, id: uuidv4() };
      })
    );
    // console.log("sub task : ", subtasks);
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const deleteSubtaskHandle = (id) => {
    setSubtasks((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSubtaskColumns = (id, newValue) => {
    setSubtasks((prev) => {
      const newState = [...prev];
      const newColumn = newState.find((item) => item.id === id);
      newColumn.title = newValue;
      return newState;
    });
  };

  const addTaskHandle = () => {
    setSubtasks((prev) => [
      ...prev,
      { title: "", isCompleted: false, id: uuidv4() },
    ]);
  };

  const validate = () => {
    setIsValid(false);
    //kiểm ra sau khi bỏ khoảng trống ở đầu và cuối thì name có phải là chuỗi rỗng hay không
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    console.log("click");
    return true;
  };

  console.log(
    "🚀 ~ file: AddEditTaskModal.jsx:94 ~ onSubmit ~ subtasks:",
    subtasks
  );
  const onSubmit = (type) => {
    setOpenAddEditTask(false);
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,

          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  useEffect(() => {
    if (statusNew !== undefined) {
      // Nếu statusNew không là undefined, gán giá trị của status bằng statusNew
      setStatus(statusNew);
    }
  }, [statusNew]);

  return (
    <div
      className={
        device === "mobile"
          ? "py-6 pb-40 absolute overflow-y-scroll left-0 right-0 top-0 bottom-[-100vh] flex bg-darkDropDown z-50"
          : "py-6 pb-40 absolute overflow-y-scroll left-0 right-0 top-0 bottom-0 flex bg-transparent z-50"
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
    >
      {/* Modal section */}
      <div
        className="scrollbar-hide overflow-y-hidden max-h-min max-w-md w-full bg-white dark:bg-dark text-black
      dark:text-white font-bold shadow-md shadow-darkShadow mx-auto px-8 py-8 rounded-xl my-auto"
      >
        <h3 className="text-lg">
          {type === "add" ? "Add New Task" : "Update Task"}
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-1">
          <label
            htmlFor="board-name-input" //lấy id :D
            className="text-sm dark:text-white text-gray-500 cursor-pointer"
          >
            Task Name
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px]  border-gray-600 focus:outline-secondary outline-none ring-0"
            placeholder="e.g Web Design"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="board-name-input"
            type="text"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label
            htmlFor="board-name-input" //lấy id :D
            className="text-sm dark:text-white text-gray-500 cursor-pointer"
          >
            Description Task
          </label>
          <textarea
            className=" min-h-[200px] bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px]  border-gray-600 focus:outline-secondary outline-none ring-0"
            placeholder="e.g Web Design"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Subtasks */}
        <div className="mt-8 flex flex-col space-y-1">
          <label
            htmlFor="board-task-input" //lấy id :D
            className="text-sm dark:text-white text-gray-500 cursor-pointer"
          >
            Subtask
          </label>
          {subtasks.map((item, index) => (
            <div className="flex items-center w-full" key={index}>
              <input
                className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px]  border-gray-600 focus:outline-secondary outline-none ring-0 w-full"
                placeholder="something ... "
                value={item.title}
                onChange={(e) =>
                  onChangeSubtaskColumns(item.id, e.target.value)
                }
                id="board-task-input"
                type="text"
              />
              <img
                src={crossIcon}
                alt="close task "
                className="m-4 cursor-pointer"
                onClick={() => deleteSubtaskHandle(item.id)}
              />
            </div>
          ))}
        </div>

        <div>
          <button
            className="mt-2 w-full flex items-center justify-center py-2 bg-secondary rounded-full text-white dark:text-secondary dark:bg-white"
            onClick={() => addTaskHandle()}
          >
            + Add New Subtask
          </button>
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500 cursor-pointer">
            Current status{" "}
            {statusNew && (
              <span className="text-lg font-normal "> : {statusNew}</span>
            )}
          </label>
          {!statusNew && (
            <select
              onChange={onChangeStatus}
              value={status}
              className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none "
            >
              {columns.map((item, index) => (
                <option value={columns.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <button
            className="mt-5 w-full flex items-center justify-center py-2 bg-secondary rounded-full text-white dark:bg-secondary dark:text-white"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) {
                onSubmit(type);
                setOpenAddEditTask(false);
                type === "edit" && setIsTaskModalOpen(false);
              }
            }}
          >
            {type === "add" ? "Create new task" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskModal;
