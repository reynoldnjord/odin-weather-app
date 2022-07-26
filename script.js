const fetchWeather = async (cityName) => {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=dd13b84a2d85a340b85ad6416a95339b`,
		{ mode: "cors" }
	);
	const weatherJson = await response.json();
	try {
		const city = () => {
			return weatherJson.city.name;
		};

		const weather = () => {
			return weatherJson.list[2].weather[0].description;
		};

		const windSpeed = () => {
			return weatherJson.list[2].wind.speed;
		};

		const temp = () => {
			return weatherJson.list[2].main.temp;
		};

		const feelsLike = () => {
			return weatherJson.list[2].main.feels_like;
		};

		const humidity = () => {
			return weatherJson.list[2].main.humidity;
		}

		const weatherObj = {
			city: city(),
			weather: weather(),
			windSpeed: windSpeed(),
			temp: temp(),
			feelsLike: feelsLike(),
			humidity: humidity(),
		};

		return weatherObj;
	} catch(err) {
		alert('City does not exist. Please try entering a different city');
	}
};

const DomManipulation = (() => {
	const form = document.querySelector("form");
	const weatherBlock = document.querySelector("div");

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		(async () => {
			const city = await (
				await fetchWeather(`${form.elements["city"].value}`)
			).city;
			const weather = await (
				await fetchWeather(`${form.elements['city'].value}`)
			).weather
			const windSpeed = await (
				await fetchWeather(`${form.elements['city'].value}`)
			).windSpeed;
			const temp = await (
				await fetchWeather(`${form.elements['city'].value}`)
			).temp;
			const feelsLike = await (
				await fetchWeather(`${form.elements['city'].value}`)
			).feelsLike;
			const humidity = await (
				await fetchWeather(`${form.elements['city'].value}`)
			).humidity;
			weatherBlock.innerHTML = `<p class='city'>${city}</p>
			<p class='wt'>
			<span>${weather}</span>
			<span>${(temp-273.15).toFixed(2)}℃</span>
			</p>
			<div>
				<p>feels like: ${(feelsLike-273).toFixed(2)}℃</p>
				<p>humidity: ${humidity}%</p>
				<p>wind: ${windSpeed} km/h</p>
			</div>`;
		})();
	});
})();
