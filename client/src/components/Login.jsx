import config from '../../cfg/config.js';
const authUrl = config.authUrl;
const signUpUrl = config.signUpUrl;
export const Login = () => {
	
	const loginHandler = (e) => {
		e.preventDefault();
		window.location.href = config.authUrl;
	}
	const signUpHandler = (e) => {
		e.preventDefault();
		window.location.href = config.signUpUrl;
	}
	
	return (
		<div className='flex justify-center items-center'>
			<div className='card flex flex-col justify-center items-center gap-large'>
				<div className='text-center'>
					Playlists curated for your local weather
					<br/>
					powered by Spotify
				</div>
				<button
					onClick={loginHandler}
					className='button'
				>
					Log In With Spotify
				</button>
				<button
					onClick={signUpHandler}
					className='button'
				>
					Sign Up For Spotify
				</button>
			</div>
		</div>
	)
}
