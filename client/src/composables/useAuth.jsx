import axios from 'axios';

/**
 * take in the code from the url and send it to the server to get
 * the auth by making a post request to the server
 *
 * if the request is successful, set the auth state with the
 * returned data
 *
 * if the request is unsuccessful, redirect to the home page
 *
 * if the auth has a refreshToken and expiresIn, set an interval to
 * refresh the token after it expires (usually 1 hour)
 *
 * @param {string} code
 *
 * @returns {object} auth
 */
export const useAuth = (code) => {
	const [auth, setAuth] = useState({});
	const active = useRef({});
	
	useEffect(() => {
		if (active.current.code !== code) {
			active.current = {
				code,
				request: axios.post('http://localhost:3334/login', {code}),
			};
		}
		active.current.request.then(({data}) => {
			setAuth(data);
			window.history.pushState({}, null, '/');
		}).catch((err) => {
			window.location = '/';
		});
	}, [code]);
	
	useEffect(() => {
		if (!auth.refreshToken || !auth.expiresIn) return;
		
		const interval = setInterval(() => {
			axios.post('http://localhost:3334/refresh', {
				refreshToken: auth.refreshToken,
			}).then(({data}) => {
				setAuth(data);
			}).catch((err) => {
				window.location = '/';
			});
		}, (auth.expiresIn - 60) * 1000);
		return () => clearInterval(interval);
	}, [auth]);
	
	return auth;
}
