import React, { createContext, useEffect, useState } from "react";

// Create the context
export const EmotionContext = createContext();

// Create the component that will provide the emotion data
export const EmotionProvider = ({ sentimentResults, children }) => {
	const [emotions, setEmotions] = useState([]);

	useEffect(() => {
		// Extract the emotion column from the sentimentResults array
		const extractedEmotions = sentimentResults.map((result) => result.emotion);
		setEmotions(extractedEmotions);
	}, [sentimentResults]);

	return (
		<EmotionContext.Provider value={emotions}>
			{children}
		</EmotionContext.Provider>
	);
};
