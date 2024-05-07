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
	const auth = useAuth(code);
	const accessToken = auth.accessToken;
	const [playlist, setPlaylist] = useState([]);
	const [prefilteredPlaylistTracks, setPrefilteredPlaylistTracks] = useState([]);
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [playlistName, setPlaylistName] = useState(null);
	
	/**
	 * add to a button to allow a user to log out of MM
	 * user will be returned to login component and background image will be
	 * removed
	 */
	const logout = () => {
		spotifyApi.resetCredentials();
		setIsLoggedIn(false);
		document.body.className = '';
	};
	
	/**
	 *
	 * @param uri
	 */
	const addSongToLikedPlaylist = (uri) => {
		spotifyApi.addToMySavedTracks([uri]).then((res) => {
			console.log(`added track with uri: ${uri} to liked songs`);
		}, (err) => {
			console.log(`error adding track with uri: ${uri} to liked songs`, err);
		});
	}
	
	/**
	 *
	 * @param uri
	 */
	const removeSongFromLikedPlaylist = (uri) => {
		spotifyApi.removeFromMySavedTracks([uri]).then((res) => {
			console.log(`removed track with uri: ${uri} from liked songs`);
		}, (err) => {
			console.log(`error removing track with uri: ${uri} from liked songs`, err);
		});
	}
	
	/**
	 * when accessToken is updated, set the accessToken for the spotifyApi
	 * It provides the ability to make requests to the Spotify API
	 */
	useEffect(() => {
		if (! accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);
	
	/**
	 * when playlistName is updated, search for a playlist with the provided name
	 * and set the playlist state with the returned playlist
	 *
	 * will map the returned playlist to an object with the name, description, uri,
	 * imageUrl, and id
	 */
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
	}, [playlistName]);
	
	/**
	 * when playlist variable is updated, get the tracks for the first playlist
	 * in the array
	 * will map the returned playlist tracks to an object with the artist, title,
	 * uri, albumUrl, and index
	 * possibility for multiple album images to be returned, so function will
	 * select the smallest image available to use as the albumUrl
	 */
	useEffect(() => {
		if (! accessToken) return;
		if (! playlist.length > 0) return;
		
		
		spotifyApi.getPlaylistTracks(playlist[0].id).then((res) => {
			//reset playlistTracks to empty array to avoid any issues with previous playlistTracks
			setPlaylistTracks([]);
			setPrefilteredPlaylistTracks(
				res.body.items.map((item, index) => {
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
	
	/**
	 * when prefilteredPlaylistTracks is updated, they get filtered to remove
	 * any tracks that do not have an uri (usually unavailable tracks)
	 */
	useEffect(() => {
		setPlaylistTracks(prefilteredPlaylistTracks.filter((track) => track.uri !== undefined));
	}, [prefilteredPlaylistTracks]);
	
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
