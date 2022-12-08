import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Authors from './components/Authors';
import AuthorDetails from './components/AuthorDetails/AuthorDetails';
import BookDetails from './components/BookDetails';
import Books from './components/Books';
import ChapterDetails from './components/ChapterDetails/ChapterDetails';
import NotFoundPage from './components/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import ProfilePage from './components/ProfilePage';
import { authenticate } from './store/session';
import * as authorActions from './store/author';
import * as bookActions from './store/book';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // dispatch(authorActions.thunkGetAuthors());
      // dispatch(bookActions.thunkGetBooks());
      dispatch(authenticate());
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
        <Route path='/authors/:authorId' exact={true}>
          <AuthorDetails />
        </Route>
        <Route path='/books/:bookId' exact={true}>
          <BookDetails />
        </Route>
        <Route path='/chapters/:chapterId'>
          <ChapterDetails />
        </Route>
        <Route path='/authors' exact={true}>
          <Authors />
        </Route>
        <Route path='/books' exact={true}>
          <Books />
        </Route>
        <Route path='/my' exact={true}>
          <ProfilePage />
        </Route>
        <Route path='/main' exact={true}>
          <Main loaded={loaded}/>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
