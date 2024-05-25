// src/App.js
import React, { useState } from "react";
import "./Homepage.css";
import Card from "./Card";
import Search from "./Search";
import CardDetails from "./CardDetails";
import NoteEntry from "./NoteEntry";

const Homepage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [cards, setCards] = useState([
		{ id: 1, title: "Card 1", content: "Content for Card 1" },
		{ id: 2, title: "Card 2", content: "Content for Card 2" },
		{ id: 3, title: "Card 3", content: "Content for Card 3" },
		{ id: 4, title: "Card 4", content: "Content for Card 4" },
		{ id: 5, title: "Card 5", content: "Content for Card 5" },
	]);
	const [selectedCard, setSelectedCard] = useState(null);
	const [showNoteEntry, setShowNoteEntry] = useState(false);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};

	const handleCardClose = () => {
		setSelectedCard(null);
	};

	const handleSaveNote = (note) => {
		// Update the card content with the new note
		const updatedCards = cards.map((card) =>
			card.id === selectedCard.id
				? {
						...card,
						content: `${card.content}\n\nNote: ${note.title}\n${note.content}`,
				  }
				: card
		);
		setCards(updatedCards);
		setShowNoteEntry(false);
	};

	const handleCancelNote = () => {
		setShowNoteEntry(false);
	};

	const filteredCards = cards.filter((card) =>
		card.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="App">
			<NoteEntry />
			<Search className="search-bar" handleSearch={handleSearch} />
			<div className="cards-container">
				{filteredCards.map((card) => (
					<Card
						key={card.id}
						title={card.title}
						content={card.content}
						onClick={() => handleCardClick(card)}
					/>
				))}
			</div>
			{selectedCard && (
				<div className="card-details-container">
					<CardDetails card={selectedCard} onClose={handleCardClose} />
					<button onClick={() => setShowNoteEntry(true)}>Add Note</button>
				</div>
			)}
			{showNoteEntry && (
				<div className="note-entry-container">
					<NoteEntry onSave={handleSaveNote} onCancel={handleCancelNote} />
				</div>
			)}
		</div>
	);
};

export default Homepage;
