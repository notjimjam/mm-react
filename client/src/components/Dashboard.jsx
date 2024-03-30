import config from '../../cfg/config.js';
import SpotifyWebApi from 'spotify-web-api-node';
import { useAuth } from '@/composables/useAuth.jsx';
import { Playlist } from '@/components/Playlist.jsx';
import { Weather } from '@/components/Weather.jsx';

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId
});

export const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);
	const [playlist, setPlaylist] = useState([]);
	const [playlistId, setPlaylistId] = useState();
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [playlistName, setPlaylistName] = useState(null);
	
	useEffect(() => {
		if (! accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);
	
	useEffect(() => {
		if (playlistName === null) return;
		console.log(playlistName)
		spotifyApi.searchPlaylists(playlistName, { limit: 1, offset: 0 }).then((res) => {
			
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
		//useEffect only runs when playlistName is updated
	}, [playlistName]);
	
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
	
	return (
		<div className="flex flex-col justify-center items-center gap-small">
			<Weather
				playlistName={playlistName}
				setPlaylistName={setPlaylistName}
			/>
			
			<Playlist
				accessToken={accessToken}
				playlist={playlist}
				playlistTracks={playlistTracks}
			/>
		</div>
	);
}
