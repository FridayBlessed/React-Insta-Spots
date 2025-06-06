import React, { useEffect, useRef, useState } from "react";

function EditProfileModal({ isOpen, onClose, onSave, initialProfile }) {
  const modalContentRef = useRef(null);

  // Controlled input state, initialized from props when modal opens
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Set form fields when modal is opened
  useEffect(() => {
    if (isOpen && initialProfile) {
      setName(initialProfile.name || "");
      setJob(initialProfile.job || "");
      setProfileImage(null); 
    }
  }, [isOpen, initialProfile]);

  // Escape key closes the modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Click outside modal to close
  const handleOverlayClick = (e) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, job, profileImage });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal edit-modal" onClick={handleOverlayClick}>
      <div className="modal-content" ref={modalContentRef}>
        <span className="close-btn" onClick={onClose} style={{ cursor: "pointer" }}>&times;</span>
        <h2>Edit Profile</h2>
        <form id="editProfileForm" onSubmit={handleSubmit}>
          <div className="nameField">
            <label htmlFor="nameInput">Name:</label>
            <input
              type="text"
              id="nameInput"
              required
              minLength={5}
              maxLength={20}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="jobField">
            <label htmlFor="jobInput">Job Title:</label>
            <input
              type="text"
              id="jobInput"
              required
              minLength={5}
              maxLength={20}
              value={job}
              onChange={e => setJob(e.target.value)}
            />
          </div>
          <div className="imgField">
            <label htmlFor="profileImageInput">Upload Profile Image</label>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={e => setProfileImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="modal-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;