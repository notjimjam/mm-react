import config from '../../cfg/config.js';
import SpotifyWebApi from 'spotify-web-api-node';
import { useAuth } from '@/composables/useAuth.jsx';
import { Playlist } from '@/components/Playlist.jsx';
import { Weather } from '@/components/Weather.jsx';
import { MMButton } from '@/components/MMButton.jsx';
import { createPortal } from 'react-dom';

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId
});

export const Dashboard = ({ code, setIsLoggedIn }) => {
	const accessToken = useAuth(code);
	const [playlist, setPlaylist] = useState([]);
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [playlistName, setPlaylistName] = useState(null);
	
	const logout = () => {
		spotifyApi.resetCredentials();
		setIsLoggedIn(false);
		document.body.className = '';
	}
	
	useEffect(() => {
		if (! accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);
	
	useEffect(() => {
		if (playlistName === null) return;
		
		spotifyApi.searchPlaylists(playlistName, { limit: 1, offset: 0 }).then((res) => {
			setPlaylist(
				res.body.playlists.items.map((playlist) => {
					return {
						name: playlist.name,
						desc: playlist.description,
						uri: playlist.uri,
						imageUrl: playlist.images[0].url,
						id: playlist.id,
					};
				}),
			);
		});
		//useEffect only runs when playlistName is updated
	}, [playlistName]);
	
	useEffect(() => {
		if (! accessToken) return;
		if (! playlist.length > 0) return;
		
		spotifyApi.getPlaylistTracks(playlist[0].id).then((res) => {
			console.log(res)
			setPlaylistTracks(
				res.body.items.map((item, index) => {
					// console.log(item)
					if (item.track === null) {
						//remove from array
						
					}
					const smallestAlbumImage = item?.track?.album?.images.reduce((smallest, image) => {
						if (image.height < smallest.height) return image;
						return smallest;
					}, item.track.album.images[0]);
					
					
					return {
						artist: item?.track?.artists[0]?.name,
						title: item?.track?.name,
						uri: item?.track?.uri,
						albumUrl: smallestAlbumImage?.url,
						index: index
					};
				}),
			);
		});
	}, [playlist]);
	
	return (
		<div className="flex flex-col justify-center items-center gap-small relative">
			<Weather
				playlistName={playlistName}
				setPlaylistName={setPlaylistName}
				setPlaylistTracks={setPlaylistTracks}
			/>
			
			<Playlist
				accessToken={accessToken}
				playlist={playlist}
				playlistTracks={playlistTracks}
			/>
			
			{createPortal(
				<MMButton
					clickFunction={logout}
					extraClass='small absolute top-3 right-3'
				>
					Logout
				</MMButton>,
				document.body
			)}
		</div>
	);
}
