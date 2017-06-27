import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import FAQ from './components/FAQ.jsx';
import SignUp from './components/auth/SignUp.jsx';
import SignUpVerify from './components/auth/SignUpVerify.jsx';
import VerifyAccount from './components/auth/VerifyAccount.jsx';
import Login from './components/auth/Login.jsx';
import Dashboard from './components/dash/Dashboard.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="faq" component={FAQ}/>
    <Route path="signup" component={SignUp}/>
    <Route path="login" component={Login}/>
    <Route path="signup/verify-account" component={SignUpVerify}/>
    <Route path="verify-account" component={VerifyAccount}/>
    <Route path="dashboard" component={Dashboard}/>
  </Route>
)
