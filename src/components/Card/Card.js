import React, { useState } from "react";
import "./Card.scss";
import ConfirmModalCards from "../Common/ConfirmModalCards";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilities/constant'; // Stelle sicher, dass du die richtigen Importpfade verwendest

const Card = (props) => {
  const { card, onDeleteCard } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleonModalAction = (type) => {
    if (type === MODAL_ACTION_CLOSE) {
      setShowDeleteModal(false); // Schließe das Löschmodal
    }
    if (type === MODAL_ACTION_CONFIRM) {
      onDeleteCard(card.id); // Lösche die Karte
      setShowDeleteModal(false); // Schließe das Löschmodal
    }
  };

  return (
    <>
      <div
        className="card-item"
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        {card.image && (
          <img
            className="card-cover"
            src={card.image}
            alt=""
            onMouseDown={(event) => event.preventDefault()}
          />
        )}
        {card.title}
        {isHovered && (
          <i
            className="fa fa-trash card-delete-icon"
            onClick={handleDeleteClick}
          ></i>
        )}
      </div>
      <ConfirmModalCards
        show={showDeleteModal}
        title={"Remove a card"}
        content={`Are you sure to remove this card: <b>${card.title}</b>`}
        onAction={handleonModalAction} // Nutze die aktualisierte Funktion
      />
    </>
  );
};

export default Card;