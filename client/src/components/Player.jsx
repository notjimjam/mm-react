import SpotifyWebPlayback from 'react-spotify-web-playback';

export const Player = ({ accessToken, trackUri }) => {
	const [play, setPlay] = useState(false);
	
	/**
	 * when trackUri is updated, set play to true
	 * this will allow the track to automatically play
	 */
	useEffect(() => setPlay(true), [trackUri]);
	
	if (! accessToken) return null;
	
	return (
		/**
		 * SpotifyWebPlayback component
		 * token: accessToken
		 * callback: when the track is paused, set play to false
		 * play: play state
		 * uris: trackUri
		 * component is brought in from react-spotify-web-playback  
		 * https://www.npmjs.com/package/react-spotify-web-playback
		 */
		<SpotifyWebPlayback
			token={accessToken}
			callback={(state) => {
				if (! state.isPlaying) setPlay(false);
			}}
			play={play}
			uris={trackUri ? [trackUri] : []}
		/>
	)
}
