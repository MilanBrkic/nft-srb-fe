import './App.css';
import  SigninButton  from './components/SigninButton'
import {useEffect} from "react"
import FileUploadComponent from './components/FileUploadCompenent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import GetAllImages from './components/GetAllImages';

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
      <GetAllImages/>
    </div>
  );
}

export default App;
