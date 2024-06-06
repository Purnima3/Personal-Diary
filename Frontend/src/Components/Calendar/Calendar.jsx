// src/components/Calendar.js
import React, { useEffect, useContext } from "react";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import { SelectedDateContext } from "../SelectedDay/SelectedDayContext";
import "./Calendar.css";

const Calendar = () => {
	const { setSelectedDate } = useContext(SelectedDateContext);
	useEffect(() => {
		(function ($) {
			"use strict";

			var today = new Date(),
				year = today.getFullYear(),
				month = today.getMonth(),
				monthTag = [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				day = today.getDate(),
				days,
				selectedDay,
				setDate,
				daysLen;

			function Calendar(selector, options) {
				this.options = options;
				this.draw();
			}

			Calendar.prototype.draw = function () {
				this.getCookie("selected_day");
				this.getOptions();
				this.drawDays();
				var that = this,
					reset = document.getElementById("reset"),
					pre = document.getElementsByClassName("pre-button"),
					next = document.getElementsByClassName("next-button");

				pre[0].addEventListener("click", function () {
					that.preMonth();
				});
				next[0].addEventListener("click", function () {
					that.nextMonth();
				});
				reset.addEventListener("click", function () {
					that.reset();
				});
				while (daysLen--) {
					days[daysLen].addEventListener("click", function () {
						that.clickDay(this);
					});
				}
			};

			Calendar.prototype.drawHeader = function (e) {
				var headDay = document.getElementsByClassName("head-day"),
					headMonth = document.getElementsByClassName("head-month");

				e ? (headDay[0].innerHTML = e) : (headDay[0].innerHTML = day);
				headMonth[0].innerHTML = monthTag[month] + " - " + year;
			};

			Calendar.prototype.drawDays = function () {
				days = document.getElementsByTagName("td");
				daysLen = days.length;

				var startDay = new Date(year, month, 1).getDay(),
					nDays = new Date(year, month + 1, 0).getDate(),
					n = startDay;

				for (var k = 0; k < 42; k++) {
					days[k].innerHTML = "";
					days[k].id = "";
					days[k].className = "";
				}

				for (var i = 1; i <= nDays; i++) {
					days[n].innerHTML = i;
					n++;
				}

				for (var j = 0; j < 42; j++) {
					if (days[j].innerHTML === "") {
						days[j].id = "disabled";
					} else if (j === day + startDay - 1) {
						if (
							(this.options &&
								month === setDate.getMonth() &&
								year === setDate.getFullYear()) ||
							(!this.options &&
								month === today.getMonth() &&
								year === today.getFullYear())
						) {
							this.drawHeader(day);
							days[j].id = "today";
						}
					}
					if (selectedDay) {
						if (
							j === selectedDay.getDate() + startDay - 1 &&
							month === selectedDay.getMonth() &&
							year === selectedDay.getFullYear()
						) {
							days[j].className = "selected";
							this.drawHeader(selectedDay.getDate());
						}
					}
				}
			};

			Calendar.prototype.clickDay = function (o) {
				var selected = document.getElementsByClassName("selected"),
					len = selected.length;
				if (len !== 0) {
					selected[0].className = "";
				}
				o.className = "selected";
				selectedDay = new Date(year, month, o.innerHTML);
				this.drawHeader(o.innerHTML);
				this.setCookie("selected_day", 1);

				// Call setSelectedDate here
				setSelectedDate(selectedDay);
			};

			// ... (rest of t})(window.jQuery);

			// Calendar.prototype.sendSelectedDate = function (date) {
			// 	setSelectedDate(date); // Update context value
			// 	// console.log("Fdateee ", date);
			// };

			Calendar.prototype.preMonth = function () {
				if (month < 1) {
					month = 11;
					year = year - 1;
				} else {
					month = month - 1;
				}
				this.drawHeader(1);
				this.drawDays();
			};

			Calendar.prototype.nextMonth = function () {
				if (month >= 11) {
					month = 0;
					year = year + 1;
				} else {
					month = month + 1;
				}
				this.drawHeader(1);
				this.drawDays();
			};

			Calendar.prototype.getOptions = function () {
				if (this.options) {
					var sets = this.options.split("-");
					setDate = new Date(sets[0], sets[1] - 1, sets[2]);
					day = setDate.getDate();
					year = setDate.getFullYear();
					month = setDate.getMonth();
				}
			};

			Calendar.prototype.reset = function () {
				month = today.getMonth();
				year = today.getFullYear();
				day = today.getDate();
				this.options = undefined;
				this.drawDays();
			};

			Calendar.prototype.setCookie = function (name, expiredays) {
				if (expiredays) {
					var date = new Date();
					date.setTime(date.getTime() + expiredays * 24 * 60 * 60 * 1000);
					var expires = "; expires=" + date.toGMTString();
				} else {
					var expires = "";
				}
				document.cookie = name + "=" + selectedDay + expires + "; path=/";
			};

			Calendar.prototype.getCookie = function (name) {
				if (document.cookie.length) {
					var arrCookie = document.cookie.split(";"),
						nameEQ = name + "=";
					for (var i = 0, cLen = arrCookie.length; i < cLen; i++) {
						var c = arrCookie[i];
						while (c.charAt(0) == " ") {
							c = c.substring(1, c.length);
						}
						if (c.indexOf(nameEQ) === 0) {
							selectedDay = new Date(c.substring(nameEQ.length, c.length));
						}
					}
				}
			};

			var calendar = new Calendar();
		})(window.jQuery);
	}, [setSelectedDate]);

	return (
		<section className="ftco-section">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 text-center mb-5"></div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="elegant-calencar d-md-flex">
							<div className="wrap-header d-flex align-items-center">
								<p id="reset">Today</p>
								<div id="header" className="p-0">
									<div className="pre-button d-flex align-items-center justify-content-center">
										<i className="fa fa-chevron-left"></i>
									</div>
									<div className="head-info">
										<div className="head-day"></div>
										<div className="head-month"></div>
									</div>
									<div className="next-button d-flex align-items-center justify-content-center">
										<i className="fa fa-chevron-right"></i>
									</div>
								</div>
							</div>
							<div className="calendar-wrap">
								<table id="calendar">
									<thead>
										<tr>
											<th>Sun</th>
											<th>Mon</th>
											<th>Tue</th>
											<th>Wed</th>
											<th>Thu</th>
											<th>Fri</th>
											<th>Sat</th>
										</tr>
									</thead>
									<tbody>
										{[...Array(6)].map((_, rowIndex) => (
											<tr key={rowIndex}>
												{[...Array(7)].map((_, cellIndex) => (
													<td key={cellIndex}></td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Calendar;
