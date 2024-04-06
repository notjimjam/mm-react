export const PlaylistTrack = ({ playlist, track, selectTrack, activeTrack }) => {
	return (
		<div
			onClick={() => selectTrack(track.uri)}
			className={'track'}
		>
			<div className='track-info'>
				{track.albumUrl ?
					<img
						src={track.albumUrl}
						className='track-image'
						alt=''
					/> :
					<div className='track-placeholder-image'></div>
				}
				<div className='track-description'>
					{/*TODO: add line clamping or hide overflow*/}
					{track.title ?
						<div className='track-title'>{track.title}</div> :
						<div className='track-title'>Unknown Title</div>
					}
					{track.artist ?
						<div className='track-artist'>{track.artist}</div> :
						<div className='track-artist'>Unknown Artist</div>
					}
				</div>
			</div>
			<img
				src={'/icons/add.png'}
				className='icon-gray track-icon'
				alt='add to liked songs'
			/>
		</div>
	)
}
