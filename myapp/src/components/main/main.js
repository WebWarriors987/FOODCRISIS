import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import aut1 from "../../images/aut1.png";
import aut2 from "../../images/aut2.png";
import Donate from "../../images/donate.png";
import covid from "../../images/covid.png";
import { Container, Row, Col,Button, Image, Jumbotron } from 'react-bootstrap';
import "./main.css";
class Main extends Component {

    state={
        news:'',
        Total:null,


    }
    componentDidMount(){
      this.handleTotal()
      .then(res=>{
        console.log("Hey data",res.Total)
        this.setState({Total:res.Total})
      })
    }
    handleTotal=async ()=>{
      try {
        const response=await fetch(`https://api.covid19api.com/stats`)
        const total=await response.json()
        return total
        
      } catch (error) {
        console.log(error)
      }
      
    }
    render() {
        var height="560px";
        return (
          <div>
              <Container className="head_cont" fluid >
    
            <Row >
    
              <Col xs={12} sm={12} className="newHead"  style={{textAlign:"center"}}>
                <h1 className="home_head" style={{fontFamily: "'Courgette', cursive"}}>Do Your Deeds While At Home</h1>
                <span className="home_sub" style={{fontFamily: "'Courgette', cursive"}}>Find the nearest NGOs to fund during this epidemic</span>

                <Row style={{marginTop:"50px"}}>
                  <Col  xs={12}  sm={12}>
                  {this.props.user.userData?
                  
                  !this.props.user.userData.isAuth?
                 
                   <Link  className="contact-submit"  to="/login" style={{fontFamily: "'Courgette', cursive",fontSize:"25px"}}>SignUp/SignIn</Link>
                  :
                  null
                 :null
            }
                  </Col>
                  
                </Row>

              </Col>
              
              
            </Row>
            </Container>

            <Container className="home_under">

            <Row>
              <Col xs={12} sm={12}>
                <Container>
                  <Row xs={1} sm={1}>
                    <Col xs={12} sm={12} className="home_desc" style={{fontFamily: "'Courgette', cursive"}} >
                    DUE TO THE RECENT COVID19 CRISIS, MANY PEOPLE ARE LOSING THEIR JOBS AND A LOT OF DAILY WAGE WORKERS ARE NOT GETTING FOOD TO EAT.
MANY PEOPLE ARE WILLING TO DONATE MONEY IN THESE TIMES TO HELP OTHERS BUT ARE NOT ABLE TO FIND SUITABLE NGOs OR INDIVIDUALS IN THEIR AREA.
MANY NGOs ARE IN NEED OF MONEY TO CARRY OUT THEIR WORK.

OUR WEB APP COMES HERE WHICH WILL BRIDGE THIS GAP AND HELP DONORS TO DONATE MONEY IN THESE HARD TIMES TO NGOs OR PERSONS WHO NEED THESE FINANCIAL SUPPORT SO THAT EVERYONE GETS THEIR BASIC NEEDS.

                    </Col>
                    
                  </Row>
                </Container>
              
              </Col>
              <Col xs={12} sm={12} >
                <Row xs={1} sm={1}>
                  <Col xs={12} sm={12}>
                    <Image className="home_desc_img" src={Donate} alt="donate" responsive />

                  </Col>
                </Row>
              </Col>
            </Row>

                      </Container>
              
                      <Container className="home_corona">

                        <Row>
                        <Col xs={12} sm={12}>
                            <Row xs={1} >
                              <Col xs={12}>
                                <Image className="home_desc_img_2" src={covid} alt="donate" responsive />
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={12} sm={12}>
                            <Container>
                              <Row xs={1}>
                                <Col xs={12}>
                                  The threat to <span className="corona">corona-virus</span> rises everyday,
                                  with over <span className="corona_total">{this.state.Total && this.state.Total}</span> affected people.
                                </Col>
                                
                              </Row>
                            </Container>
                          
                          </Col>
                          
                        </Row>

                                  </Container>
                        
            <Container className="link_maps">

                <Row >
                <Col xs={12} sm={12}>
                    <Row xs={12} sm={12}>
                      <Col xs={12} sm={12}>
                      <Link className="covid_ngo" to="/maps" style={{fontFamily: "'Courgette', cursive",fontSize:"25px"}}>Search NGOs</Link> 

                      </Col>

                    </Row>
                  </Col>
                  
                        
                      
                 
                  
                </Row>

                          </Container>
            
                              </div>
          


        );
    }
}

const mapStateToProps=(state)=>{
    
       
    return{
      news:state.news,
      user:state.member
    }
      
  }
  
  export default connect(mapStateToProps)(Main);