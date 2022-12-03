import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Authors from './components/Authors';
import Books from './components/Books';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import ProfilePage from './components/ProfilePage';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <Navigation /> */}
      <Switch>
        <Route path='/authors' exact={true}>
          <Authors />
        </Route>
        <Route path='/books' exact={true}>
          <Books />
        </Route>
        <Route path='/main' exact={true}>
          <Main />
        </Route>
        <Route path='/my' exact={true}>
          <ProfilePage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <LandingPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
