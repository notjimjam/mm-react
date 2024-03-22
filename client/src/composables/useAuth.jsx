import axios from 'axios';

export const useAuth = (code) => {
	const [auth, setAuth] = useState({});
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();
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
			setAccessToken(data.accessToken);
			setRefreshToken(data.refreshToken);
			setExpiresIn(data.expiresIn);
			window.history.pushState({}, null, '/');
		}).catch((err) => {
			window.location = '/';
		});
	}, [code]);
	
	useEffect(() => {
		if (!refreshToken || !expiresIn) return;
		
		const interval = setInterval(() => {
			axios.post('http://localhost:3334/refresh', {
				refreshToken,
			}).then(({data}) => {
				setAccessToken(data.accessToken);
				setExpiresIn(data.expiresIn);
			}).catch((err) => {
				window.location = '/';
			});
		}, (expiresIn - 60) * 1000);
		return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);
	
	return auth && accessToken;
}
