// Navbar Fixed
window.onscroll = function () {
	const header = document.querySelector("header");
	const fixedNav = header.offsetTop;
	const toTop = document.querySelector("#to-top");

	if (window.pageYOffset > fixedNav) {
		header.classList.add("navbar-fixed");
		toTop.classList.remove("hidden");
		toTop.classList.add("flex");
	} else {
		header.classList.remove("navbar-fixed");
		toTop.classList.remove("flex");
		toTop.classList.add("hidden");
	}
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
	hamburger.classList.toggle("hamburger-active");
	navMenu.classList.toggle("hidden");
});

// Klik di luar hamburger
window.addEventListener("click", function (e) {
	if (e.target != hamburger && e.target != navMenu) {
		hamburger.classList.remove("hamburger-active");
		navMenu.classList.add("hidden");
	}
});

// progress bar
window.addEventListener("scroll", function () {
	var scrollY = window.pageYOffset || document.documentElement.scrollTop;
	var winHeight = window.innerHeight || document.documentElement.clientHeight;
	var docHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
	var scrollPercent = (scrollY / (docHeight - winHeight)) * 100;
	document.querySelector("#readingProgress").style.width = scrollPercent + "%";
});

function initMap() {
	// Menampilkan peta pada div dengan id 'map'
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 15,
		center: { lat: -6.1754, lng: 106.8272 },
	});

	// Menambahkan marker pada lokasi yang ditentukan
	var marker = new google.maps.Marker({
		position: { lat: -6.1754, lng: 106.8272 },
		map: map,
		title: "Lokasi Saya",
	});
}
