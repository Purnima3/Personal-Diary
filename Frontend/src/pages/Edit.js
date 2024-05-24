import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../Pcomponents/DiaryEditor";

const Edit = () => {
	const [originData, setOriginData] = useState();
	const navigate = useNavigate();
	const { id } = useParams();

	const diaryList = useContext(DiaryStateContext);

	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = `Emotional Diary - Editing Entry ${id}`;
	}, []);

	useEffect(() => {
		if (diaryList.length >= 1) {
			const targetDiary = diaryList.find(
				(it) => parseInt(it.id) === parseInt(id)
			);

			if (targetDiary) {
				setOriginData(targetDiary);
			} else {
				alert("Diary entry does not exist.");
				navigate("/s8JcN7Q0kD3gT1fH4zYb", { replace: true });
			}
		}
	}, [id, diaryList]);

	return (
		<div className="newPage">
			{originData && <DiaryEditor isEdit={true} originData={originData} />}
		</div>
	);
};

export default Edit;
