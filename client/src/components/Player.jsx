import SpotifyWebPlayback from 'react-spotify-web-playback';

export const Player = ({ accessToken, trackUri }) => {
	const [play, setPlay] = useState(false);
	
	//if a trackUri is passed, setPlay to true
	//this allows for autoplay of the playlist
	useEffect(() => setPlay(true), [trackUri]);
	
	if (! accessToken) return null;
	
	return (
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
