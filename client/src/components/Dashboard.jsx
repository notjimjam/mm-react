import config from '../../cfg/config.js';
import SpotifyWebApi from 'spotify-web-api-node';
import { useAuth } from '@/composables/useAuth.jsx';
import { Player } from '@/components/Player.jsx';
import { Playlist } from '@/components/Playlist.jsx';

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId
});
export const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);
	const [playlist, setPlaylist] = useState([]);
	const [playlistId, setPlaylistId] = useState();
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [searchLocation, setSearchLocation] = useState(null);
	
	const setLocationForSearch = (location) => {
		setSearchLocation(location);
	}
	
	useEffect(() => {
		if (! accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);
	
	useEffect(() => {
		if (searchLocation === null) return;
		
		spotifyApi.searchPlaylists(searchLocation, { limit: 1, offset: 0 }).then((res) => {
			
			setPlaylist(
				res.body.playlists.items.map((playlist) => {
					return {
						name: playlist.name,
						desc: playlist.description,
						uri: playlist.uri,
						imageUrl: playlist.images[0].url
					};
				}),
			);
			
			setPlaylistId(
				res.body.playlists.items.map((playlist) => {
					return playlist.id;
				}),
			);
		});
		//useEffect only runs when searchLocation is updated
	}, [searchLocation]);
	
	useEffect(() => {
		if (! accessToken) return;
		if (! playlistId) return;
		
		spotifyApi.getPlaylistTracks(playlistId).then((res) => {
			setPlaylistTracks(
				res.body.items.map((item) => {
					const smallestAlbumImage = item.track.album.images.reduce((smallest, image) => {
						if (image.height < smallest.height) return image;
						return smallest;
					}, item.track.album.images[0]);
					
					return {
						artist: item.track.artists[0].name,
						title: item.track.name,
						uri: item.track.uri,
						albumUrl: smallestAlbumImage.url
					};
				}),
			);
		});
	}, [accessToken, playlistId]);
	
	const buttonToSetSearch = () => {
		setLocationForSearch('sunny');
	}
	
	return (
		<div className="flex flex-col justify-center items-center">
			<button onClick={buttonToSetSearch}>
				search
			</button>
			
			{playlist.length > 0 ? <Playlist
				accessToken={accessToken}
				playlist={playlist}
				playlistTracks={playlistTracks}
			/> : 'search for playlist'}
			
			
			<div className='temporary-class-delete'>
				<div>search location: {searchLocation}</div>
				<div>playlist id: {playlistId}</div>
				<div>playlist: {playlist[0].name}</div>
				<div>playlist tracks length: {playlistTracks.length}</div>
			</div>
		</div>
	);
}
