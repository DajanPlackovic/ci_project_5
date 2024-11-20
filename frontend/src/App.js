import { Routes, Route } from 'react-router-dom';
import MainNavBar from './components/MainNavBar';
import SignInForm from './components/SignInForm';
import Container from 'react-bootstrap/esm/Container';

function App() {
  return (
    <div className='App'>
      <MainNavBar />
      <Container className='pt-4'>
        <Routes>
          <Route path='/signin' element=<SignInForm /> />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
