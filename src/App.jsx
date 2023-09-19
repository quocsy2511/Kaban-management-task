/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Center from "./components/Center";
import Header from "./components/Header";
import boardsSlice from "./redux/boardsSlice";
import EmptyBoard from "./components/EmptyBoard";

function App() {
  const [boardOpenModal, setBoardOpenModal] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((item) => item.isActive);
  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }
  return (
    <div className="overflow-hidden overflow-y-scroll">
      {boards.length > 0 ? (
        <>
          {/* header */}
          <Header
            boardOpenModal={boardOpenModal}
            setBoardOpenModal={setBoardOpenModal}
          ></Header>
          {/* Content */}
          <Center
            boardOpenModal={boardOpenModal}
            setBoardOpenModal={setBoardOpenModal}
          ></Center>
        </>
      ) : (
        <EmptyBoard type="add"></EmptyBoard>
      )}
    </div>
  );
}

export default App;
