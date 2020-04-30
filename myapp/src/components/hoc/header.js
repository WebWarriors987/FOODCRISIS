import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {log} from "../actions/memberactions"
import food from "../../images/food.jpg"
import "./header.css"

class Header extends Component {  
   logoutuser=()=>{
       this.props.dispatch(log()).then(res=>{
           console.log('logout')
           
        }).catch(err=>
        console.log(err)
        )
   }
   
    render() {
      console.log(this.props.user.userData)
        return (
               
<nav className="navbar sticky-top navbar-expand-md navbar-light" >
  <a className="navbar-brand" href="/">
    NGO Donate
  </a>
  <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a className="nav-link" href="/">HOME</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/registerngo">REGISTERASNGO</a>
      </li>
      
      {
                     this.props.user.userData?
                     this.props.user.userData.isAuth?
                    <li className="nav-item">
                    <a className="nav-link" href="/maps">NGO LIST</a>
                  </li>
                    :null
                    :null
                   }
                  
      {/* <li className="nav-item">
        <a className="nav-link" href="">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>     */}
        <li className="nav-item"><a className="nav-link" href="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
        {this.props.user.userData?
                  
                  !this.props.user.userData.isAuth?
                  <li className="nav-item"><a className="nav-link" href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                  :
                  <li className="nav-item"><a className="nav-link" href="/" onClick={(event)=>this.logoutuser()}><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
                  :null
  }
   </ul>
  </div>  
</nav>

         
        );
    }
}

const mapStateToProps=(state)=>{
    return{
      user:state.member,
    }
      
}

export default connect(mapStateToProps)(Header);