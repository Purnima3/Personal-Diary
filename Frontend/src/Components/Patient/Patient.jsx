import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteContainer from "../NoteContainer/NoteContainer";
import Sidebar from "../Sidebar/Sidebar";
import Calendar from "../Calendar/Calendar";
import { useNavigate } from "react-router-dom";
import terms from "../../terms";
import Navbar from "../Navbar/Navbar";
import "./Patient.css";
import Homepage from "../Homepage/Homepage";
import Papp from "../../Papp";
import { EmotionProvider } from "../../Pcomponents/EmotionProvider";
import DiaryItem from "../../Pcomponents/DiaryItem";

const App = (props) => {
	const [notes, setNotes] = useState(
		// JSON.parse(localStorage.getItem("notes-app")) || []
		JSON.parse(localStorage.getItem("diary")) || []
	);
	const [sentimentResults, setSentimentResults] = useState([]);

	const addNote = (color) => {
		const tempNotes = [...notes];
		tempNotes.push({
			id: Date.now() + "" + Math.floor(Math.random() * 78),
			text: "",
			time: Date.now(),
			color,
		});
		setNotes(tempNotes);
	};

	const deleteNote = (id) => {
		const tempNotes = [...notes];
		const index = tempNotes.findIndex((item) => item.id === id);
		if (index < 0) return;
		tempNotes.splice(index, 1);
		setNotes(tempNotes);
	};

	const updateText = (text, id) => {
		const tempNotes = [...notes];
		const index = tempNotes.findIndex((item) => item.id === id);
		if (index < 0) return;
		tempNotes[index].text = text;
		setNotes(tempNotes);
	};

	useEffect(() => {
		// localStorage.setItem("notes-app", JSON.stringify(notes));
		localStorage.setItem("diary", JSON.stringify(notes));
	}, [notes]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = terms.user;
				// console.log("NAme", terms.user);
				const response = await axios.post(`http://localhost:4000/api/notes`, {
					notes,
					user: user.id,
				});
				console.log("Response Fetch data : ", response.data);
				// Request succeeded, you can handle success here if needed
			} catch (error) {
				console.error("Error sending notes to server:", error);
				// Handle error
			}
		};
		fetchData();
	}, [notes]);

	useEffect(() => {
		const fetchSentiment = async () => {
			try {
				const user = terms.user;
				// console.log("NAme", terms.user);
				const response = await axios.post(`http://localhost:5000/apis/notes`, {
					notes,
					user: user.id,
				});
				const { results } = response.data;
				setSentimentResults(response.data.results);
				// Request succeeded, you can handle success here if needed
			} catch (error) {
				console.error("Error sending notes to server:", error);
				// Handle error
			}
		};
		fetchSentiment();
	}, [notes]);

	return (
		<div className="App">
			<EmotionProvider sentimentResults={sentimentResults}>
				{/* <Sidebar addNote={addNote} />
        <NoteContainer
          notes={notes}
          deleteNote={deleteNote}
          updateText={updateText}
        /> */}
				{/* <Homepage /> */}
				<Papp />
				<Calendar />
				{/* <DiaryItem /> */}
			</EmotionProvider>
		</div>
	);
};

export default App;
