import "./BoardContent.scss";
import Column from "../Column/Column";
import { initData } from "../../actions/initData";
import { useState, useEffect } from "react";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardIniData = initData.boards.find((item) => item.id === "board-1");
    if (boardIniData) {
      setBoard(boardIniData);

      //sort Columns
      setColumns(
        mapOrder(boardIniData.columns, boardIniData.columnOrder, "id")
      );
    }
  }, []);

  const onColumnDrop = (dropResult) => {
    console.log(">>> inside onColumnDrop", dropResult);
  };

  if (_.isEmpty(board)) {
    return (
      <>
        <div className="not-found">Board not found</div>
      </>
    );
  }

  return (
    <>
      <div className="board-columns">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={(index) => columns[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "column-drop-preview",
          }}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column, index) => {
              return (
                <Draggable key={column.id}>
                  <Column column={column} />
                </Draggable>
              );
            })}
        </Container>
      </div>
    </>
  );
};

export default BoardContent;
