import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NftSrb from './pages';
import BuyNfts from './pages/buy-nfts';
import MyCollection from './pages/my-collection';
import MintNfts from './pages/mint-nfts';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withAlert } from 'react-alert';
class App extends React.Component {
  componentDidMount() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('Web3 installed!');
    } else {
      this.props.alert.error('Web3 is not installed, please install to use the app');
    }
  }

  render() {
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
}

export default withAlert()(App);
