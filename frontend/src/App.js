import React from 'react';
import { Route, Switch } from 'react-router-dom'

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import Header from './components/Header';
const App = () => {
  return (
    <>  
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </>
  );
}

export default App;
