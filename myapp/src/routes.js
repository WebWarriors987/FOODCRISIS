import React from 'react';
import {Switch,Route} from 'react-router-dom'
import Main from './components/main/main';
import Register from './components/register/register';
import RegisterNgo from './components/register/registerngo';
import Login from './components/register/login';
import Layout from './components/hoc';
import Error from './components/main/404'
import Forgot from './components/main/forgotpass';
import Forget from './components/main/forget'
import Auth from './components/hoc/auth'
import Logout from "./components/main/Logout.js";
import Maps from './components/main/maps';


const Routes = () => {
    return (
        <Layout>
        <Switch>
            

            <Route exact component={Auth(Main,null)} path="/"/>
            
            <Route exact component={Auth(Register,null)} path="/register"/>

            <Route exact component={Auth(RegisterNgo,null)} path="/registerngo"/>
        
            <Route exact component={Auth(Login,null)} path="/login"/>
            
            <Route exact component={Auth(Logout,true)} path="/logout"/>
            
            <Route exact component={Auth(Forgot,null)} path="/resetpass"/>
            
            <Route exact component={Auth(Forget,null)} path="/forget"/>
            <Route exact component={Auth(Maps,true)} path="/maps"/>
            
            <Route component={Error} /> 

        
        </Switch>
        </Layout>
    );
};

export default Routes;