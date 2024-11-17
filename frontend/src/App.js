import MainNavBar from './components/MainNavBar';
import { Route, Routes } from 'react-router-dom';
// import TestHeader from './components/TestHeader';
// import { Theme, Button } from 'react-daisyui';

function App() {
  return (
    <div className='App'>
      <MainNavBar />
      <Routes>
        <Route exact path='/' element={<h1>Test</h1>} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
