import * as React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Peer from 'peerjs';
import io from 'socket.io-client';

import { Box } from '@mui/material';

import DataProvider from './redux/store';
import './styles/global.css';

import Alert from './components/Alert';

import Home from './pages/Home';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';

import { refreshToken } from './redux/actions/authAction';
import { getPosts } from './redux/actions/postAction';
import { getSuggestions } from './redux/actions/suggestionsAction';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { getNotifies } from './redux/actions/notifyAction';

import SocketClient from './SocketClient';

function MainRoute() {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // document.addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    // });
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") { }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") { }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    });
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  return (<Box>
    <Alert />
    <Router>
      <Switch>
        <Route exact path="/" component={auth.token ? Home : Login} />
        <Route exact path="/register" component={Register} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }} >

        </Box>
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }} >

        </Box>
      </Switch>
    </Router>
  </Box >);
}

ReactDOM.render(
  <DataProvider>
    <div className='main'>
      <MainRoute />
    </div>
  </DataProvider>,
  document.getElementById('app-main')
);