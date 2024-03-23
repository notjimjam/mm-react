import config from '../../cfg/config.js';
import SpotifyWebApi from 'spotify-web-api-node';
import { useAuth } from '@/composables/useAuth.jsx';

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId
});
export const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);
	
	useEffect(() => {
		if (! accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);
	
	return (
		<div>
			<h1>Dashboard</h1>
			{ accessToken }
		</div>
	)
}
