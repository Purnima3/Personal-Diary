// src/NoteEntry.js
import React, { useState } from "react";

const NoteEntry = ({ onSave, onCancel }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSave = () => {
		onSave({ title, content });
		setTitle("");
		setContent("");
	};

	const handleCancel = () => {
		onCancel();
		setTitle("");
		setContent("");
	};

	return (
		<div className="note-entry">
			<h2>Add Note</h2>
			<label>Title:</label>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label>Content:</label>
			<textarea value={content} onChange={(e) => setContent(e.target.value)} />
			<div className="button-container">
				<button onClick={handleSave}>Save</button>
				<button onClick={handleCancel}>Cancel</button>
			</div>
		</div>
	);
};

export default NoteEntry;
