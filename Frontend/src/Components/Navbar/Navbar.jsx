import React from "react";

import { useNavigate } from "react-router-dom";
import terms from "./terms";

const Navbar = (props) => {
	if (props.data && props.data.css ? props.data.css : true) {
		import("./Navbar.css");
	}
	const navigate = useNavigate();
	const handleLogout = async () => {
		props.d.x();
		await terms.fun2();
		navigate("/");
		window.location.reload(true);
	};

	return (
		<div className="nav">
			<div id="fir">
				<div id="ine"></div>
				<div id="tuo">PERSONAL DIARY</div>
			</div>

			<div id="tex">
				<div id="usern">Hello {terms.user.name}</div>
				<div
					className="buttona"
					id="log"
					onClick={() => {
						handleLogout();
					}}
				>
					Logout
				</div>
			</div>
		</div>
	);
};

export default Navbar;
