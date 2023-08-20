import "./BoardContent.scss";
import { initData } from "../../actions/initData";
import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../utilities/dragdrop";
import { v4 as uuidv4 } from "uuid";
import Board from "../Board/Board";

const BoardContent = () => {
  const [kanbaflexboard, setkanbaflexboard] = useState({});
  const [boards, setboards] = useState([]);

  const [isShowAddList, setIsShowAddList] = useState(false);
  const inputRef = useRef(null);
  const [valueInput, setValueInput] = useState("");

  // Funktion zum Speichern der Daten in localStorage
  const saveDataToLocal = (data) => {
    localStorage.setItem("myAppData", JSON.stringify(data));
  };

  // Funktion zum Abrufen der Daten aus localStorage
  const getDataFromLocal = () => {
    const savedData = localStorage.getItem("myAppData");
    return savedData ? JSON.parse(savedData) : null;
  };

  useEffect(() => {
    if (isShowAddList === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowAddList]);

  useEffect(() => {
    const savedData = getDataFromLocal();

    if (savedData) {
      setkanbaflexboard(savedData.kanbaflexboard);
      setboards(savedData.boards);
    } else {
      const kanbaflexboardIniData = initData.kanbaflexboards.find(
        (item) => item.id === "kanbaflexboard-1"
      );
      if (kanbaflexboardIniData) {
        setkanbaflexboard(kanbaflexboardIniData);

        setboards(
          mapOrder(
            kanbaflexboardIniData.boards,
            kanbaflexboardIniData.boardOrder,
            "id"
          )
        );
      }
    }
  }, []);

  const onboardDrop = (dropResult) => {
    let newboards = [...boards];
    newboards = applyDrag(newboards, dropResult);

    let newkanbaflexboard = { ...kanbaflexboard };
    newkanbaflexboard.boardOrder = newboards.map((board) => board.id);
    newkanbaflexboard.boards = newboards;

    setboards(newboards);
    setkanbaflexboard(newkanbaflexboard);

    // Nach dem Ändern der Daten, speichern sie in localStorage
    saveDataToLocal({
      kanbaflexboard: newkanbaflexboard,
      boards: newboards,
    });
  };

  const onCardDrop = (dropResult, boardId) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newboards = [...boards];

      let currentboard = newboards.find((board) => board.id === boardId);
      currentboard.cards = applyDrag(currentboard.cards, dropResult);
      currentboard.cardOrder = currentboard.cards.map((card) => card.id);

      setboards(newboards);

      // Nach dem Ändern der Daten, speichern sie in localStorage
      saveDataToLocal({
        kanbaflexboard: kanbaflexboard,
        boards: newboards,
      });
    }
  };

  if (_.isEmpty(kanbaflexboard)) {
    return (
      <>
        <div className="not-found">kanbaflexboard not found</div>
      </>
    );
  }

  const handleAddList = () => {
    if (!valueInput) {
      if (inputRef && inputRef.current) inputRef.current.focus();
      return;
    }

    const _boards = _.cloneDeep(boards);
    _boards.push({
      id: uuidv4(),
      kanbaflexboardId: kanbaflexboard.id,
      title: valueInput,
      cards: [],
    });
    setboards(_boards);
    setValueInput("");
    inputRef.current.focus();

    // Nach dem Ändern der Daten, speichern sie in localStorage
    saveDataToLocal({
      kanbaflexboard: kanbaflexboard,
      boards: _boards,
    });
  };

  const onUpdateboard = (newboard) => {
    const boardIdUpdate = newboard.id;
    let ncols = [...boards];
    let index = ncols.findIndex((item) => item.id === boardIdUpdate);
    if (newboard._destroy) {
      ncols.splice(index, 1);
    } else {
      ncols[index] = newboard;
    }
    setboards(ncols);

    // Nach dem Ändern der Daten, speichern sie in localStorage
    saveDataToLocal({
      kanbaflexboard: kanbaflexboard,
      boards: ncols,
    });
  };

  return (
    <>
      <div className="kanbaflexboard-boards">
        <Container
          orientation="horizontal"
          onDrop={onboardDrop}
          getChildPayload={(index) => boards[index]}
          dragHandleSelector=".board-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "board-drop-preview",
          }}
        >
          {boards &&
            boards.length > 0 &&
            boards.map((board, index) => {
              return (
                <Draggable key={board.id}>
                  <Board
                    board={board}
                    onCardDrop={(dropResult) => onCardDrop(dropResult, board.id)}
                    onUpdateboard={onUpdateboard}
                  />
                </Draggable>
              );
            })}
        </Container>

        {isShowAddList === false ? (
          <div className="add-new-board" onClick={() => setIsShowAddList(true)}>
            <i className="fa fa-plus icon"></i> Eine weitere Liste hinzufügen
          </div>
        ) : (
          <div className="content-add-board">
            <input
              type="text"
              className="form-control"
              ref={inputRef}
              value={valueInput}
              onChange={(event) => setValueInput(event.target.value)}
            />
            <div className="group-btn">
              <button
                className="btn btn-primary"
                onClick={() => handleAddList()}
              >
                Liste erstellen
              </button>
              <i
                className="fa fa-times icon"
                onClick={() => setIsShowAddList(false)}
              ></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BoardContent;