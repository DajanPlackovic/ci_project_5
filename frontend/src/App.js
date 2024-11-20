import { Routes, Route } from 'react-router-dom';
import MainNavBar from './components/MainNavBar';

function App() {
  return (
    <div className='App'>
      <MainNavBar />
      <Routes>
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
