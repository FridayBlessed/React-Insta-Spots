import { useState, useEffect } from "react";
import Avatar from "../assets/Avatar.png";
import EditProfileModal from "./EditProfileModal";
import NewPostModal from "./NewPostModal";

const STORAGE_KEY = "profile_data";

function Profile() {
  // Load from localStorage or use defaults
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, avatar: parsed.avatar || Avatar };
      } catch {
        return { name: "Bessie Coleman", job: "Civil Aviator", avatar: Avatar };
      }
    }
    return { name: "Bessie Coleman", job: "Civil Aviator", avatar: Avatar };
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

 // Add new post: call CardList's addCard via window (for demo).
// This allows the NewPostModal component (which is not a child of CardList) to add a new card by calling window._addCard(newCard).
  const handleAddPost = (newCard) => {
    if (window._addCard) window._addCard(newCard);
  };

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const handleEditSave = (data) => {
    if (data.profileImage) {
      // i Converted image file to base64 for storage
      const reader = new FileReader();
      reader.onloadend = function () {
        setProfile({
          name: data.name,
          job: data.job,
          avatar: reader.result, // base64 version of the image
        });
      };
      reader.readAsDataURL(data.profileImage);
    } else {
      setProfile({
        name: data.name,
        job: data.job,
        avatar: profile.avatar,
      });
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-img">
          <img src={profile.avatar} alt={profile.name} />
        </div>
        <div className="hero-text">
          <h1>{profile.name}</h1>
          <p>{profile.job}</p>
          <div className="edit-profile">
            <button className="edit" onClick={() => setIsEditModalOpen(true)}>
              <i className="fa-solid fa-pencil"></i> Edit Profile
            </button>
          </div>
        </div>
        <div className="hero-btn">
           <button className="new-post-btn" onClick={() => setIsNewPostModalOpen(true)}>
            <i className="fa-solid fa-plus"></i> New Post
          </button>
        </div>
      </section>
      <hr />
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditSave}
        initialProfile={profile}
      />
        <NewPostModal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
        onAddPost={handleAddPost}
      />
    </>
  );
}

export default Profile;