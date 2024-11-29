import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNavBar from './components/MainNavBar';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Container from 'react-bootstrap/esm/Container';
import EditorPage from './components/EditorPage';
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';
import NotificationContainer from './components/NotificationContainer';
import Profile from './components/Profile';
import { ReblogProvider } from './contexts/ReblogContext';

function App() {
  return (
    <div className='App'>
      <MainNavBar />
      <Container className='pt-4 d-flex flex-column justify-content-center'>
        <ReblogProvider>
          <Routes>
            <Route path='/' element=<PostsList /> />
            <Route path='/signin' element=<SignInForm /> />
            <Route path='/signup' element=<SignUpForm /> />
            <Route path='/editor-page' element=<EditorPage /> />
            <Route path='/posts' element=<PostsList /> />
            <Route path='/posts/:id' element=<PostDetail /> />
            <Route path='/profiles/:id' element=<Profile /> />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </ReblogProvider>
      </Container>
      <NotificationContainer />
    </div>
  );
}

export default App;
