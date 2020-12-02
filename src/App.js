import './App.css';
import CovidContent from './Components/CovidContent';
import image from '../src/images/covid.png';

function App() {

  return (
    <div className="App">
      <img className="image" src={image} alt="COVID-19" />
      <CovidContent/>
    </div>
  );
}

export default App;
