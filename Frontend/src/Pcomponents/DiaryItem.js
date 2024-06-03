import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date, emotions }) => {
	const navigate = useNavigate();

	const env = process.env;
	env.PUBLIC_URL = env.PUBLIC_URL || "";

	const strDate = new Date(parseInt(date)).toLocaleDateString();

	const goDetail = () => {
		navigate(`/diary/${id}`);
	};

	const goEdit = () => {
		navigate(`/edit/${id}`);
	};

	// console.log("Diary Item:", emotions);

	// Render a loading message or a fallback component if emotions array is empty
	// if (emotions.length === 0) {
	// 	return <div>Loading emotions...</div>;
	// }
	console.log("Emotions :", emotion);
	if (emotions == "Elated") {
		emotion = 1;
	} else if (emotions == "Happy") {
		emotion = 2;
	} else if (emotions == "Neutral") {
		emotion = 3;
	} else if (emotions == "Sad") {
		emotion = 4;
	} else if (emotions == "Depressed") {
		emotion = 5;
	}

	// Find the emotion name from the emotions array
	// const emotionName = emotions.includes(emotion) ? emotion : "Unknown";
	// const emotionIndex = emotions.indexOf(emotion);

	return (
		<div className="DiaryItem">
			<div
				onClick={goDetail}
				className={[
					"emotion_img_wrapper",
					`emotion_img_wrapper_${emotion}`,
				].join(" ")}
			>
				<img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
			</div>
			<div onClick={goDetail} className="info_wrapper">
				<div className="diary_date">{strDate}</div>
				<div className="diary_content_preview">{content.slice(0, 25)}</div>
				<div>Emotion : {emotions}</div>
			</div>
			<div className="btn_wrapper">
				<MyButton onClick={goEdit} text={"Edit"} />
			</div>
		</div>
	);
};

export default React.memo(DiaryItem);
