import MainNavBar from './components/MainNavBar';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { GlobalThemeContextProvider } from './contexts/GlobalThemeContext';
// import TestHeader from './components/TestHeader';
// import { Theme, Button } from 'react-daisyui';

function App() {
  return (
    <div className='App'>
      <CurrentUserProvider>
        <GlobalThemeContextProvider>
          <MainNavBar />
        </GlobalThemeContextProvider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
