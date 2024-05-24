import React, {
	useState,
	useRef,
	useContext,
	useEffect,
	useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App.js";
import "./styles.css";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const DiaryEditor = ({ isEdit, originData }) => {
	const contentRef = useRef();
	const [content, setContent] = useState("");
	const [emotion, setEmotion] = useState(3);
	const [date, setDate] = useState(getStringDate(new Date()));

	const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
	const handleClickEmote = useCallback((emotion) => {
		setEmotion(emotion);
	}, []);

	const navigate = useNavigate();

	const handleSubmit = () => {
		if (content.length < 1) {
			contentRef.current.focus();
			return;
		}
		if (
			window.confirm(
				isEdit
					? "Do you want to edit the diary?"
					: "Do you want to create a new diary?"
			)
		) {
			if (!isEdit) {
				onCreate(date, content, emotion);
			} else {
				onEdit(originData.id, date, content, emotion);
			}
		}

		navigate("/s8JcN7Q0kD3gT1fH4zYb", { replace: true });
	};

	const handleRemove = () => {
		if (window.confirm("Are you sure you want to delete?")) {
			onRemove(originData.id);
			navigate("/s8JcN7Q0kD3gT1fH4zYb", { replace: true });
		}
	};

	useEffect(() => {
		if (isEdit) {
			setDate(getStringDate(new Date(parseInt(originData.date))));
			setEmotion(originData.emotion);
			setContent(originData.content);
		}
	}, [isEdit, originData]);

	return (
		<div className="DiaryEditor">
			<MyHeader
				headText={isEdit ? "Edit Diary" : "Create New Diary"}
				leftChild={<MyButton text={"< Go Back"} onClick={() => navigate(-1)} />}
				rightChild={
					isEdit && (
						<MyButton
							text={"Delete"}
							type={"negative"}
							onClick={handleRemove}
						/>
					)
				}
			/>
			<div>
				<section>
					<h4>When is today?</h4>
					<div className="input_box">
						<input
							className="input_date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							type="date"
						/>
					</div>
				</section>
				<section>
					<h4>Today's Emotion</h4>
					<div className="input_box emotion_list_wrapper">
						{emotionList.map((it) => (
							<EmotionItem
								key={it.emotion_id}
								{...it}
								onClick={handleClickEmote}
								isSelected={it.emotion_id === emotion}
							/>
						))}
					</div>
				</section>
				<section>
					<h4>Today's Diary</h4>
					<div className="input_box text_wrapper">
						<textarea
							placeholder="How was your day?"
							ref={contentRef}
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
				</section>
				<section>
					<div className="control_box">
						<MyButton text={"Cancel"} onClick={() => navigate(-1)} />
						<MyButton
							text={"Submit"}
							type={"positive"}
							onClick={handleSubmit}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default DiaryEditor;
