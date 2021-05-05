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
import ActiveUserContext from './shared/ActiveUserContext';
import { useState } from 'react';
function App() {
  const [activeUser, setActiveUser] = useState();
  return (
    <ActiveUserContext.Provider value={activeUser} >
      <HashRouter>
        <Switch>
          <Route exact path="/" ><WellcomePage /></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/signup" ><SignUpPage /></Route>
          <Route exact path="/home" ><HomePage /></Route>
          <Route exact path="/creator"><ShowCreatorDetailsPage /></Route>
          <Route exact path="/manage"><CreatorManagePage /></Route>
          <Route exact path="/saved"><BuyerSavedPaintsPage /></Route>
          <Route exact path="/creation"><CreationDetailsPage /></Route>
          <Route exact path="/newpaint"><CreatorNewPaintPage /></Route>
          <Route exact path="/update-details"><CreatorDetailsPage /></Route>
        </Switch>
      </HashRouter>
    </ActiveUserContext.Provider>
  );
}

export default App;
