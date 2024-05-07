import playlistNames from '../../cfg/playlist-names.js';

/**
 * Check the weather condition and wind speed to set the
 * playlist name
 * with a random playlist and the shuffle array
 * this composable is also responsible for setting the body class
 * based on the weather
 *
 *
 * @param {string} condition
 * @param {string} wind
 * @param {function} setPlaylistName
 * @param {function} setShuffleArray
 * @param {function} randomArrayItem
 */
export const useCheckCondition = ({ condition, wind, setPlaylistName, setShuffleArray, randomArrayItem }) => {
	useEffect(() => {
		if (! condition || ! wind) return;
		if (wind?.gust >= 15) {
			setPlaylistName(randomArrayItem(playlistNames.windy));
			setShuffleArray(playlistNames.windy)
			document.body.className = 'mood-windy';
		} else if (condition.toLowerCase().includes('sunny')) {
			setPlaylistName(randomArrayItem(playlistNames.sunny));
			setShuffleArray(playlistNames.sunny)
			document.body.className = 'mood-sunny';
		} else if (condition.toLowerCase().includes('partly')) {
			setPlaylistName(randomArrayItem(playlistNames.partly));
			setShuffleArray(playlistNames.partly)
			document.body.className = 'mood-partly';
		} else if (condition.toLowerCase().includes('freezing')) {
			setPlaylistName(randomArrayItem(playlistNames.freezing));
			setShuffleArray(playlistNames.freezing)
			document.body.className = 'mood-freezing';
		} else if (condition.toLowerCase().includes('pellets')) {
			setPlaylistName(randomArrayItem(playlistNames.hail));
			setShuffleArray(playlistNames.hail)
			document.body.className = 'mood-hail';
		} else if (condition.toLowerCase().includes('snow') || condition.toLowerCase().includes('blizzard')) {
			setPlaylistName(randomArrayItem(playlistNames.snow));
			setShuffleArray(playlistNames.snow)
			document.body.className = 'mood-snow';
		} else if (condition.toLowerCase().includes('moderate rain') || condition.toLowerCase().includes('heavy rain') || condition.toLowerCase().includes('torrential')) {
			setPlaylistName(randomArrayItem(playlistNames.rain));
			setShuffleArray(playlistNames.rain)
			document.body.className = 'mood-rain';
		} else if (condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) {
			setPlaylistName(randomArrayItem(playlistNames.cloudy));
			setShuffleArray(playlistNames.cloudy)
			document.body.className = 'mood-cloudy';
		} else if (condition.toLowerCase().includes('mist') || condition.toLowerCase().includes('fog') || condition.toLowerCase().includes('haze')) {
			setPlaylistName(randomArrayItem(playlistNames.fog));
			setShuffleArray(playlistNames.fog)
			document.body.className = 'mood-fog';
		} else if (condition.toLowerCase().includes('thunder')) {
			setPlaylistName(randomArrayItem(playlistNames.thunder));
			setShuffleArray(playlistNames.thunder)
			document.body.className = 'mood-thunder';
		} else if (condition.toLowerCase().includes('clear')) {
			setPlaylistName(randomArrayItem(playlistNames.clear));
			setShuffleArray(playlistNames.clear)
			document.body.className = 'mood-clear';
		}
	}, [condition, wind]);
}
