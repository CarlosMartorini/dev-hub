import { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import Routes from './routes';

function App() {

  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Menu isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      </header>
      <Routes/>
    </div>
  );
}

export default App;
