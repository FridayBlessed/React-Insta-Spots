import cardData from "./Card";
import  { useState, useEffect } from "react";
import ImagePreviewModal from "./ImagePreviewModal";

const STORAGE_KEY = "cards_liked";

function CardList() {
    // Initialize state with data from localStorage or default cardData FROM MY js file
  // If localStorage has data, parse it; otherwise, use the default cardData
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : cardData;
  });

  // Modal State
  const [preview, setPreview] = useState({ open: false, image: "", title: "" });

    // Save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

   const addCard = (newCard) => {
    setCards(prevCards => [newCard, ...prevCards]);
  };

  // Expose addCard to parent via window (hacky) or use context/lift state
  useEffect(() => { window._addCard = addCard; }, []);

    // Function to handle like button click 
  const handleLike = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, liked: !card.liked } : card
      )
    );
  };

    const handleImageClick = (card) => {
    setPreview({ open: true, image: card.image, title: card.title });
  };
    return <>
        <section className="card-section">
            {cards.map((card, key) => ( 
                
                <div className="card" key={key}>
                    <div className="image-container">
                    <img src={card.image} alt={card.title} style={{ cursor: "pointer" }}
                onClick={() => handleImageClick(card)} />
                    </div>
                   <div className="card_text">
                       <p>{card.title}</p>
                        <i
              className={`${card.liked ? "fa-solid" : "fa-regular"} fa-heart`}
              style={{ color: card.liked ? "red" : undefined }}
              onClick={() => handleLike(key)}
            />
                    </div>
                </div>
            ))}
               
        </section>
        <ImagePreviewModal
        isOpen={preview.open}
        image={preview.image}
        title={preview.title}
        onClose={() => setPreview({ ...preview, open: false })}
      />
    
    </>
}

export default CardList;