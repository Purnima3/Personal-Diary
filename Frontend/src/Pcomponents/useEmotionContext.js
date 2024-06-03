// File: useEmotionsContext.js
import { useContext } from "react";
import { EmotionContext } from "./EmotionProvider";

const useEmotionsContext = () => {
	const emotions = useContext(EmotionContext);

	return emotions;
};

export default useEmotionsContext;
