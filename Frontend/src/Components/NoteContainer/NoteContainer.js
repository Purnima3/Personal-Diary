import React from "react";
import Note from "../Note/Note";

import "./NoteContainer.css";

function NoteContainer(props) {
	const reverseArr = (arr) => {
		const array = [];
		for (let i = arr.length - 1; i >= 0; i--) {
			array.push(arr[i]);
		}
		return array;
	};

	const notes = reverseArr(props.notes);
	console.log(notes);
	return (
		<div className="noteContainer ">
			<h1>Notes ::</h1>
			<div className="noteContainer-notes">
				{notes?.length > 0 ? (
					notes.map((item) => (
						<Note
							key={item.id}
							note={item}
							deleteNote={props.deleteNote}
							updateText={props.updateText}
						/>
					))
				) : (
					<h2>No notes Present</h2>
				)}
			</div>
		</div>
	);
}

export default NoteContainer;
