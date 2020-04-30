import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {log} from "../actions/memberactions"
import food from "../../images/food.jpg"
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
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
<Fragment>
<Navbar className="navbar" collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand href="/">NGO Donate</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              
            </Nav>
            <Nav>
              <Nav.Link className="nav-item" href="/registerngo">NGO REGISTER</Nav.Link>
              
              {
                     this.props.user.userData?
                     this.props.user.userData.isAuth?
                     <Nav.Link className="nav-item" href="/maps">NGO List</Nav.Link>

                    :null
                    :null
                   }
              <Nav.Link className="nav-item" href="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</Nav.Link>
              {this.props.user.userData?
                        
                        !this.props.user.userData.isAuth?
                        <Nav.Link className="nav-item" href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Nav.Link>
                        :
                        <Nav.Link className="nav-item" href="/" onClick={(event)=>this.logoutuser()}><span className="glyphicon glyphicon-log-in"></span> Logout</Nav.Link>
                        :null
        }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
{/* <nav className="navbar fixed-top navbar-expand-md navbar-light" >
  <a className="navbar-brand" href="#">
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
        <a className="nav-link" href="/registerngo">NGO REGISTER</a>
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
    {/* </ul>
    <ul className="navbar-nav ">
        <li className="nav-item"><a className="nav-link" href="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
        {this.props.user.userData?
                  
                  !this.props.user.userData.isAuth?
                  <li className="nav-item"><a className="nav-link" href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                  :
                  <li className="nav-item"><a className="nav-link" href="/" onClick={(event)=>this.logoutuser()}><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
                  :null
  }
      </ul>
  </div>   */}
{/* </nav> */} 

         

</Fragment>
          
        );
    }
}

const mapStateToProps=(state)=>{
    return{
      user:state.member,
    }
      
}

export default connect(mapStateToProps)(Header);