export const PlaylistTrack = ({ track, selectTrack }) => {
	return (
		<div
			onClick={() => selectTrack(track.uri)}
			className='track'
		>
			<img
				src={track.albumUrl}
				className='track-image'
				alt=''
			/>
			<div className='track-info'>
				{/*TODO: add line clamping or hide overflow*/}
				<div className='track-title'>{track.title}</div>
				<div className='track-artist'>{track.artist}</div>
			</div>
		</div>
	)
}
