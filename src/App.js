import './App.css';
import { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NftSrb from './pages';
import BuyNfts from './pages/buy-nfts';
import MyCollection from './pages/my-collection';
import MintNfts from './pages/mint-nfts';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('Web3 installed!');
    } else {
      alert('Web3 is not installed, please install to use the app');
    }
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={NftSrb} />
          <Route path="/buy-nfts" component={BuyNfts} />
          <Route path="/my-collection" component={MyCollection} />
          <Route path="/mint-nfts" component={MintNfts} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
