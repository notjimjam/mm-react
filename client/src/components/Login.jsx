import config from '../../cfg/config.js';
import { MMButton } from '@/components/MMButton.jsx';
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
			<div className='card flex flex-col justify-center items-center'>
				<img
					src='/logos/mm-logo-name.png'
					alt='Music Meteorologist Logo'
				/>
				<div className='flex flex-col justify-center items-center gap-large'>
					<div className='text-center'>
						Playlists curated for your local weather
						<br/>
						powered by Spotify
					</div>
					<MMButton
						clickFunction={loginHandler}
						extraClass='button'
					>
						Log In With Spotify
					</MMButton>
					<MMButton
						clickFunction={signUpHandler}
						extraClass='button'
					>
						Sign Up For Spotify
					</MMButton>
				</div>
			</div>
		</div>
	)
}
