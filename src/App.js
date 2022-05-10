import './App.css';
import SigninButton from './components/SigninButton';
import { useEffect } from 'react';
import MintComponent from './components/MintCompenent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import GetAllNfts from './components/GetAllNfts';

function App() {
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('Web3 installed!');
    }
    else{
      alert("Web3 is not installed, please install to use the app");
    }
  }, []);

  return (
    <div>
      <SigninButton />
      <MintComponent />
      <GetAllNfts />
    </div>
  );
}

export default App;
