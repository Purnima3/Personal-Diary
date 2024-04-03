import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

import terms from "./terms.js";

function LoginForm(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [showCustomAlert, setShowCustomAlert] = useState(false);
	const navigate = useNavigate();

	const handleEmailChange = (event) => {
		const { value } = event.target;
		setEmail(value);
		setErrors({});
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		setErrors({});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!email.trim()) {
			setErrors({ emailError: "Email is required" });
			return;
		}

		if (!password.trim()) {
			setErrors({ passwordError: "Password is required" });
			return;
		}

		try {
			const response = await fetch("http://localhost:4000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			const responseData = await response.json();
			console.log(responseData);
			const { user_id, token, user_roleId } = responseData; // Change user_role to user_id

			const decodedToken = jwtDecode(token);
			const names = decodedToken.userName;
			const ids = decodedToken.userId;
			await terms.fun({ name: names, id: ids, role: user_roleId });

			if (user_roleId === 1) {
				navigate("/admin");
			} 
			else if (user_roleId === 2) {
				navigate("/s8JcN7Q0kD3gT1fH4zYb");
			}
		} catch (error) {
			setShowCustomAlert(true);
			console.error("Login error:", error);
		}
	};

	return (
		<div id="login-main">
			<div className="login-background">
				<div className="login-container">
					<center>
						<h2>Personal Diary</h2>
					</center>
					<form onSubmit={handleSubmit} id="login-form">
						<div className="login-input-group">
							<label htmlFor="login-email">Email</label>
							<input
								type="text"
								id="login-email"
								name="login-email"
								value={email}
								onChange={handleEmailChange}
								required
							/>
							<br />
							{errors.emailError && (
								<span className="login-error">{errors.emailError}</span>
							)}
						</div>
						<div className="login-input-group">
							<label htmlFor="login-password">Password</label>
							<input
								type="password"
								id="login-password"
								name="login-password"
								value={password}
								onChange={handlePasswordChange}
								required
							/>
							{errors.passwordError && (
								<span className="login-error">{errors.passwordError}</span>
							)}
						</div>
						<center>
							<button type="submit" className="btn-login">
								Log In
							</button>
						</center>
					</form>
					{showCustomAlert && (
						<div className="custom-alert">
							<div className="custom-alert-content">
								<center>
									<span id="login-LoginFrom-waringSign">
										Wrong ID and Password
									</span>
								</center>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default LoginForm;
