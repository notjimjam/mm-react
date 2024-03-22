import '@/assets/styles.less';
import { Login } from '@/components/Login.jsx';
import { Dashboard } from '@/components/Dashboard.jsx';

const code = new URLSearchParams(window.location.search).get('code');

function App() {

  return (
    <div className='App'>
	    {code ? <Dashboard code={code} /> : <Login />}
    </div>
  )
}

export default App
