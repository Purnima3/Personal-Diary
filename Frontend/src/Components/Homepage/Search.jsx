// src/Search.js
import React from "react";

const Search = ({ handleSearch }) => {
	return (
		<div className="search">
			<input
				type="text"
				placeholder="Write your thoughts..."
				onChange={handleSearch}
			/>
			<button onClick={() => {}}>Save</button>
		</div>
	);
};

export default Search;
