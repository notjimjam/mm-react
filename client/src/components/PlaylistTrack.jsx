/**
 * import { PlaylistTrack } from '@/components/PlaylistTrack.jsx';
 *
 * a list of all available tracks in the playlist are displayed with artist,
 * title, and album image
 * on click, set the active track to the uri and will autoplay
 *
 * @param track
 * @param selectTrack
 *
 * @returns {JSX.Element}
 */
export const PlaylistTrack = ({ track, selectTrack }) => {
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
		</div>
	)
}
