import { Player } from '@/components/Player.jsx';
import { PlaylistTrack } from '@/components/PlaylistTrack.jsx';

export const Playlist = ({ accessToken, playlist, playlistTracks }) => {
	const [activeTrack, setActiveTrack] = useState();
	
	/**
	 * on click, set the active track to the uri
	 * active track will be passed to the Player component and will autoplay
	 * @param uri
	 */
	const selectTrack = (uri) => {
		setActiveTrack(uri);
	}
	
	return (
		<div className='playlist-card card relative'>
			{playlist.length > 0 ? <div
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
				{/*TODO: implement in the future*/}
				{/*<img*/}
				{/*	src='/icons/add.svg'*/}
				{/*	className='absolute top-3 left-3'*/}
				{/*	alt='save playlist'*/}
				{/*/>*/}
			</div> : <div className='playlist-header'></div>}
			
			{playlistTracks.length > 0 ? <div className='playlist-tracks'>
				{playlistTracks.map((track) => (
					<PlaylistTrack
						playlist={playlist}
						track={track}
						key={`${track.uri}+${track.index}`}
						selectTrack={selectTrack}
						activeTrack={activeTrack}
					/>
				))}
			</div> : <div className='playlist-tracks'></div>}
			
			<Player className='player' accessToken={accessToken} trackUri={activeTrack} />
		</div>
	)
}
