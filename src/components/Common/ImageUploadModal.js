import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ImageUploadModal = ({ show, onClose, onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      onImageUpload(selectedImage);
      setSelectedImage(null);
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cover-Bild hochladen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Abbrechen
        </Button>
        <Button variant="success" onClick={handleUpload}>
          Hochladen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageUploadModal;
