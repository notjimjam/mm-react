import axios from 'axios';
import config from '../../cfg/config.js';
import playlistNames from '../../cfg/playlist-names.js';
import { MMButton } from '@/components/MMButton.jsx';
import { useCheckCondition } from '@/composables/useCheckCondition.jsx';

const baseUrl = config.weatherBaseUrl;
const weatherKey = config.weatherApiKey;

export const Weather = ({ playlistName, setPlaylistName, setPlaylistTracks }) => {
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
		const playlistTracks = document.getElementsByClassName('playlist-tracks');
		setPlaylistName(randomArrayItem(shuffleArray));
		playlistTracks.scroll = { top: 0, behavior: 'smooth' };
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
		}
	},[weather]);
	
	useCheckCondition({ condition, wind, setPlaylistName, setShuffleArray, randomArrayItem, playlistNames });
	
	return (
		<div className='flex flex-row justify-center items-center gap-small'>
			{hasLocation ?
				<div className='flex flex-row justify-center items-center gap-small'>
					<MMButton
						clickFunction={enterNewLocation}
						extraClass='button small'
					>
						Change?
					</MMButton>
					<MMButton
						clickFunction={shufflePlaylists}
						extraClass='small'
					>
						New
					</MMButton>
				</div>:
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
		</div>
		
	)
}
