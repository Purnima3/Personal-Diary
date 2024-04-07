import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Patient from "../Patient/Patient";
import Feedback from "../Feedback/Feedback";

import {
	PieChart,
	Pie,
	Tooltip,
	Bar,
	BarChart,
	XAxis,
	YAxis,
	Legend,
	CartesianAxis,
} from "recharts";
import "./dashboard.css";

function Dashboard(props) {
	const data = [
		{ name: "Happy", value: 20 },
		{ name: "sad", value: 30 },
		{ name: "anger", value: 87 },
		{ name: "neutral", value: 45 },
		{ name: "excited", value: 76 },
	];
	return (
		<>
			<Navbar d={props.data} />
			<div className="outercontainer">
				<br />
				<h1 style={{ color: "white" }}>User Dashboard</h1>
				<br />
				<br />
				<div className="chart-container">
					<PieChart width={350} height={250}>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							cx={150}
							cy={100}
							outerRadius={80}
							fill="#8884d8"
							label
						/>
						<Tooltip />
					</PieChart>
					<BarChart
						width={550}
						height={250}
						data={data}
						margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					>
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="value" fill="#8884d8" />
						<Legend />
					</BarChart>
				</div>
			</div>

			<Feedback />
		</>
	);
}

export default Dashboard;
