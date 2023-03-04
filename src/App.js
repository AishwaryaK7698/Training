import { Route, Routes } from 'react-router-dom';
import './App.css';
import Article from './components/Articles';
import Order from './components/Order';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Workouts/>}></Route>
        <Route path='articles' element={<Article/>}></Route>
        <Route path='order' element={<Order/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
