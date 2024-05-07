import axios from 'axios';
import config from '../../cfg/config.js';
import { MMButton } from '@/components/MMButton.jsx';
import { useCheckCondition } from '@/composables/useCheckCondition.jsx';

const baseUrl = config.weatherBaseUrl;
const weatherKey = config.weatherApiKey;

export const Weather = ({ setPlaylistName }) => {
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
	
	/**
	 * allow user to submit input on 'enter'
	 * @param event
	 */
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
	
	/**
	 * fetch weather data from OpenWeather API based on user input
	 */
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
	
	/**
	 * set condition and wind state based on weather data
	 */
	useEffect(() => {
		if (weather !== null) {
			setCondition(weather?.weather[0]?.main);
			setWind(weather?.wind);
		}
	},[weather]);
	
	/**
	 * check condition and wind state to determine playlist
	 * see useCheckCondition.jsx for more details
	 */
	useCheckCondition({ condition, wind, setPlaylistName, setShuffleArray, randomArrayItem });
	
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
			<MMButton
				clickFunction={shufflePlaylists}
				extraClass='small'
			>
				Shuffle
			</MMButton>
		</div>
		
	)
}
