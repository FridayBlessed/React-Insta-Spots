import React, { useEffect, useRef } from "react";

function ImagePreviewModal({ isOpen, image, title, onClose }) {
  const modalContentRef = useRef(null);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

    // Click outside modal closes modal
  const handleOverlayClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="preview-modal" onClick={handleOverlayClick}>
      <div className="preview-content" ref={modalContentRef}>
        <span className="close-preview" onClick={onClose} style={{cursor: "pointer"}}>&times;</span>
        <img id="previewImage" src={image} alt="Preview" />
        <p id="previewTitle">{title}</p>
      </div>
    </div>
  );
}

export default ImagePreviewModal;