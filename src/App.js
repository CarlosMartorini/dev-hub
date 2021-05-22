import './App.css';
import Menu from './components/Menu';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu/>
      </header>
      <Routes/>
    </div>
  );
}

export default App;
