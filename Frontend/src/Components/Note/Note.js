import React from "react";

import bin from "../../assets/bin.png";

import "./Note.css";

let timer = 500,
	timeout;
function Note(props) {
	const formatDate = (value) => {
		if (!value) return "";

		const date = new Date(value);
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"June",
			"July",
			"Aug",
			"Sept",
			"Oct",
			"Nov",
			"Dec",
		];

		let hrs = date.getHours();
		let ampm = hrs > 12 ? "PM" : "AM";
		hrs = hrs ? hrs : "12";
		hrs = hrs > 12 ? hrs - 12 : hrs;

		console.log(hrs);

		let min = date.getMinutes();
		min = min < 10 ? "0" + min : min;

		let day = date.getDate();
		const month = monthNames[date.getMonth()];

		return `${hrs}:${min} ${ampm} ${day} ${month}`;
	};

	const debounce = (func) => {
		clearTimeout(timeout);
		timeout = setTimeout(func, timer);
	};

	const updateText = (text, id) => {
		debounce(() => props.updateText(text, id));
	};

	return (
		<div className="note " style={{ backgroundColor: props.note.color }}>
			<textarea
				className="note_text scroll-content"
				defaultValue={props.note.text}
				onChange={(event) => updateText(event.target.value, props.note.id)}
			/>
			<div className="note_footer">
				<p>{formatDate(props.note.time)}</p>
				<img
					src={bin}
					alt="DELETE"
					onClick={() => {
						props.deleteNote(props.note.id);
					}}
				/>
			</div>
		</div>
	);
}

export default Note;
