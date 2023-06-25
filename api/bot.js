const pptr = require("puppeteer");
const fs = require("fs");
const e = require("express");

const bot = {
	browser: null,
	page: null,

	init: async () => {
		bot.browser = await pptr.launch({
			headless: "new",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		bot.page = await bot.browser.newPage();
		// Configure the navigation timeout
		await bot.page.setDefaultNavigationTimeout(0);
		await bot.page.setViewport({
			width: 1280,
			height: 768,
			deviceScaleFactor: 1,
		});
		bot.page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36");
	},

	start: async () => {
		const url = "https://www.airbnb.co.id/rooms/791880286688928875";
		await bot.page.goto(url, { waitUntil: "networkidle2" });
		await bot.getMonth();
		bot.browser.close();
	},

	getMonth: async () => {
		let date = [];
		let month = [];

		const monthTarget = await bot.page.$("div._1foj6yps > div");
		for (let i = 2; i <= 3; i++) {
			try {
				// get month year
				const monthData = await monthTarget.$eval("div:nth-child(" + i + ") > div > div > div > h3", (el) => el.innerText);

				const weekTargets = await bot.page.$$("div._1foj6yps > div > div:nth-child(" + i + ") > div > table > tbody > tr");
				j = 0;
				for (const weekTarget of weekTargets) {
					j++;
					console.log("=== " + monthData.substring(0, 3) + " week " + j + " ===");
					for (let k = 1; k <= 7; k++) {
						let dateLabel = "-";
						let dateOut = "unavailable";
						let dateIsBlock = false;
						let dateData;
						try {
							dateData = await weekTarget.$eval("td:nth-child(" + k + ")", (el) => el.innerText);
							if (dateData != "") {
								dateLabel = await weekTarget.$eval("td:nth-child(" + k + ")", (el) => el.getAttribute("aria-label"));
								dateOut = dateLabel.includes("hanya") || dateLabel.includes("Tidak") ? "unavailable" : "available";
								const checkDateStatus = await weekTarget.$eval("td:nth-child(" + k + ") > div", (el) => el.getAttribute("data-is-day-blocked"));
								dateIsBlock = checkDateStatus.includes("true") ? true : false;
							} else {
								dateData = "0";
							}
							date.push({ date: parseInt(dateData), label: dateLabel, status: dateOut, isBlock: dateIsBlock });
						} catch (e) {
							weekData = "";
						}
					}
				}
				month.push({ month: monthData });
				// get date
			} catch (e) {
				console.log(e);
			}
		}

		if (month.length > 0) {
			var jsonData = JSON.stringify(month);
			fs.writeFile("../web/assets/month.json", jsonData, function (err) {
				if (err) {
					console.log(err);
				}
			});

			var jsonData = JSON.stringify(date);
			fs.writeFile("../web/assets/date.json", jsonData, function (err) {
				if (err) {
					console.log(err);
				}
			});
		}
	},
};

module.exports = bot;
