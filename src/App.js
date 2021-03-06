import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ShowCreatorDetailsPage from './pages/ShowCreatorDetailsPage/ShowCreatorDetailsPage';
import WellcomePage from './pages/WellcomePage/WellcomePage';
import CreatorManagePage from './pages/CreatorManagePage/CreatorManagePage';
import BuyerSavedPaintsPage from './pages/BuyerSavedPaintsPage/BuyerSavedPaintsPage';
import CreationDetailsPage from './pages/CreationDetailsPage/CreationDetailsPage';
import CreatorNewPaintPage from './pages/CreatorNewPaintPage/CreatorNewPaintPage';
import CreatorDetailsPage from './pages/CreatorDetailsPage/CreatorDetailsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ActiveUserContext from './shared/ActiveUserContext';
import { useState } from 'react';
import UserModel from './models/UserModel';
function App() {
  const [activeUser, setActiveUser] = useState();
  const [isCreator, setIsCreator] = useState(undefined);

  function handleLogout() {
    setActiveUser(null);
    UserModel.logout();
  }

  return (
    <ActiveUserContext.Provider value={activeUser} >
      <HashRouter>
        <Switch>
          {isCreator !== undefined? <Route exact path="/signup" ><SignUpPage activeUser={activeUser} onLogin={user => setActiveUser(user)} isCreator={isCreator}/></Route> : null}
          <Route exact path="/" ><WellcomePage setIsCreator={setIsCreator}/></Route>
          <Route exact path="/login" component={LoginPage}><LoginPage onLogin={user => setActiveUser(user) } /></Route>
          <Route exact path="/home" ><HomePage onLogout={handleLogout}/></Route>
          <Route exact path="/creator/:index"><ShowCreatorDetailsPage onLogout={handleLogout}/></Route>
          <Route exact path="/manage"><CreatorManagePage /></Route>
          <Route exact path="/saved"><BuyerSavedPaintsPage onLogout={handleLogout}/></Route>
          <Route exact path="/creation/:index"><CreationDetailsPage onLogout={handleLogout}/></Route>
          <Route exact path="/newpaint"><CreatorNewPaintPage /></Route>
          <Route exact path="/update-details"><CreatorDetailsPage /></Route>
        </Switch>
      </HashRouter>
    </ActiveUserContext.Provider>
  );
}

export default App;
