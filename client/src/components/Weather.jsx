import axios from 'axios';
import config from '../../cfg/config.js';
import playlistNames from '../../cfg/playlist-names.js';
import { MMButton } from '@/components/MMButton.jsx';

const baseUrl = config.weatherBaseUrl;
const weatherKey = config.weatherApiKey;

export const Weather = ({ playlistName, setPlaylistName }) => {
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
		setPlaylistName(randomArrayItem(shuffleArray));
	}
	
	useEffect(() => {
		if (! value) return
		const locationUrl = isNaN(parseInt(value)) ? 'q=' : 'zip='
		axios.get(`${baseUrl}?${locationUrl}${value}&appid=${weatherKey}`).then((res) => {
			setWeather(res.data);
		}).catch((err) => {
			console.log(err)
			alert('please enter valid location (ex. zipcode, city, or lat/long)')
		})
	}, [value]);
	
	useEffect(() => {
		if (weather !== null) {
			setCondition(weather?.weather[0]?.main);
			setWind(weather?.wind?.speed);
			console.log(weather)
		}
	},[weather]);
	
	useEffect(() => {
		if (!condition || !wind) return;
		if(wind >= 15) {
			setPlaylistName(randomArrayItem(playlistNames.windy));
			setShuffleArray(playlistNames.windy)
			document.body.className = 'mood-windy';
		} else if(condition.toLowerCase().includes('sunny')) {
			setPlaylistName(randomArrayItem(playlistNames.sunny));
			setShuffleArray(playlistNames.sunny)
			document.body.className = 'mood-sunny';
		} else if(condition.toLowerCase().includes('partly')) {
			setPlaylistName(randomArrayItem(playlistNames.partly));
			setShuffleArray(playlistNames.partly)
			document.body.className = 'mood-partly';
		} else if(condition.toLowerCase().includes('freezing')) {
			setPlaylistName(randomArrayItem(playlistNames.freezing));
			setShuffleArray(playlistNames.freezing)
			document.body.className = 'mood-freezing';
		} else if(condition.toLowerCase().includes('pellets')) {
			setPlaylistName(randomArrayItem(playlistNames.hail));
			setShuffleArray(playlistNames.hail)
			document.body.className = 'mood-hail';
		} else if(condition.toLowerCase().includes('snow') || condition.toLowerCase().includes('blizzard')) {
			setPlaylistName(randomArrayItem(playlistNames.snow));
			setShuffleArray(playlistNames.snow)
			document.body.className = 'mood-snow';
		} else if(condition.toLowerCase().includes('moderate rain') || condition.toLowerCase().includes('heavy rain') || condition.toLowerCase().includes('torrential')) {
			setPlaylistName(randomArrayItem(playlistNames.rain));
			setShuffleArray(playlistNames.rain)
			document.body.className = 'mood-rain';
		} else if(condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) {
			setPlaylistName(randomArrayItem(playlistNames.cloudy));
			setShuffleArray(playlistNames.cloudy)
			document.body.className = 'mood-cloudy';
		} else if(condition.toLowerCase().includes('mist') || condition.toLowerCase().includes('fog') || condition.toLowerCase().includes('haze')) {
			setPlaylistName(randomArrayItem(playlistNames.fog));
			setShuffleArray(playlistNames.fog)
			document.body.className = 'mood-fog';
		} else if(condition.toLowerCase().includes('thunder')) {
			setPlaylistName(randomArrayItem(playlistNames.thunder));
			setShuffleArray(playlistNames.thunder)
			document.body.className = 'mood-thunder';
		} else if(condition.toLowerCase().includes('clear')) {
			setPlaylistName(randomArrayItem(playlistNames.clear));
			setShuffleArray(playlistNames.clear)
			document.body.className = 'mood-clear';
		}
	}, [condition, wind])
	
	
	return (
		<div className='flex flex-row justify-center items-center gap-small'>
			{hasLocation ?
				<MMButton
					clickFunction={enterNewLocation}
					extraClass='button small'
				>
					Change?
				</MMButton> :
				
				<div className='flex flex-row justify-center items-center gap-small'>
					<input
						onChange={inputHandler}
						onKeyDown={(e) => {onKeyDown(e)}}
						type='text'
						placeholder='Enter Location'
						className='input'
					/>
					<MMButton
						clickFunction={submitLocation}
						extraClass='small'
					>
						Search
					</MMButton>
				</div>
			}
			<MMButton
				clickFunction={shufflePlaylists}
				extraClass='small'
			>
				Shuffle
			</MMButton>
		</div>
		
	)
}
