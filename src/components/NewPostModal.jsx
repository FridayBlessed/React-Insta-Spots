import React, { useEffect, useRef, useState } from "react";

function NewPostModal({ isOpen, onClose, onAddPost }) {
  const modalContentRef = useRef(null);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Reset fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setImageFile(null);
    }
  }, [isOpen]);

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

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) return;

    // Convert image to base64 for persistence
    const reader = new FileReader();
    reader.onloadend = function () {
      onAddPost({
        title,
        image: reader.result, // base64 string
        liked: false,
      });
      onClose();
    };
    reader.readAsDataURL(imageFile);
  };

  if (!isOpen) return null;

  return (
    <div className="modal new-post-modal" onClick={handleOverlayClick}>
      <div className="modal-content" ref={modalContentRef}>
        <span className="close-btn new-post-close" onClick={onClose} style={{ cursor: "pointer" }}>&times;</span>
        <h2>Create New Post</h2>
        <form id="newPostForm" onSubmit={handleSubmit}>
          <div id="title-field">
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              minLength={5}
              maxLength={50}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="imgField">
            <label htmlFor="postImage">Image:</label>
            <input
              type="file"
              id="postImage"
              accept="image/*"
              required
              onChange={e => setImageFile(e.target.files[0])}
            />
          </div>
          <button type="submit" className="modal-btn">Post</button>
        </form>
      </div>
    </div>
  );
}

export default NewPostModal;