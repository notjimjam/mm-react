import config from '../../cfg/config.js';
import SpotifyWebApi from 'spotify-web-api-node';
import { useAuth } from '@/composables/useAuth.jsx';

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId
});
export const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);
	const [activeTrack, setActiveTrack] = useState();
	const [playlistResults, setPlaylistResults] = useState([]);
	const [playlistId, setPlaylistId] = useState();
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [searchLocation, setSearchLocation] = useState(null);
	
	const selectTrack = (uri) => {
		setActiveTrack(uri);
	}
	
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
			setPlaylistResults(
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
	
	
	return (
		<div>
			<h1>Dashboard</h1>
			{ accessToken }
		</div>
	)
}
