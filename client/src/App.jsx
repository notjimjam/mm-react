import '@/assets/styles.less';
import { Login } from '@/components/Login.jsx';
import { Dashboard } from '@/components/Dashboard.jsx';
import { Header } from '@/components/Header.jsx';
import { Footer } from '@/components/Footer.jsx';

const code = new URLSearchParams(window.location.search).get('code');

function App() {

  return (
    <div className='app'>
	    <Header />
	    <article id='article'>
		    {code ? <Dashboard code={code} /> : <Login />}
	    </article>
	    <Footer />
    </div>
  )
}

export default App
