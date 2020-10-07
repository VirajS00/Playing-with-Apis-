const but = document.getElementById('but');
const changeContent = async () => {
	const regex = /(\b\W?[?,!.]?\s?\b)/;
	const textArea = document.getElementById('textArea').value;
	const output = document.getElementById('output');
	let words = textArea.split(regex);
	output.innerHTML = '';
	const reg = /\S*[?.,! ]/;
	const dayName = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
	const DayNameShort = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const monthShort = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	const weather = [ 'WEATHER', 'TEMP', 'TEMPERATURE', 'HUMIDITY', 'HOT', 'COLD', 'HUMID', 'DAY' ];
	const timeArr = [
		'CLOCK',
		'TIME',
		'HOURS',
		'MINUTES',
		'SECONDS',
		'HOUR',
		'MIN',
		'SEC',
		'HR',
		'MN',
		'OCLOCK',
		"O'CLOCK",
		'WATCH'
	];
	const music = [ 'MUSIC', 'SONG', 'ARTIST', 'PLAYLIST' ];
	const newsTerms = [ 'NEWS', 'NEWSPAPER', 'HEADLINE', 'TELECAST', 'HEADLINES', 'BROADCAST', 'LIVE' ];
	const countryResp = await fetch('countries.json');
	const countries = await countryResp.json();
	let jsondata = await GetFruits();
	let keyvalue;

	for (let i = 0; i < words.length; i++) {
		const sp = document.createElement('span');
		sp.textContent = words[i];
		sp.setAttribute('class', 'spanA');
		const w = sp.textContent;

		if (!reg.test(sp.textContent)) {
			sp.addEventListener('mouseover', () => {
				sp.classList.add('wordHover');
				keyvalue = sp.textContent;
				let food = jsondata.food;
				if (food.hasOwnProperty(w.toLowerCase())) {
					sp.style.width = sp.offsetWidth + 'px';
					sp.style.textAlign = 'center';
					sp.textContent = jsondata.food[w.toLowerCase()];
				} else if (jsondata.color.hasOwnProperty(w.toLowerCase())) {
					let rgb = jsondata.color[w.toLowerCase()];
					sp.setAttribute('style', `color: rgb(${rgb})`);
				}
			});
			sp.addEventListener('click', () => {
				const content1 = document.getElementById('content1');
				content1.innerHTML = "<img src='loader.svg' id='loader'>";
				content1.style.backgroundColor = '#ffffff';
				const today = new Date();
				if (weather.includes(w.toUpperCase())) {
					getWeather();
				} else if (w.toUpperCase() == 'DAY') {
					let day = today.getDay();
					spa = document.createElement('span');
					spa.setAttribute('style', 'font-size:2em; color: tomato;');
					spa.textContent = dayName[day];
					content1.appendChild(spa);
				} else if (w.toUpperCase() == 'DATE' || w.toUpperCase() == 'TODAY') {
					let monthNo = today.getMonth();
					let date = today.getDate();
					let dayNo = today.getDay();
					let month = monthShort[monthNo];
					let day = DayNameShort[dayNo].toUpperCase();
					let dd = `<div class="dateC"><div class="day">${day}</div><h1 class="date">${date}</h1><p class="month">${month}</p></div>`;
					content1.innerHTML = dd;
				} else if (w.toUpperCase() == 'MONTH') {
					let month = today.getMonth();
					let monthName = months[month];
					spa1 = document.createElement('span');
					spa1.setAttribute('style', 'font-size:2em; color: tomato;');
					spa1.textContent = monthName;
					content1.appendChild(spa1);
				} else if (jsondata.food.hasOwnProperty(w.toLowerCase())) {
					let emoji = jsondata.food[w.toLowerCase()];
					let p = document.createElement('p');
					p.setAttribute('style', 'font-size: 5em;');
					p.textContent = emoji;
					let h1 = document.createElement('h2');
					h1.textContent = w;
					content1.appendChild(p);
					content1.appendChild(h1);
				} else if (jsondata.color.hasOwnProperty(w.toLowerCase())) {
					let rgb = jsondata.color[w.toLowerCase()];
					const d = document.createElement('div');
					let textC = textColor(rgb);
					d.setAttribute(
						'style',
						`display: grid; place-items: center; height: 200px; width: 200px; background-color: rgb(${rgb}); font-size: 2em; color: ${textC};`
					);
					d.textContent = sp.textContent;
					content1.appendChild(d);
				} else if (w.toUpperCase() == 'YEAR') {
					let year = today.getFullYear();
					const s = document.createElement('span');
					s.setAttribute('style', 'font-size:2em; color: tomato;');
					s.textContent = year;
					content1.appendChild(s);
				} else if (timeArr.includes(w.toUpperCase())) {
					paintClock(content1);
				} else if (jsondata.shapes.hasOwnProperty(w.toLowerCase())) {
					drawShape(content1, w);
				} else if (w.toUpperCase() == 'SHAPES' || w.toUpperCase() == 'SHAPE') {
					randomProperty(jsondata.shapes, content1);
				} else if (
					w.toUpperCase() == 'COVID' ||
					w.toUpperCase() == 'COVID19' ||
					w.toUpperCase() == 'CORONAVIRUS' ||
					w.toUpperCase() == 'CARONA' ||
					countries.some((item) => item.name.toUpperCase() == w.toUpperCase())
				) {
					getCovidInfo(content1, w);
				} else if (music.includes(w.toUpperCase())) {
					generateSong(content1);
				} else if (newsTerms.includes(w.toUpperCase())) {
					generateNews(content1);
				} else {
					let queryData = new FormData();
					queryData.append('query', w);
					document.getElementById('loader').style.display = 'flex';
					fetch('php/giphy.php', {
						method : 'post',
						body   : queryData
					})
						.then((response) => response.json())
						.then((json) => {
							let image = json.data[0].images.fixed_width_still.url;
							const img = document.createElement('img');
							img.src = image;
							img.setAttribute('width', '300px');
							document.getElementById('loader').style.display = 'none';
							const name = document.createElement('h1');
							name.textContent = sp.textContent;
							content1.appendChild(img);
							content1.appendChild(name);
						})
						.catch((err) => {
							console.error(err);
							document.getElementById('loader').style.display = 'none';
							content1.textContent = 'Image not available.';
						});
				}
			});
			sp.addEventListener('mouseout', () => {
				sp.classList.remove('wordHover');
				let food = jsondata.food;
				if (food.hasOwnProperty(w.toLowerCase())) {
					sp.textContent = keyvalue;
				} else if (jsondata.color.hasOwnProperty(w.toLowerCase())) {
					sp.setAttribute('style', `color: #000`);
				}
			});
		}
		output.appendChild(sp);
	}
};

but.addEventListener('click', changeContent);

changeContent();
