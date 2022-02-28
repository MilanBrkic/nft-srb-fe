import './App.css';
import  SigninButton  from './components/SigninButton'
import {useEffect} from "react"

function App() {
  useEffect(() => {
    if(typeof window.ethereum !== "undefined"){
      console.log("Web3 installed!");
    }
   }, []);

  return (
    <SigninButton/>
  );
}

export default App;
