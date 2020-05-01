import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';
import FormFields from '../utils/formfields';
import {update,validform, generatedata} from '../utils/formtions'
import {connect} from 'react-redux'
import {registeruser} from '../actions/memberactions'
import { Button, Container, Col, Row, Form } from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import axios from 'axios'
import './register.css'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
  
class Register extends Component {
    state={
        loading:false,
        formSuccess:false,
        formError:false,
        address:"",
        coordinates:{
            lat:null,
            lng:null
        },
        formdata:{
        name: {
            element:'input',
            value:'',
            config:{
                name:'Name',
                placeholder:'Enter your name here',
                type:'text'
            },
            validation:{
                required:true
            },
            valid:false,
            validationMessage:'',
            label:true
        },
        lastname: {
            element:'input',
            value:'',
            config:{
                name:'Lastname',
                placeholder:'Enter your Last name here',
                type:'text'
            },
            validation:{
                required:true
            },
            valid:false,
            validationMessage:'',
            label:true
        },
        email: {
            element:'input',
            value:'',
            config:{
                name:'Email',
                placeholder:'Enter your Email here',
                type:'email'
            },
            validation:{
                email:true
              },
            valid:false,
            validationMessage:'',
            label:true
        },
        password: {
            element:'input',
            value:'',
            config:{
                name:'Password',
                placeholder:'Enter password here',
                type:'password'
            },
            validation:{
                required:true
            },
            valid:false,
            validationMessage:'',
            label:true
        },
        confirmpassword: {
            element:'input',
            value:'',
            config:{
                name:'Confirm Password',
                placeholder:'ReEnter your Password here',
                type:'password'
            },
            validation:{
                required:true,
                confirm: 'password'
            },
            valid:false,
            validationMessage:'',
            label:true
        },
        role: {
            element:'radio',
            value:0,
            config:{
                name:'admin',
                placeholder:'Admin here',
                type:'admin'
            },
            validation:{
                required:false
            },
            valid:true,
            validationMessage:'',
            label:false
        },
        
    },
    value:0
}

updateform=(element)=>{
    const newdata=update(element,this.state.formdata,'register')
    this.setState({
        formdata:newdata,
    })
}

componentDidMount=()=>{
    navigator.geolocation.getCurrentPosition(e=>{
        this.setState({coordinates:{
            lat:e.coords.latitude,
            lng:e.coords.longitude
        }});
    })
}

submitform=(event)=>{
    console.log("Dfdf")
event.preventDefault();
const isformvalid=validform(this.state.formdata,'register')
const data=generatedata(this.state.formdata,'register')
console.log(data)
console.log(isformvalid)
if(isformvalid){
    console.log("lll")
    this.props.dispatch(registeruser(data,this.state.coordinates)).then((response)=>{
        
        if(response.payload.success){
         console.log('hurray')
            this.setState({
                formSuccess:true,
                formError:false,
                loading:true
            })
            setTimeout(()=>{
            this.props.history.push('/login')
            console.log('dffdfd')
            },5000)}
            else{
                this.setState({
                    formError:true
                })
                console.log('sddsd')
            }
        }
    )}
}
setAddress=(val)=>{
    this.setState({address:val});
}
setCoordinates=(coord)=>{
    this.setState({coordinates:coord})
}

handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(latLng)
    console.log(value)
    this.setAddress(value);
    this.setCoordinates(latLng);
  };

onMarkerClick=(e)=>{
    console.log(e)
}

onrchange=(e)=>{
    console.log(this.state.formdata.role.value)
    const newformdata=this.state.formdata

    newformdata['role'].value=e.target.value
    this.setState({
        formdata:newformdata,
        value:parseInt(e.target.value)
    })
    
    
}
render() {
    console.log("Hieeeeeeee",this.state.value)
    let ngoDetails;
    if(this.state.value==1){
        ngoDetails=(
        <div className="reg_row ">
        <div className="reg_col">
                    <FormFields
                    formdata={this.state.formdata.ngo_name}
                    id={'name'}
                    change={(event)=>{this.updateform(event)}}
                   />
        </div>
        </div>)
    }
    return (
            this.state.loading?
        <center> <CircularProgress thickness={5} size={15} style={{color:'grey',marginBottom:"500px"}} />  </center>
            :
            
            <div className="containers">
                
                <form id="contact" onSubmit={(event)=>{
                  this.submitform(event)
                }}>


                <div className="reg_row_img">
                        <div className="reg_col">
                        <p style={{fontSize:"30px",textAlign:"center",fontFamily:"algerian"}}>REGISTER AS A DONOR</p>
                        </div>
                         
                </div>
                <div className="reg_row">
                        <div className="reg_col">
                            <FormFields
                                formdata={this.state.formdata.name}
                                id={'name'}
                                change={(event)=>{this.updateform(event)}}
                            />
                         </div>
                         <div className="reg_col">
                            <FormFields
                                formdata={this.state.formdata.lastname}
                                id={'lastname'}
                                change={(event)=>{this.updateform(event)}}
                            />
                         
                         </div>
                </div>
                <div className="reg_row ">
                <div className="reg_col">
                            <FormFields
                            formdata={this.state.formdata.email}
                            id={'email'}
                            change={(event)=>{this.updateform(event)}}
                           />
                </div>
                        
                </div>
                <div className="reg_row">
                <div className="reg_col">
                <FormFields
                        formdata={this.state.formdata.password}
                        id={'password'}
                        change={(event)=>{this.updateform(event)}}
                    />
                </div>         
                </div>

                
                <div className="reg_row">
                <div className="reg_col">
                <FormFields
                        formdata={this.state.formdata.confirmpassword}
                        id={'confirmpassword'}
                        change={(event)=>{this.updateform(event)}}
                    />
                </div>
                    
                </div>   

                
                    {/* <Row className="reg_row">
                       
                        <span className="label_inputs" style={{fontSize:"20px",margin:"5px 20px 5px 0",paddingLeft:"10px"}} >Enter Your Address</span>
                       <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.setAddress}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                

                                <input {...getInputProps({ placeholder: "Type address" })} />

                                <div>
                                {loading ? <div>...loading</div> : null}

                                {suggestions.map(suggestion => {
                                    const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                    };

                                    return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>
                      
                        
                    </Row>
                    */}
                {ngoDetails}
{/*                 

                <div className="row">
                   <label style={{fontFamily:'algerian'}}> ARE YOU AN ADMIN ? </label> 
           <div className="row">
           <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
                <input
                type="radio"
                value="1"
                checked={this.state.value === 1}
                onChange={(e)=>this.onrchange(e)}/>
                </div>

                <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
                <label>YES</label>
                </div>
                </div>
                
                <div className="row">
                <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">

                <input
                type="radio"
                value="0"
                checked={this.state.value === 0}
                onChange={(e)=>this.onrchange(e)}/>
                </div>
                <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
                <label>NO</label>
                </div>
                </div>
                </div> */}
                
                <div className="reg_row_img">
                <div className="reg_col">
                <fieldset>
                    <button id="contact-submit" className="btn btn-primary" style={{padding:"10px"}} onClick={(event)=> this.submitform(event)}>
                        Create an account
                    </button>

                    </fieldset>
                </div>
                    
                </div>
                </form>
                </div> 

               
                
        );
    }
}

// export default GoogleApiWrapper({
//     apiKey:"AIzaSyDcZNMWnHrX60v-Vw3zDdClGn-avHIjsoI"
//   })(connect()(Register));
export default connect()(Register)