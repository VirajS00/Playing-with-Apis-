const textColor = (rgb) => {
	let color = rgb.split(',');
	let total = parseFloat(color[0]) + parseFloat(color[1]) + parseFloat(color[2]);
	if (total > 350) {
		return '#000000';
	} else {
		return '#ffffff';
	}
};

const GetFruits = async () => {
	const res = await fetch('fruits.json');
	const json = await res.json();
	return json;
};

const capFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const getCovidInfo = async (el, word) => {
	document.getElementById('loader').style.display = 'flex';
	const data = await fetch('https://api.covid19api.com/summary');
	const json = await data.json();
	const w = word.toUpperCase();
	const countryResp = await fetch('countries.json');
	const countries = await countryResp.json();
	let totalCases;
	let totalDeaths;
	let totalRec;
	let head;

	if (w == 'COVID' || w == 'COVID19' || w == 'CORONAVIRUS' || w == 'CARONA' || w == 'COVIDVIRUS') {
		totalCases = json.Global.TotalConfirmed;
		totalDeaths = json.Global.TotalDeaths;
		totalRec = json.Global.TotalRecovered;
		head = 'Covid-19 - Global 🌏';
	} else if (countries.some((item) => item.name.toUpperCase() == w)) {
		let index = json.Countries.findIndex((a) => a.Slug == word.toLowerCase());
		totalCases = json.Countries[index].TotalConfirmed;
		totalDeaths = json.Countries[index].TotalDeaths;
		totalRec = json.Countries[index].TotalRecovered;
		let indexC = countries.findIndex((a) => a.name == capFirstLetter(word));
		let flag = countries[indexC].flag;
		head = 'Covid-19 - ' + json.Countries[index].Country + ' ' + flag;
	}

	const dataDiv = document.createElement('div');
	const h2 = document.createElement('h2');
	h2.textContent = head;
	h2.style.textAlign = 'center';
	const DeathsH2 = document.createElement('h2');
	DeathsH2.classList.add('covidData');
	const casesH2 = document.createElement('h2');
	casesH2.classList.add('covidData');
	const recH2 = document.createElement('h2');
	recH2.classList.add('covidData');
	DeathsH2.innerHTML = addComas(totalDeaths) + '<br>';
	casesH2.innerHTML = addComas(totalCases) + '<br>';
	recH2.innerHTML = addComas(totalRec) + '<br>';
	const SpanInfo = document.createElement('div');
	SpanInfo.classList.add('infoSpan');
	SpanInfo.innerHTML = 'Total Deaths';
	const SpanInfo1 = document.createElement('div');
	SpanInfo1.classList.add('infoSpan');
	SpanInfo1.innerHTML = 'Total Cases';
	const SpanInfo2 = document.createElement('div');
	SpanInfo2.classList.add('infoSpan');
	SpanInfo2.innerHTML = 'Total Recovered';
	DeathsH2.appendChild(SpanInfo);
	casesH2.appendChild(SpanInfo1);
	recH2.appendChild(SpanInfo2);
	dataDiv.appendChild(h2);
	dataDiv.appendChild(DeathsH2);
	dataDiv.appendChild(casesH2);
	dataDiv.appendChild(recH2);
	document.getElementById('loader').style.display = 'none';
	el.appendChild(dataDiv);
};

const drawShape = async (el, word) => {
	const shape = document.createElement('div');
	let jsondata = await GetFruits();
	let shapeClass = jsondata.shapes[word.toLowerCase()];
	shape.classList.add(shapeClass);
	let r = Math.floor(Math.random() * 240) + 1;
	let g = Math.floor(Math.random() * 240) + 1;
	let b = Math.floor(Math.random() * 240) + 1;
	shape.style.setProperty('--bg-color', `rgb(${r},${g},${b})`);
	el.appendChild(shape);
};

const addComas = (n) => {
	const str = n.toString();
	const regex = /\B(?=(\d{3})+(?!\d))/g;
	const regex2 = /\B(?=(\d{2})+.(?!(\d{1})))+(?=(\d{2})+(?!(\d{3})))/g;
	let op;
	if (n >= 1000 && n <= 99999) {
		op = str.replace(regex, ',');
	} else {
		op = str.replace(regex2, ',');
	}
	return op;
};

getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

const randomProperty = (obj, el) => {
	const keys = Object.keys(obj);
	const shape = document.createElement('div');
	let shapeClass = obj[keys[(keys.length * Math.random()) << 0]];
	let shapeName = getKeyByValue(obj, shapeClass);
	shape.classList.add(shapeClass);
	let r = Math.floor(Math.random() * 240) + 1;
	let g = Math.floor(Math.random() * 240) + 1;
	let b = Math.floor(Math.random() * 240) + 1;
	shape.style.setProperty('--bg-color', `rgb(${r},${g},${b})`);
	let shpName = document.createElement('h2');
	if (shapeName == 'octagon' || shapeName == 'hexagon') {
		shpName.setAttribute('style', 'margin-top: 100px;');
	}
	shpName.textContent = capFirstLetter(shapeName);
	el.appendChild(shape);
	el.appendChild(shpName);
};

const ChkTime = (t) => (t < 10 ? '0' + t : t);

const setRotation = (element, rotationRatio) => element.style.setProperty('--rotation', rotationRatio * 360);

const paintClock = (content1) => {
	content1.innerHTML = '';
	const clock = document.createElement('div');
	clock.classList.add('clock');
	let html = `<div class="hourHand clockHand" data-hour-hand></div>`;
	html += `<div class="minuteHand clockHand" data-minutes-hand></div>`;
	html += `<div class="secondHand clockHand" data-seconds-hand></div>`;
	html += `<div class="cicle"></div>`;
	for (let i = 0; i < 12; i++) {
		html += `<div class="number number${i}">${i}</div>`;
	}
	html += `<div class="digitalCl" id="digitalTime"></div>`;
	clock.innerHTML = html;
	content1.style.backgroundColor = '#000000';
	content1.appendChild(clock);
	const hourHand = document.querySelector('[data-hour-hand]');
	const minHand = document.querySelector('[data-minutes-hand]');
	const secHand = document.querySelector('[data-seconds-hand]');
	const digitalTime = document.getElementById('digitalTime');
	setInterval(() => {
		const currentDate = new Date();
		const hours = ChkTime(currentDate.getHours());
		const min = ChkTime(currentDate.getMinutes());
		const sec = ChkTime(currentDate.getSeconds());
		const secondsRatio = currentDate.getSeconds() / 60;
		const minRatio = (secondsRatio + currentDate.getMinutes()) / 60;
		const hoursRatio = (minRatio + currentDate.getHours()) / 12;
		setRotation(secHand, secondsRatio);
		setRotation(minHand, minRatio);
		setRotation(hourHand, hoursRatio);

		digitalTime.textContent = `${hours}:${min}:${sec}`;
	}, 1000);
};

const generateSong = (el) => {
	document.getElementById('loader').style.display = 'flex';
	fetch('php/song.php', {
		method : 'post'
	})
		.then((response) => response.json())
		.then((json) => {
			let songInfo = json.response.song;
			let img = songInfo.header_image_thumbnail_url;
			let ArtistName;
			let SongName = songInfo.full_title;
			let lnk = songInfo.apple_music_player_url;
			if (songInfo.album == null || songInfo.album == undefined) {
				let n = SongName.split('by');
				ArtistName = n[1];
			} else {
				ArtistName = songInfo.album.artist.name;
			}
			let sName = SongName.replace(/by.*$/, '');
			const songHolder = document.createElement('div');
			songHolder.classList.add('songHolder');
			songHolder.innerHTML = `<a href="${lnk}"  target="popup" onclick="window.open('${lnk}','popup','width=400,height=400')"><img src="${img}" alt="" height="150px"></a>`;
			const songName = document.createElement('div');
			songName.classList.add('songName');
			songName.textContent = sName;
			console.log(SongName);
			const sArtist = document.createElement('div');
			sArtist.classList.add('sArtist');
			sArtist.textContent = ArtistName;
			songHolder.appendChild(songName);
			songHolder.appendChild(sArtist);
			document.getElementById('loader').style.display = 'none';
			el.appendChild(songHolder);
		});
};

const generateNews = (el) => {
	const data = new FormData();
	data.append('update', 1);
	document.getElementById('loader').style.display = 'flex';
	fetch('php/news.php', {
		method : 'post',
		body   : data
	})
		.then((response) => response.json())
		.then((json) => {
			const articles = document.createElement('ul');
			articles.classList.add('articles');
			articles.innerHTML = `<li class="titleNews">NEWS</li>`;
			let articlesArr = json.articles;
			for (let i = 0; i < 5; i++) {
				let title = articlesArr[i].title;
				let img = articlesArr[i].urlToImage;
				let link = articlesArr[i].url;
				const li = document.createElement('li');
				li.classList.add('newsItem');
				const a = document.createElement('a');
				a.setAttribute('target', '_blank');
				a.href = link;
				a.classList.add('newsLink');
				a.innerHTML = `<img src="${img}" height="50px" class="newsImg">${title}`;
				li.appendChild(a);
				document.getElementById('loader').style.display = 'none';
				articles.appendChild(li);
			}
			el.appendChild(articles);
		});
};

const getWeather = async () => {
	const today = new Date();
	document.getElementById('loader').style.display = 'flex';
	const hours = today.getHours();
	let bgcolor, img;

	const res = await fetch('http://www.geoplugin.net/json.gp');
	const jsondata = await res.json();
	let lat = jsondata.geoplugin_latitude;
	let lon = jsondata.geoplugin_longitude;

	const fd = new FormData();
	fd.append('lat', lat);
	fd.append('lon', lon);

	let req = await fetch('php/weather.php', {
		method : 'post',
		body   : fd
	});

	let json = await req.json();

	console.log(json);

	const temp = Math.round(json.main.temp);
	const condition = json.weather[0].main;
	const hum = json.main.humidity;
	const possible_conditions = [
		'Thunderstorm',
		'Drizzle',
		'Rain',
		'Snow',
		'Mist',
		'Smoke',
		'Haze',
		'Dust',
		'Fog',
		'Sand',
		'Ash',
		'Squall',
		'Tornado',
		'Clear',
		'Clouds'
	];
	if ((hours >= 0 && hours <= 4) || (hours >= 20 && hours <= 23)) {
		if (condition == possible_conditions[0]) {
			bgcolor = '#585858';
			img = 'WeatherImages/thunderstorm.svg';
		} else if (condition == possible_conditions[1]) {
			bgcolor = '#005383';
			img = 'WeatherImages/drizzle.svg';
		} else if (condition == possible_conditions[2]) {
			bgcolor = '#005C75';
			img = 'WeatherImages/rain.svg';
		} else if (condition == possible_conditions[3]) {
			bgcolor = '#CCCCCC';
			img = 'WeatherImages/snow.svg';
		} else if (condition == possible_conditions[4]) {
			bgcolor = '#8BA7A5';
			img = 'WeatherImages/haze.svg';
		} else if (condition == possible_conditions[5]) {
			bgcolor = '#313131';
			img = 'WeatherImages/smoke.svg';
		} else if (condition == possible_conditions[6]) {
			bgcolor = '#1574C8';
			img = 'WeatherImages/haze.svg';
		} else if (condition == possible_conditions[7]) {
			bgcolor = '#562C00';
			img = 'WeatherImages/dust.svg';
		} else if (condition == possible_conditions[8]) {
			bgcolor = '#AFAFAF';
			img = 'WeatherImages/fog.svg';
		} else if (condition == possible_conditions[9]) {
			bgcolor = '#AACCCA';
			img = 'WeatherImages/sand.svg';
		} else if (condition == possible_conditions[10] || condition == possible_conditions[11]) {
			bgcolor = '#5D5D5D';
			img = 'WeatherImages/ash.svg';
		} else if (condition == possible_conditions[12]) {
			bgcolor = '#5D5D5D';
			img = 'WeatherImages/tornado.svg';
		} else if (condition == possible_conditions[13]) {
			bgcolor = '#000158';
			img = 'WeatherImages/moon.svg';
		} else if (condition == possible_conditions[14]) {
			bgcolor = '#00B1D6';
			img = 'WeatherImages/cloudy.svg';
		} else {
			bgcolor = '#5D5D5D';
			img = 'WeatherImages/moon.svg';
		}
	} else {
		if (condition == possible_conditions[0]) {
			bgcolor = '#343434';
			img = 'WeatherImages/thunderstorm.svg';
		} else if (condition == possible_conditions[1]) {
			bgcolor = '#0074B4';
			img = 'WeatherImages/drizzle.svg';
		} else if (condition == possible_conditions[2]) {
			bgcolor = '#00729C';
			img = 'WeatherImages/rain.svg';
		} else if (condition == possible_conditions[3]) {
			bgcolor = '#CCCCCC';
			img = 'WeatherImages/snow.svg';
		} else if (condition == possible_conditions[4]) {
			bgcolor = '#AACCCA';
			img = 'WeatherImages/haze.svg';
		} else if (condition == possible_conditions[5]) {
			bgcolor = '#676767';
			img = 'WeatherImages/smoke.svg';
		} else if (condition == possible_conditions[6]) {
			bgcolor = '#5492C8';
			img = 'WeatherImages/haze.svg';
		} else if (condition == possible_conditions[7]) {
			bgcolor = '#793E00';
			img = 'WeatherImages/dust.svg';
		} else if (condition == possible_conditions[8]) {
			bgcolor = '#C4C4C4';
			img = 'WeatherImages/fog.svg';
		} else if (condition == possible_conditions[9]) {
			bgcolor = '#9ADDDB';
			img = 'WeatherImages/sand.svg';
		} else if (condition == possible_conditions[10] || condition == possible_conditions[11]) {
			bgcolor = '#757575';
			img = 'WeatherImages/ash.svg';
		} else if (condition == possible_conditions[12]) {
			bgcolor = '#66B3D0';
			img = 'WeatherImages/tornado.svg';
		} else if (condition == possible_conditions[13]) {
			bgcolor = '#0082CA';
			img = 'WeatherImages/sun.svg';
		} else if (condition == possible_conditions[14]) {
			bgcolor = '#0087DD';
			img = 'WeatherImages/cloudy.svg';
		} else {
			bgcolor = '#7A7A7A';
			img = 'WeatherImages/sun.svg';
		}
	}
	let loc = json.name;
	const html = `<h2 style='color:${bgcolor};'>${loc}</h2><div class='weatherBox' style='background-color:${bgcolor};'><div class='temp'>${temp}&deg;C</div><img src='${img}' height='40px' class='imgC'><div class='condition'>${condition}</div><div class='humidity'>Humidity: ${hum}%</div></div>`;
	document.getElementById('content1').innerHTML = html;
	document.getElementById('loader').style.display = 'none';
};
