import { Player } from '@/components/Player.jsx';
import { PlaylistTrack } from '@/components/PlaylistTrack.jsx';

export const Playlist = ({ accessToken, playlist, playlistTracks }) => {
	
	
	const [activeTrack, setActiveTrack] = useState();
	
	const selectTrack = (uri) => {
		setActiveTrack(uri);
	}
	
	return (
		<div className='playlist-card'>
			<div
				className='playlist-header'
				onLoad={() => selectTrack(playlist[0].uri)}
				onClick={() => selectTrack(playlist[0].uri)}
			>
				<img
					src={playlist[0].imageUrl}
					className='playlist-image'
				/>
				<div className='playlist-name'>
					{playlist[0].name}
				</div>
			</div>
			<div className='playlist-tracks'>
				{playlistTracks.map((track) => (
					<PlaylistTrack
						track={track}
						key={track.uri}
						selectTrack={selectTrack}
					/>
				))}
			</div>
			<Player accessToken={accessToken} trackUri={activeTrack} />
		</div>
	)
}
