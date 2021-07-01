import './App.css';
import Header from './components/Header';
import VerifyCompany from "./components/VerifyCompany";
import RegisterCompany from './components/RegisterCompany';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route path = "/"  exact component = {VerifyCompany} />
            <Route path = "/register" exact component = {RegisterCompany} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
