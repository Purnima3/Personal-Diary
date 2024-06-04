import React, { useEffect, useReducer, useRef } from "react";
import {Switch, Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import Complete from "./Components/Complete";
import Admin from "./Components/Admin/Admin";
import UserAnalytics from "./Components/UserAnalytics/UserAnalytics";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

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

function App() {
	const navigate = useNavigate();
	const [css, setCss] = React.useState(false);
	const [adcss, setadCss] = React.useState(false);
	const [wtcss, setWtCss] = React.useState(false);
	const [use, setUse] = React.useState();
	const [data, dispatch] = React.useReducer(reducer, []);

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

	const dataId = React.useRef(0);

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

	const onRemove = (targetId) => {
		dispatch({ type: "REMOVE", targetId });
	};

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

	const settle = (cust) => {
		setUse(cust);
		if (cust.role === 1) {
			setadCss(true);
		} else if (cust.role === 2) {
			setCss(true);
		} else {
			setWtCss(true);
		}
	};

	const x = () => {
		setCss(false);
		setadCss(false);
		setWtCss(false);
	};

	const contextValue = React.useMemo(
		() => ({ onCreate, onEdit, onRemove }),
		[onCreate, onEdit, onRemove]
	);

	return (
		<DiaryStateContext.Provider value={data}>
			<DiaryDispatchContext.Provider
				value={{
					onCreate,
					onEdit,
					onRemove,
				}}
			>
				<div>
					<Routes>
						<Route path="/" element={<LoginForm fun={settle} />} />
						<Route
							path="/s8JcN7Q0kD3gT1fH4zYb/"
							element={<Complete data={{ adcss, x }} />}
						/>
						<Route path="/admin" element={<Admin data={{ adcss, x }} />} />
						
						<Route path="/home" element={<Home />} />
						<Route path="/new" element={<New />} />
						<Route path="/edit/:id" element={<Edit />} />
						<Route path="/diary/:id" element={<Diary />} />

						
                <Route path="/dashboard/:id" element={<UserAnalytics data={{ adcss, x }}/>} />
              
           
					</Routes>
				</div>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
	// <DiaryDispatchContext.Provider value={contextValue}>
	// 	<div>
	// 		<Routes>
	// 			<Route path="/" element={<LoginForm fun={settle} />} />
	// 			<Route
	// 				path="/s8JcN7Q0kD3gT1fH4zYb/"
	// 				element={<Complete data={{ adcss, x }} />}
	// 			/>
	// 			<Route path="/admin" element={<Admin data={{ adcss, x }} />} />
	// 			<Route
	// 				path="/dashboard/:userId"
	// 				element={<Dashboard data={{ adcss, x }} />}
	// 			/>
	// 			<Route path="/home" element={<Home />} />
	// 			<Route path="/new" element={<New />} />
	// 			<Route path="/edit/:id" element={<Edit />} />
	// 			<Route path="/diary/:id" element={<Diary />} />
	// 		</Routes>
	// 	</div>
	// </DiaryDispatchContext.Provider>
}

export default App;
