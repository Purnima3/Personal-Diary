import React, { useEffect, useReducer, useRef, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./Papp.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import { EmotionContext } from "./Pcomponents/EmotionProvider";

const reducer = (state, action) => {
	let newState = [];
	switch (action.type) {
		case "INIT": {
			return action.data;
		}
		case "CREATE": {
			newState = [action.data, ...state];
			break;
		}
		case "REMOVE": {
			newState = state.filter((it) => it.id !== action.targetId);
			break;
		}
		case "EDIT": {
			newState = state.map((it) =>
				it.id === action.data.id ? { ...action.data } : it
			);
			break;
		}
		default:
			return state;
	}
	localStorage.setItem("diary", JSON.stringify(newState));
	return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function Papp() {
	const [data, dispatch] = useReducer(reducer, []);
	const emotions = useContext(EmotionContext);

	useEffect(() => {
		const localData = localStorage.getItem("diary");
		if (localData) {
			const diaryList = JSON.parse(localData).sort(
				(a, b) => parseInt(b.id) - parseInt(a.id)
			);
			if (diaryList.length >= 1) {
				dataId.current = parseInt(diaryList[0].id) + 1;
				dispatch({ type: "INIT", data: diaryList });
			}
		}
	}, []);

	const dataId = useRef(0);

	// CREATE
	const onCreate = (date, content, emotion) => {
		dispatch({
			type: "CREATE",
			data: {
				id: dataId.current,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
		dataId.current += 1;
	};

	// REMOVE
	const onRemove = (targetId) => {
		dispatch({ type: "REMOVE", targetId });
	};

	// EDIT
	const onEdit = (targetId, date, content, emotion) => {
		dispatch({
			type: "EDIT",
			data: {
				id: targetId,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
	};

	return (
		<DiaryStateContext.Provider value={data}>
			<DiaryDispatchContext.Provider
				value={{
					onCreate,
					onEdit,
					onRemove,
					emotions, // Pass the emotions data here
				}}
			>
				<div className="papp">
					{/* <ul>
						{emotions.map((emotion, index) => (
							<li key={index}>{emotion}</li>
						))}
					</ul> */}
					<Home />
					{/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/diary/:id" element={<Diary />} />
          </Routes> */}
				</div>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
}

export default Papp;
