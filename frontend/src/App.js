import Home from './Component/Home';
import Header from './Component/Mains/Header';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendorRegister from './Component/User/VendorRegister';
import VendorLogin from './Component/User/VendorLogin';

function App() {
  return (
    <>
      <Router>
      <ToastContainer/>
        <Header/>
        <Switch>
         <Route exact path='/'> <Home/></Route> 
         <Route exact path='/login'> <Login/></Route> 
         <Route exact path='/register'> <Register/></Route> 
          <Route exact path='/vendorRegister'> <VendorRegister /></Route> 
          <Route exact path='/vendorlogin'> <VendorLogin/></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
