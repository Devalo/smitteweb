import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTest } from './lib/reducers/testReducer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import fire from './config/fire';

import Layout from './components/layout/Layout';
import Frontpage from './components/frontpage/Frontpage';

import Register from './components/user/Register';
import Login from './components/user/Login';

import AllArrangements from './components/Arrangement/AllArrangements';
import ViewOne from './components/Arrangement/ViewOne';

import AddPublic from './components/Arrangement/AddPublic';

import './App.css';


function App() {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.tests);
  const [signedIn, setSignedIn] = useState(false);
  
  
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });
  
  useEffect(() => {
    dispatch(getTest());
  }, [dispatch]);
  return (
    <Router>
      <Layout>
        {signedIn 
          ? (
            <Switch>
              <Route path="/arrangement/:id">
                <ViewOne />
              </Route>
              <Route path="/">
                <AllArrangements />
              </Route>
            </Switch>
          )
          : (
            <Switch>
            <Route path="/logg-inn">
              <Login />
            </Route>
            <Route path="/registrer">
              <Register />
            </Route>
            <Route path="/:id">
              <AddPublic />
            </Route>
            <Route path="/">
              <Frontpage />
            </Route>
            </Switch>
          )
        }
      </Layout>
    </Router>
  );
}

export default App;
