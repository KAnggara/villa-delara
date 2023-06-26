function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
}

//usage:
readTextFile("./assets/month.json", function (text) {
	const month = JSON.parse(text);
	const title1 = month[0].month;
	const title2 = month[1].month;
	window.addEventListener("load", function () {
		document.getElementById("title1").innerHTML = title1;
		document.getElementById("title2").innerHTML = title2;
	});
});

readTextFile("./assets/date.json", function (text) {
	const dates = JSON.parse(text);

	let i = 0;
	let idx = [];
	for (const date of dates) {
		isSu = i % 7 == 0 ? true : false;
		isSu && date.date >= 25 ? idx.push(i + 6) : "";
		i++;
	}

	let date = 0;
	let start = 0;
	let end = 6;
	for (let week = 1; week <= (idx[0] + 1) / 7; week++) {
		const newRow1 = document.createElement("tr");
		for (i = start; i <= end; i++) {
			date = dates[i].date;
			avail = dates[i].status == "available" ? "text-black" : "text-gray-500";
			pointer = dates[i].status == "available" ? "cursor-pointer" : "cursor-not-allowed";
			const tdDate = document.createElement("td");
			if (date != 0) {
				const div = document.createElement("div");
				div.classList.add("flex", "w-full", pointer, "items-center", "justify-center", "rounded-full", "p-2", "font-medium", avail);
				if (dates[i].status == "available") {
					div.classList.add("hover:h-8");
					div.classList.add("hover:w-8");
					div.classList.add("hover:bg-indigo-500");
					div.classList.add("hover:bg-indigo-500");
					div.classList.add("hover:text-white");
				}
				const p = document.createElement("p");
				p.setAttribute("aria-label", dates[i].label);
				isBlock = dates[i].isBlock ? p.classList.add("text-base", "line-through") : p.classList.add("text-base");
				p.textContent = date;
				div.appendChild(p);
				tdDate.appendChild(div);
			}

			newRow1.appendChild(tdDate);
		}
		start += 7;
		end += 7;

		window.addEventListener("load", function () {
			const target = document.getElementById("calendar1");
			target.appendChild(newRow1);
		});
	}

	date = 0;
	start = idx[0] + 1;
	end = idx[0] + 7;
	for (let week = 1; week <= (idx[1] + 1) / 7; week++) {
		const newRow1 = document.createElement("tr");
		for (i = start; i <= end; i++) {
			if (i < dates.length) {
				date = dates[i].date;
				avail = dates[i].status == "available" ? "text-black" : "text-gray-500";
				pointer = dates[i].status == "available" ? "cursor-pointer" : "cursor-not-allowed";
			}
			const tdDate = document.createElement("td");
			if (date != 0) {
				const div = document.createElement("div");
				div.classList.add("flex", "w-full", pointer, "items-center", "justify-center", "rounded-full", "p-2", "font-medium", avail);
				if (dates[i].status == "available") {
					div.classList.add("hover:h-8");
					div.classList.add("hover:w-8");
					div.classList.add("hover:bg-indigo-500");
					div.classList.add("hover:bg-indigo-500");

					div.classList.add("hover:text-white");
				}
				const p = document.createElement("p");
				p.setAttribute("aria-label", dates[i].label);
				isBlock = dates[i].isBlock ? p.classList.add("text-base", "line-through") : p.classList.add("text-base");
				p.textContent = date;
				div.appendChild(p);
				tdDate.appendChild(div);
			}

			newRow1.appendChild(tdDate);
		}
		start += 7;
		end += 7;

		const target = document.getElementById("calendar2");
		window.addEventListener("load", function () {
			target.appendChild(newRow1);
		});
	}
});
