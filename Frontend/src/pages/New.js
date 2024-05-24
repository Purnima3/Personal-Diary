import { useEffect } from "react";
import DiaryEditor from "../Pcomponents/DiaryEditor";
import "./styles.css";

const New = () => {
	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = `Emotional Diary - New Entry`;
	}, []);

	return (
		<div className="newPage">
			<DiaryEditor />
		</div>
	);
};

export default New;
