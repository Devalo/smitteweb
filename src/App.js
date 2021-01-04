/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import fire from './config/fire';

import Layout from './components/layout/Layout';
import Frontpage from './components/frontpage/Frontpage';
import Notification from './components/shared/Notification';

import Register from './components/user/Register';
import Login from './components/user/Login';

import AllArrangements from './components/Arrangement/AllArrangements';
import AddArrangement from './components/Arrangement/AddArrangement';
import ViewOne from './components/Arrangement/ViewOne';

import AddPublic from './components/Arrangement/AddPublic';
import AddParticipant from './components/Arrangement/Participants/AddParticipant';
import PublicFormRedirect from './components/Arrangement/Participants/PublicFormRedirect';

import './App.css';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <Router>
      <Layout>
        <Notification />
        {signedIn
          ? (
            <Switch>
              <Route path="/arrangement/legg-til">
                <AddArrangement />
              </Route>
              <Route path="/arrangement/:id/legg-til-deltaker/:listName">
                <AddParticipant />
              </Route>
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
              <Route path="/takk">
                <PublicFormRedirect />
              </Route>
              <Route path="/:id">
                <AddPublic />
              </Route>
              <Route path="/">
                <Frontpage />
              </Route>
            </Switch>
          )}
      </Layout>
    </Router>
  );
}

export default App;
