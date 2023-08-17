import "./BoardContent.scss";
import Column from "../Column/Column";
import { initData } from "../../actions/initData";
import { useState, useEffect } from "react";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../utilities/dragdrop";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  const [isShowAddList, setIsShowAddList] = useState(false);

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
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = {...board};
    newBoard.columnOrder = newColumns.map(column => column.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  }

  const onCardDrop = (dropResult, columnId) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null){
      console.log(">>> inside onCardDrop: ", dropResult, 'with columnId=', columnId);

      let newColumns = [...columns];

      let currentColumn = newColumns.find(column => column.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map(card => card.id);

      setColumns(newColumns);
    }

  }

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
                  <Column 
                  column={column}
                  onCardDrop={onCardDrop} />
                </Draggable>
              );
            })}

            {!isShowAddList === false ?
              <div className="add-new-column" onClick={() => setIsShowAddList(true)}>
                  <i className="fa fa-plus icon"></i>  Add another column
              </div>
              :
              <div className="content-add-column">
                <input type='text' className="form-control" />
                <div className="group-btn">
                  <button className="btn btn-success" 
                    onClick={() => setIsShowAddList(true)}>Add list</button>
                  <i className="fa fa-times icon" onClick={() => setIsShowAddList(false)}></i>
                </div>
              </div>
            }
        </Container>
      </div>
    </>
  );
};

export default BoardContent;
