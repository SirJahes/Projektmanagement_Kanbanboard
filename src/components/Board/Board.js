import Card from "../Card/Card";
import "./Board.scss";
import { mapOrder } from "../../utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import Dropdown from 'react-bootstrap/Dropdown';
import ConfirmModal from "../Common/ConfirmModal";
import Form from "react-bootstrap/Form";
import { useEffect, useState, useRef } from "react";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilities/constant';
import { v4 as uuidv4 } from "uuid";

const Board = (props) => {

  const { board, onCardDrop, onUpdateboard } = props;
  const cards = mapOrder(board.cards, board.cardOrder, "id");

  const [isShowModalDelete, setShowModalDelete] = useState(false);
  const [titleboard, setTitleboard] = useState("");

  const [isFirstClick, setIsFirstClick] = useState(true);
  const inputRef = useRef(null);

  const [isShowAddNewCard, setisShowAddNewCard ] = useState(false);
  const [valueTextArea, setvalueTextArea ] = useState("");
  const textAreaRef = useRef(null);

  const onUpdateCard = (updatedCard) => {
    const updatedCards = cards.map((c) =>
      c.id === updatedCard.id ? updatedCard : c
    );
    onUpdateboard({ ...board, cards: updatedCards });
  };

  const handleDeleteCard = (cardId) => {
    // Finde die Karte, die gelöscht werden soll
    const cardToDelete = cards.find((card) => card.id === cardId);
  
    if (!cardToDelete) {
      return; // Karte nicht gefunden, abbrechen
    }
  
    // Erstelle eine kopie der aktuellen Spalte
    const updatedboard = { ...board };
  
    // Entferne die Karte aus der Spalte
    updatedboard.cards = updatedboard.cards.filter(
      (card) => card.id !== cardId
    );
  
    // Aktualisiere die Kartenreihenfolge
    updatedboard.cardOrder = updatedboard.cards.map((card) => card.id);
  
    // Rufe onUpdateboard auf, um die aktualisierte Spalte zu speichern
    onUpdateboard(updatedboard);
  };

  useEffect(() => {
    if(isShowAddNewCard === true && textAreaRef && textAreaRef.current){
      textAreaRef.current.focus();
    }
  }, [isShowAddNewCard])

  useEffect(() => {
    if (board && board.title) {
      setTitleboard(board.title)
    }
  }, [board, board.title])

  const toggleModal = () => {
    setShowModalDelete(!isShowModalDelete);
  }

  const onModalAction = (type) => {
    if (type === MODAL_ACTION_CLOSE) {
      //do nothing
    }
    if (type === MODAL_ACTION_CONFIRM) {
      //remove a board
      const newboard = {
        ...board,
        _destroy: true
      }
      onUpdateboard(newboard);
    }
    toggleModal();
  }

  const selectAllText = (event) => {
    setIsFirstClick(false);
    if (isFirstClick) {
      event.target.select();
    }else {
      inputRef.current.setSelectionRange(titleboard.length, titleboard.length)
    }
    // event.target.focus();
  }

  const handleClickOutside = () => {
    //do something...
    setIsFirstClick(true);
    const newboard = {
      ...board,
      title : titleboard,
      _destroy: false
    }
    onUpdateboard(newboard);
  }

  const handleAddNewCard = () => {
    //validate
    if (!valueTextArea) {
        textAreaRef.current.focus();
        return;
    }

    const newCard = {
      id: uuidv4(),
      kanbaflexboardId: board.kanbaflexboardId,
      boardId: board.id,
      title: valueTextArea,
      image: null
    }

    let newboard = {...board};
    newboard.cards = [...newboard.cards, newCard];
    newboard.cardOrder = newboard.cards.map(card => card.id);

    onUpdateboard(newboard);
    setvalueTextArea("");
    setisShowAddNewCard(false);
  }

  return (
    <>
      <div className="board">
        <header className="board-drag-handle">
          <div className="board-title">
          <Form.Control
            size={"sm"}
            type={"text"}
            value={titleboard}
            className="customize-input-board"
            onClick={selectAllText}
            onChange={(event)=> setTitleboard(event.target.value)}
            spellCheck="false"
            onBlur={handleClickOutside}
            onMouseDown={(e) => e.preventDefault()}
            ref={inputRef}
          />
          </div>
          <div className="board-dropdown">
          <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic" size="sm">
                
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setisShowAddNewCard(true)}>Neue Karte</Dropdown.Item>
                <Dropdown.Item onClick={toggleModal}>Diese Liste löschen</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
          </div>
          </header>
          <div className="card-list">
          <Container
            groupName="col"
            onDrop={(dropResult) => onCardDrop(dropResult, board.id)}
            getChildPayload={(index) => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "card-drop-preview",
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards &&
              cards.length > 0 &&
              cards.map((card, index) => {
                return (
                  <Draggable key={card.id}>
                    <Card card={card} onDeleteCard={handleDeleteCard} onUpdateCard={onUpdateCard}/>
                  </Draggable>
                )
              })}
          </Container>
          {isShowAddNewCard === true && 
            <div className="add-new-card">
                <textarea 
                  rows="2"
                  className="form-control" 
                  placeholder="Geben Sie einen Titel für diese Karte ein..."
                  ref={textAreaRef}
                  value={valueTextArea}
                  onChange={(event) => setvalueTextArea(event.target.value)}            
                ></textarea>
                <div className="group-btn">
                  <button 
                  className="btn btn-primary"
                  onClick={handleAddNewCard} 
                  >Karte erstellen</button>
                  <i className="fa fa-times icon" onClick={() => setisShowAddNewCard(false)}></i>
                </div>
            </div>
          }
        </div>
        {isShowAddNewCard === false &&
          <footer>
            <div className="footer-action" onClick={() => setisShowAddNewCard(true)}>
              <i 
                className="fa fa-plus icon" 
              ></i> Eine Karte hinzufügen
            </div>
          </footer>
        }
      </div>
      <ConfirmModal 
        show={isShowModalDelete}
        title={"Liste löschen"}
        content={`Willst du die Liste <b>${board.title}</b> löschen?`}
        onAction={onModalAction}
      />
    </>
  )
}

export default Board;