import React, { useState } from "react";
import "./Card.scss";
import ConfirmModalCards from "../Common/ConfirmModalCards";
import ConfirmModalImage from "../Common/ConfirmModalImage"; // Importiere das Bild-Löschmodal
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilities/constant';

const Card = (props) => {
  const { card, onDeleteCard, onUpdateCard } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // Zustand für das Bild-Löschmodal

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleImageClick = () => {
    if (card.image) {
      setShowImageModal(true); // Zeige das Bild-Löschmodal an, wenn ein Bild vorhanden ist
    } else {
      // Implementiere die Logik zum Hochladen eines Bildes
      // Zeige ein Bild-Upload-Modal oder ähnliches an
    }
  };

  const handleonModalAction = (type) => {
    if (type === MODAL_ACTION_CLOSE) {
      setShowDeleteModal(false);
      setShowImageModal(false);
    }
    if (type === MODAL_ACTION_CONFIRM) {
      if (showImageModal) {
        // Lösche das Bild
        const updatedCard = {
          ...card,
          image: null
        };
        onUpdateCard(updatedCard); // Rufe die onUpdateCard-Funktion auf
      } else {
        onDeleteCard(card.id); // Lösche die Karte
      }
      setShowDeleteModal(false);
      setShowImageModal(false);
    }
  };

  return (
    <>
      <div
        className="card-item"
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        {card.image ? (
          <div className="card-image">
            <img
              className="card-cover"
              src={card.image}
              alt=""
              onMouseDown={(event) => event.preventDefault()}
            />
            {isHovered && (
              <i
                className="fa fa-times card-delete-image-icon"
                onClick={handleImageClick}
              ></i>
            )}
          </div>
        ) : (
          isHovered && (
            <i
              className="fa fa-upload card-upload-icon"
              onClick={handleImageClick} // Hier sollte die Logik zum Bild-Upload erfolgen
            ></i>
          )
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
        onAction={handleonModalAction}
      />
      <ConfirmModalImage
        show={showImageModal}
        title={"Remove Image"}
        content={"Are you sure you want to remove this image?"}
        onAction={handleonModalAction}
      />
    </>
  );
};

export default Card;