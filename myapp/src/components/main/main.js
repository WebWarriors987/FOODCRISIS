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
    
              <Col xs={12} className="newHead"  style={{textAlign:"center"}}>
                <h1 className="home_head" style={{fontFamily: "'Courgette', cursive"}}>Do Your Deeds While At Home</h1>
                <span className="home_sub" style={{fontFamily: "'Courgette', cursive"}}>Find the nearest NGOs to fund during this epidemic</span>

                <Row style={{marginTop:"50px"}}>
                  <Col  xs={12} xsOffset={6}>
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
              <Col xs={8}>
                <Container>
                  <Row>
                    <Col xs={12} className="home_desc" style={{fontFamily: "'Courgette', cursive"}} >

                    This website aims to bring forward the nearest NGOs to your Notice so that with your little donations you can save 100 of lives
                    </Col>
                    
                  </Row>
                </Container>
              
              </Col>
              <Col xs={4}>
                <Row xs={1}>
                  <Col xs={12}>
                    <Image className="home_desc_img" src={Donate} alt="donate" />

                  </Col>
                </Row>
              </Col>
            </Row>

                      </Container>
              
                      <Container className="home_corona">

                        <Row>
                        <Col xs={4}>
                            <Row >
                              <Col xs={12}>
                                <Image className="home_desc_img_2" src={covid} alt="donate" />

                              </Col>
                            </Row>
                          </Col>
                          <Col xs={8}>
                            <Container>
                              <Row>
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
                <Col xs={12}>
                    <Row xs={1}>
                      <Col xs={12}>
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