import config from '../../cfg/config.js';
const authUrl = config.authUrl;
const signUpUrl = config.signUpUrl;
export const Login = () => {
	return (
		<div>
			<a href={authUrl}>
				Log In With Spotify
			</a>
		</div>
	)
}
