import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import parse from 'html-react-parser';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "../../utilities/constant";

const ConfirmModalCards = (props) => {
  const { title, content, show, onAction } = props;

  const handleConfirmCards = () => {
    onAction(MODAL_ACTION_CONFIRM);
  };

  const handleCloseCards = () => {
    onAction(MODAL_ACTION_CLOSE);
  };

  return (
    <Modal show={show} onHide={handleCloseCards} backdrop={"static"}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{parse(content)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCards}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmCards}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModalCards;
