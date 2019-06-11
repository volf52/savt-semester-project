import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/mainapp/Dashboard';
import ShipList from './components/shipStuff/ShipList';
import AddShip from './components/shipStuff/AddShip';
import AddRoute from './components/routeStuff/AddRoute';
import RouteList from './components/routeStuff/RouteList';
import RouteResults from './components/routeStuff/RouteResults';

import store from './store';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000; // seconds
    console.log(currentTime);
    if (decoded.expiresIn < currentTime) {
        // store.dispatch(logoutUser());
        logoutUser();
        window.location.href = './login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className='App'>
                        <ToastContainer />
                        <Navbar />
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Switch>
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path='/ships'
                                component={ShipList}
                            />
                            <PrivateRoute
                                exact
                                path='/addShip'
                                component={AddShip}
                            />
                            <PrivateRoute
                                exact
                                path='/routes'
                                component={RouteList}
                            />
                            <PrivateRoute
                                exact
                                path='/addRoute'
                                component={AddRoute}
                            />
                            <PrivateRoute
                                exact
                                path='/currentRoute'
                                component={RouteResults}
                            />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
