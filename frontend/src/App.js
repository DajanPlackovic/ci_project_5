import MainNavBar from './components/MainNavBar'
import { GlobalThemeContextProvider } from './contexts/GlobalThemeContext';
// import TestHeader from './components/TestHeader';
// import { Theme, Button } from 'react-daisyui';

function App() {
  return (
    <div className='App'>
      <GlobalThemeContextProvider>
        <MainNavBar />
      </GlobalThemeContextProvider>
    </div>
  );
}

export default App;
