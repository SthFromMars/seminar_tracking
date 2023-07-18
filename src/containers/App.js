import React from 'react';
import Seminars from './Seminars/Seminars';
import Users from "./Users/Users";
import DateFnsUtils from '@date-io/date-fns';
import NavBar from "../components/NavBar/NavBar";
import LogIn from "./LogIn/LogIn";
import { withCookies } from 'react-cookie';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
    Router,
    Redirect,
    Switch,
    Route,
} from 'react-router-dom';
import {connect} from "react-redux";
import {logIn} from "../state/authorization/authActions";
import UserInfo from "./UserInfo/UserInfo";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {main: '#a6d500'},

    },
});

function App(props) {
    const user = props.cookies.get('user');
    if(user && !props.loggedIn) props.logIn(user);
    if(props.loggedIn && !user) props.cookies.set('user', props.user);
  return (
      <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {props.loggedIn ? (
              <div>
                  {
                      props.user.privilege === 'ADMIN' ? (
                          <div>
                              <NavBar admin/>
                              <Router history={props.history}>
                                  <Switch>
                                      <Route path={'/users'}>
                                          <Users/>
                                      </Route>
                                      <Route path={'/seminars'}>
                                          <Seminars admin/>
                                      </Route>
                                      <Route path={'/userInfo'}>
                                          <UserInfo/>
                                      </Route>
                                      <Redirect from="/" to="seminars"/>
                                  </Switch>
                              </Router>
                          </div>
                      ) : (
                          <div>
                              <NavBar/>
                              <Router history={props.history}>
                                  <Switch>
                                      <Route path={'/seminars'}>
                                          <Seminars/>
                                      </Route>
                                      <Route path={'/userInfo'}>
                                          <UserInfo/>
                                      </Route>
                                      <Redirect from="/" to="seminars"/>
                                  </Switch>
                              </Router>
                          </div>
                      )
                  }
              </div>
          ) : (
              <LogIn/>
          )}
      </MuiPickersUtilsProvider>
      </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    logIn: (user) => dispatch(logIn(user)),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(App));
