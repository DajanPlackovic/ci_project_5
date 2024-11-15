import TestHeader from './components/TestHeader';
import { Theme, Button } from 'react-daisyui';

function App() {
  return (
    <div className='App'>
      <Theme dataTheme='mytheme'>
        <TestHeader />
        <Button>Test</Button>
      </Theme>
    </div>
  );
}

export default App;
