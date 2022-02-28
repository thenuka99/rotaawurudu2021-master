import Navbar from "./components/Navbar/Navbar"
import './App.css';
import{BrowserRouter as Router,Switch,Route} from "react-router-dom";
import SignUp from "./components/SignUp/Register";
import Activate from "./components/SignUp/Activate";
import Login from "./components/SignIn/Login";
import ForgetPassword from "./components/SignIn/ForgetPassword";
import ResetPassword from "./components/SignIn/ResetPassword";
import Welcome from "./components/Welcome";
import Home from "./components/Home/Home";
import KanaMuttiya from "./components/kana-muttiya/kanaMuttiya";
import KanaMuttiyaStart from "./components/kana-muttiya/KanaMuttiyaStart";
import KanaMuttiyaPractice from "./components/kana-muttiya/KanaMuttiyaPractice";
import LissanaGasa from "./components/LissanaGasa/LissanaGasa";
import LissanaGasaStart from "./components/LissanaGasa/LissanaGasaStart";
import LissanaGasaPractice from "./components/LissanaGasa/LissanaGasaPractice";
import GamaHarahaDiwima from "./components/GamaHarahaDiwima/GamaHarahaDiwima";
import GamaHarahaDiwimaPractice from "./components/GamaHarahaDiwima/GamaHarahaDiwimaPractice";
import GamaHarahaDiwimaStart from "./components/GamaHarahaDiwima/GamaHarahaDiwimaStart";
import AliyataAsaThabima from './components/AliyataAsaThabima/AliyataAsaThabima';
import AliyataAsaThabimaPractice from "./components/AliyataAsaThabima/AliyataAsaThabimaPractice";
import AliyataAsaThabimaStart from "./components/AliyataAsaThabima/AliyataAsaThabimaStart";
import balloonPipirima from "./components/BalloonPipirima/BalloonPipirima";
import balloonPipirimaPractice from "./components/BalloonPipirima/BalloonPipirimaPractice";
import balloonPipirimaStart from "./components/BalloonPipirima/BalloonPipirimaStart";
import kottaPora from "./components/KottaPora/KottaPora";
import kottaPoraPractice from "./components/KottaPora/KottaPoraPractice";
import kottaPoraStart from "./components/KottaPora/KottaPoraStart";

import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

function App() {
  return (
    <div className="App">
    <Router>
      <Route restricted={true} path='/SignUp' exact render={props => <SignUp {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <Route restricted={true} path='/SignIn' exact render = {props => <Login {...props} />} />
      <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
      <PrivateRoute path='/home' exact component={Home}/>

      <PrivateRoute path='/kana-muttiya' exact component={KanaMuttiya}/>
      <PrivateRoute path='/kana-muttiya/start' exact component={KanaMuttiyaStart}/>
      <PrivateRoute path='/kana-muttiya/practice' exact component={KanaMuttiyaPractice}/>

      <PrivateRoute path='/lissana-gasa' exact component={LissanaGasa}/>
      <PrivateRoute path='/lissana-gasa/start' exact component={LissanaGasaStart}/>
      <PrivateRoute path='/lissana-gasa/practice' exact component={LissanaGasaPractice}/>

      <PrivateRoute path='/gama-haraha-diwima' exact component={GamaHarahaDiwima}/>
      <PrivateRoute path='/gama-haraha-diwima/start' exact component={GamaHarahaDiwimaStart}/>
      <PrivateRoute path='/gama-haraha-diwima/practice' exact component={GamaHarahaDiwimaPractice}/>

      <PrivateRoute path='/aliyata-asa-thabima' exact component={AliyataAsaThabima}/>
      <PrivateRoute path='/aliyata-asa-thabima/start' exact component={AliyataAsaThabimaStart}/>
      <PrivateRoute path='/aliyata-asa-thabima/practice' exact component={AliyataAsaThabimaPractice}/>

      <PrivateRoute path='/balloon-pipirima' exact component={balloonPipirima}/>
      <PrivateRoute path='/balloon-pipirima/start' exact component={balloonPipirimaStart}/>
      <PrivateRoute path='/balloon-pipirima/practice' exact component={balloonPipirimaPractice}/>

      <PrivateRoute path='/kotta-pora' exact component={kottaPora}/>
      <PrivateRoute path='/kotta-pora/start' exact component={kottaPoraStart}/>
      <PrivateRoute path='/kotta-pora/practice' exact component={kottaPoraPractice}/>


      <PublicRoute restricted={true} path='/' exact component={Welcome}/>
    </Router>
    </div>
  );
}

export default App;  
 