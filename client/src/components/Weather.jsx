import axios from 'axios';
import config from '../../cfg/config.js';
import playlistNames from '../../cfg/playlist-names.js';

const baseUrl = config.weatherBaseUrl;
const weatherKey = config.weatherApiKey;

export const Weather = ({ setLocationForSearch, searchLocation, setSearchLocation }) => {
	const [input, setInput] = useState('');
	const [value, setValue] = useState('');
	const [hasLocation, setHasLocation] = useState(false);
	const [weather, setWeather] = useState(null);
	const [condition, setCondition] = useState(null);
	const [wind, setWind] = useState(null);
	const [shuffleArray, setShuffleArray] = useState([]);
	
	const  randomArrayItem = (array) => {
		return array[Math.floor(Math.random() * array.length)];
	};
	
	const inputHandler = (event) => {
		setInput(event.target.value);
	};
	
	const submitLocation = (event) => {
		event.preventDefault();
		setValue(input);
		setHasLocation(true);
	}
	
	const onKeyDown = (event) => {
		if (event.key === 'Enter') {
			submitLocation(event);
		}
	}
	
	const enterNewLocation = (event) => {
		event.preventDefault();
		setHasLocation(false);
	}
	
	const shufflePlaylists = () => {
		setLocationForSearch(randomArrayItem(shuffleArray));
	}
	
	useEffect(() => {
		if (! value) return
		
		axios.get(`${baseUrl}?q=${value}&appid=${weatherKey}`)
		.then((res) => {
			setWeather(res.data)
		}).catch((err) => {
			console.log(err)
			alert('please enter valid location (ex. zipcode, city, or lat/long)')
		})
	}, [value]);
	
	useEffect(() => {
		if (weather !== null) {
			setCondition(weather?.weather[0]?.main);
			setWind(weather?.wind?.speed);
		}
	},[weather]);
	
	useEffect(() => {
		if (!condition || !wind) return;
		
		if(wind >= 30) {
			setLocationForSearch(randomArrayItem(playlistNames.windy));
			setShuffleArray(playlistNames.windy)
			document.body.className = 'mood-windy';
		} else if(condition.toLowerCase().includes('sunny')) {
			setLocationForSearch(randomArrayItem(playlistNames.sunny));
			setShuffleArray(playlistNames.sunny)
			document.body.className = 'mood-sunny';
		} else if(condition.toLowerCase().includes('partly')) {
			setLocationForSearch(randomArrayItem(playlistNames.partly));
			setShuffleArray(playlistNames.partly)
			document.body.className = 'mood-partly';
		} else if(condition.toLowerCase().includes('freezing')) {
			setLocationForSearch(randomArrayItem(playlistNames.freezing));
			setShuffleArray(playlistNames.freezing)
			document.body.className = 'mood-freezing';
		} else if(condition.toLowerCase().includes('pellets')) {
			setLocationForSearch(randomArrayItem(playlistNames.hail));
			setShuffleArray(playlistNames.hail)
			document.body.className = 'mood-hail';
		} else if(condition.toLowerCase().includes('snow') || condition.toLowerCase().includes('blizzard')) {
			setLocationForSearch(randomArrayItem(playlistNames.snow));
			setShuffleArray(playlistNames.snow)
			document.body.className = 'mood-snow';
		} else if(condition.toLowerCase().includes('moderate rain') || condition.toLowerCase().includes('heavy rain') || condition.toLowerCase().includes('torrential')) {
			setLocationForSearch(randomArrayItem(playlistNames.rain));
			setShuffleArray(playlistNames.rain)
			document.body.className = 'mood-rain';
		} else if(condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) {
			setLocationForSearch(randomArrayItem(playlistNames.cloudy));
			setShuffleArray(playlistNames.cloudy)
			document.body.className = 'mood-cloudy';
		} else if(condition.toLowerCase().includes('mist') || condition.toLowerCase().includes('fog') || condition.toLowerCase().includes('haze')) {
			setLocationForSearch(randomArrayItem(playlistNames.fog));
			setShuffleArray(playlistNames.fog)
			document.body.className = 'mood-fog';
		} else if(condition.toLowerCase().includes('thunder')) {
			setLocationForSearch(randomArrayItem(playlistNames.thunder));
			setShuffleArray(playlistNames.thunder)
			document.body.className = 'mood-thunder';
		} else if(condition.toLowerCase().includes('clear')) {
			setLocationForSearch(randomArrayItem(playlistNames.clear));
			setShuffleArray(playlistNames.clear)
			document.body.className = 'mood-clear';
		}
	}, [condition, wind])
	
	
	return (
		<div className='flex flex-row justify-center items-center gap-small'>
			{hasLocation ?
				<button
					onClick={enterNewLocation}
					className='button small'
				>
					Change?
				</button> :
				
				<div className='flex flex-row justify-center items-center gap-small'>
					<input
						onChange={inputHandler}
						onKeyDown={(e) => {onKeyDown(e)}}
						type='text'
						placeholder='Enter Location'
					/>
					<button
						onClick={submitLocation}
						className='button small'
					>
						Search
					</button>
				</div>
			}
			<button
				onClick={shufflePlaylists}
				disabled={!shuffleArray}
				className='button small'
			>
				Shuffle
			</button>
		</div>
		
	)
}
