import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";
import useEmotionsContext from "./useEmotionContext";

const sortOptionList = [
	{ value: "latest", name: "Latest" },
	{ value: "oldest", name: "Oldest" },
];

const filterOptionList = [
	{ value: "all", name: "All" },
	{ value: "good", name: "Positive Emotions" },
	{ value: "bad", name: "Negative Emotions" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
	return (
		<select
			className="ControlMenu"
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			{optionList.map((it, idx) => (
				<option key={idx} value={it.value}>
					{it.name}
				</option>
			))}
		</select>
	);
});

const DiaryList = ({ diaryList, user }) => {
	const navigate = useNavigate();
	const [sortType, setSortType] = useState("latest");
	const [filter, setFilter] = useState("all");
	const emotions = useEmotionsContext(); // Get emotions data from custom hook
	console.log("Emooooto ", emotions);
	const getProcessedDiaryList = () => {
		const filterCallBack = (item) => {
			if (filter === "good") {
				return parseInt(item.emotion) <= 3;
			} else if (filter === "bad") {
				return parseInt(item.emotion) > 3;
			} else {
				return true;
			}
		};

		const compare = (a, b) => {
			if (sortType === "latest") {
				return parseInt(b.date) - parseInt(a.date);
			} else {
				return parseInt(a.date) - parseInt(b.date);
			}
		};

		const copyList = JSON.parse(JSON.stringify(diaryList));
		const filteredList =
			filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
		const sortedList = filteredList.sort(compare);
		return sortedList;
	};
	const diaryEntries = getProcessedDiaryList();

	return (
		<div className="DiaryList">
			<div className="menu_wrapper">
				<div className="left_col">
					<ControlMenu
						value={sortType}
						onChange={setSortType}
						optionList={sortOptionList}
					/>
					<ControlMenu
						value={filter}
						onChange={setFilter}
						optionList={filterOptionList}
					/>
				</div>
				<div className="right_col">
					<MyButton
						type={"positive"}
						text={"Write New Diary"}
						onClick={() => navigate("/new")}
					/>
				</div>
			</div>
			{diaryEntries.map((it, index) => (
				<DiaryItem
					key={it.id}
					{...it}
					emotions={emotions[index % emotions.length]}
				/> // Pass emotions prop
			))}
		</div>
	);
};

DiaryList.defaultProps = {
	diaryList: [],
};

export default DiaryList;
