import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../Papp";

import MyHeader from "./../Pcomponents/MyHeader";
import MyButton from "./../Pcomponents/MyButton";
import DiaryList from "./../Pcomponents/DiaryList";
import terms from "../terms";

import { SelectedDateContext } from "../Components/SelectedDay/SelectedDayContext";

const Home = () => {
	const diaryList = useContext(DiaryStateContext);
	const { selectedDate } = useContext(SelectedDateContext);
	// console.log("dateee  ", selectedDate);
	const [data, setData] = useState([]);
	const [curDate, setCurDate] = useState(new Date());

	const dateToUse = selectedDate || curDate;
	const headText = `${dateToUse.getFullYear()} - ${
		dateToUse.getMonth() + 1
	} - ${dateToUse.getDate()}`;

	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = `Emotional Diary`;
	}, []);
	useEffect(() => {
		if (diaryList.length >= 1) {
			console.log(diaryList.length);

			const todayStart = new Date(
				dateToUse.getFullYear(),
				dateToUse.getMonth(),
				dateToUse.getDate()
			).getTime();
			const todayEnd = new Date(
				dateToUse.getFullYear(),
				dateToUse.getMonth(),
				dateToUse.getDate(),
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
	}, [diaryList, selectedDate, curDate]);

	const increaseDate = () => {
		setCurDate(new Date(dateToUse.setDate(dateToUse.getDate() + 1)));
	};

	const decreaseDate = () => {
		setCurDate(new Date(dateToUse.setDate(dateToUse.getDate() - 1)));
	};

	return (
		<div>
			<MyHeader
				headText={headText}
				leftChild={<MyButton text={"<"} onClick={decreaseDate} />}
				rightChild={<MyButton text={">"} onClick={increaseDate} />}
			/>
			{/* {console.log(data)} */}
			<DiaryList diaryList={data} user={terms.user} />
		</div>
	);
};

export default Home;
