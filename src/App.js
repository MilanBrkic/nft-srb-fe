import './App.css';
import  SigninButton  from './components/SigninButton'
import {useEffect} from "react"
import FileUploadComponent from './components/FileUploadCompenent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    if(typeof window.ethereum !== "undefined"){
      console.log("Web3 installed!");
    }
   }, []);

  return (
    <div>
      <SigninButton/>
      <FileUploadComponent/>
    </div>
  );
}

export default App;
