import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../Papp";

import MyHeader from "./../Pcomponents/MyHeader";
import MyButton from "./../Pcomponents/MyButton";
import DiaryList from "./../Pcomponents/DiaryList";

const Home = ({ headText }) => {
	const diaryList = useContext(DiaryStateContext);

	const [data, setData] = useState([]);
	const [curDate, setCurDate] = useState(new Date());

	useEffect(() => {
		if (diaryList.length >= 1) {
			const todayStart = new Date(
				curDate.getFullYear(),
				curDate.getMonth(),
				curDate.getDate()
			).getTime();

			const todayEnd = new Date(
				curDate.getFullYear(),
				curDate.getMonth(),
				curDate.getDate(),
				23,
				59,
				59
			).getTime();

			setData(
				diaryList.filter((it) => todayStart <= it.date && it.date <= todayEnd)
			);
		} else {
			setData([]);
		}
	}, [diaryList, curDate]);

	const increaseDate = () => {
		setCurDate(new Date(curDate.setDate(curDate.getDate() + 1)));
	};

	const decreaseDate = () => {
		setCurDate(new Date(curDate.setDate(curDate.getDate() - 1)));
	};

	return (
		<div>
			<MyHeader
				headText={headText}
				leftChild={<MyButton text={"<"} onClick={decreaseDate} />}
				rightChild={<MyButton text={">"} onClick={increaseDate} />}
			/>
			<DiaryList diaryList={data} />
		</div>
	);
};

export default Home;
