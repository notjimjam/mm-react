import '@/assets/styles.less';
import { Login } from '@/components/Login.jsx';
import { Dashboard } from '@/components/Dashboard.jsx';
import { Header } from '@/components/Header.jsx';
import { Footer } from '@/components/Footer.jsx';

/**
 * retrieve code after sign in from the url to provide to Dashboard component
 * url will contain 'code=...'
 */
const code = new URLSearchParams(window.location.search).get('code');

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	/**
	 * if code is present, provide to Dashboard component - else send to Login
	 * component in order to sign in and retrieve a code
	 */
	useEffect(() => {
		if (code) {
			setIsLoggedIn(true);
		}
	}, [code]);
  return (
    <div className='app'>
	    <Header />
	    <article id='article'>
		    {isLoggedIn ? <Dashboard code={code} setIsLoggedIn={setIsLoggedIn}/> : <Login />}
	    </article>
	    <Footer />
    </div>
  )
}

export default App
