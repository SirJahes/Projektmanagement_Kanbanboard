import React, { useState, useEffect } from "react";
import "./Card.scss";
import ConfirmModalCards from "../Common/ConfirmModalCards";
import ConfirmModalImage from "../Common/ConfirmModalImage";
import ImageUploadModal from "../Common/ImageUploadModal";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilities/constant';

const Card = (props) => {
  const { card, onDeleteCard, onUpdateCard } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (card && card.title) {
      setNewTitle(card.title)
    }
  }, [card, card.title])

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleImageClick = () => {
    if (card.image) {
      setShowImageModal(true);
    } else {
      setShowUploadModal(true);
    }
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (newTitle !== card.title) {
      const updatedCard = {
        ...card,
        title: newTitle
      };
      onUpdateCard(updatedCard);
    }
  };

  const handleImageUpload = (imageFile) => {
    const updatedCard = {
      ...card,
      image: URL.createObjectURL(imageFile)
    };
    onUpdateCard(updatedCard);
    setShowUploadModal(false);
  };

  const handleonModalAction = (type) => {
    if (type === MODAL_ACTION_CLOSE) {
      setShowDeleteModal(false);
      setShowImageModal(false);
      setShowUploadModal(false);
    }
    if (type === MODAL_ACTION_CONFIRM) {
      if (showImageModal) {
        const updatedCard = {
          ...card,
          image: null
        };
        onUpdateCard(updatedCard);
      } else {
        onDeleteCard(card.id);
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
              onClick={handleImageClick}
            ></i>
          )
        )}
        {isEditingTitle ? (
          <input
            type="text"
            className="customize-input-card"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            spellCheck="false"
            autoFocus
          />
        ) : (
          <div className="card-title" onClick={() => setIsEditingTitle(true)}>
            {card.title}
          </div>
        )}
        {isHovered && (
          <i
            className="fa fa-trash card-delete-icon"
            onClick={handleDeleteClick}
          ></i>
        )}
      </div>
      <ConfirmModalCards
        show={showDeleteModal}
        title={"Karte löschen"}
        content={`Möchtest du die Karte <b>${card.title}</b> löschen?`}
        onAction={handleonModalAction}
      />
      <ConfirmModalImage
        show={showImageModal}
        title={"Bild löschen"}
        content={"Möchtest du dieses Bild wirklich löschen?"}
        onAction={handleonModalAction}
      />
      <ImageUploadModal
        show={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onImageUpload={handleImageUpload}
      />
    </>
  );
};

export default Card;