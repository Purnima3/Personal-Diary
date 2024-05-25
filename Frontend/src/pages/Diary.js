import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyHeader from "../Pcomponents/MyHeader";
import MyButton from "../Pcomponents/MyButton";

const Diary = () => {
	const { id } = useParams();
	const diaryList = useContext(DiaryStateContext);
	const navigate = useNavigate();
	const [data, setData] = useState();

	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = `Emotional Diary - Entry ${id}`;
	}, []);

	useEffect(() => {
		if (diaryList.length >= 1) {
			console.log("Diary list :", diaryList.length);
			const targetDiary = diaryList.find(
				(it) => parseInt(it.id) === parseInt(id)
			);

			if (targetDiary) {
				// When the diary exists
				setData(targetDiary);
			} else {
				// When the diary does not exist
				alert("Diary entry does not exist.");
				navigate("/s8JcN7Q0kD3gT1fH4zYb", { replace: true });
			}
		}
	}, [id, diaryList]);

	if (!data) {
		return <div className="DiaryPage">Loading...</div>;
	} else {
		const curEmotionData = emotionList.find(
			(it) => parseInt(it.emotion_id) === parseInt(data.emotion)
		);
		console.log(curEmotionData);

		return (
			<div className="DiaryPage">
				<MyHeader
					headText={`Record - ${getStringDate(new Date(data.date))}`}
					leftChild={
						<MyButton text={"< Go Back"} onClick={() => navigate(-1)} />
					}
					rightChild={
						<MyButton
							text={"Edit"}
							onClick={() => navigate(`/edit/${data.id}`)}
						/>
					}
				/>
				<article>
					<section>
						<h4>Today's Emotion</h4>
						<div
							className={[
								"diary_img_wrapper",
								`diary_img_wrapper_${data.emotion}`,
							].join(" ")}
						>
							<img src={curEmotionData.emotion_img} alt="Emotion" />
							<div className="emotion_descript">
								{curEmotionData.emotion_descript}
							</div>
						</div>
					</section>
					<section>
						<h4>Today's Diary</h4>
						<div className="diary_content_wrapper">
							<p>{data.content}</p>
						</div>
					</section>
				</article>
			</div>
		);
	}
};

export default Diary;
