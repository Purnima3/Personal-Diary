import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date, emotions, userId }) => {
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

	useEffect(() => {
		const sendEmotionToBackend = async () => {
			console.log("note ", id, " emotion ", emotions);
			try {
				const response = await axios.post(
					"http://localhost:4000/api/emotions",
					{
						noteId: id,
						emotion: getEmotionCode(emotions),
						// emotion: getEmotionCode(emotions),
					}
				);
				// console.log("emmm :", emotions);
				console.log("Emotion data sent:", response.data);
			} catch (error) {
				console.error("Error sending emotion data:", error);
			}
		};

		sendEmotionToBackend();
	}, [id, emotions]);

	const getEmotionCode = (emotionString) => {
		switch (emotionString) {
			case "Elated":
				return 1;
			case "Happy":
				return 2;
			case "Neutral":
				return 3;
			case "Sad":
				return 4;
			case "Depressed":
				return 5;
			default:
				return 0;
		}
	};

	return (
		<div className="DiaryItem">
			<div
				onClick={goDetail}
				className={[
					"emotion_img_wrapper",
					`emotion_img_wrapper_${getEmotionCode(emotions)}`,
				].join(" ")}
			>
				<img
					src={
						process.env.PUBLIC_URL +
						`assets/emotion${getEmotionCode(emotions)}.png`
					}
				/>
			</div>
			<div onClick={goDetail} className="info_wrapper">
				<div className="diary_date">{strDate}</div>
				<div className="diary_content_preview">{content.slice(0, 25)}</div>
				<div>Emotion: {emotions}</div>
			</div>
			<div className="btn_wrapper">
				<MyButton onClick={goEdit} text={"Edit"} />
			</div>
		</div>
	);
};

export default React.memo(DiaryItem);
