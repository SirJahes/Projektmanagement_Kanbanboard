import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "../../utilities/constant";

const ConfirmModalImage = (props) => {
  const { show, title, content, onAction } = props;

  const handleCloseImage = () => {
    onAction(MODAL_ACTION_CLOSE);
  };

  const handleConfirmImage = () => {
    onAction(MODAL_ACTION_CONFIRM);
  };

  return (
    <Modal show={show} onHide={handleCloseImage}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseImage}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmImage}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModalImage;
