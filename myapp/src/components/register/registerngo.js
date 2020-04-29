import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';
import FormFields from '../utils/formfields';
import {update,validform, generatedata} from '../utils/formtions'
import {connect} from 'react-redux'
import {registerngo} from '../actions/memberactions'
import { Button, Container, Col, Row } from 'react-bootstrap';
import './register.css'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
  
class RegisterNgo extends Component {
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
        
        contact: {
            element:'input',
            value:'',
            config:{
                name:'Contact Number',
                placeholder:'Enter your contact number here',
                type:'text'
            },
            validation:{
                required:false
            },
            valid:false,
            validationMessage:'',
            label:true
        },
        additional: {
            element:'input',
            value:'',
            config:{
                name:'Additional information',
                placeholder:'Enter your additional information here',
                type:'text'
            },
            validation:{
                required:false
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
    },
    value:0
}

updateform=(element)=>{
    const newdata=update(element,this.state.formdata,'register')
    this.setState({
        formdata:newdata,
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
    this.props.dispatch(registerngo(data,this.state.coordinates)).then((response)=>{
        
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


componentDidMount=()=>{
    navigator.geolocation.getCurrentPosition(e=>{
        this.setState({coordinates:{
            lat:e.coords.latitude,
            lng:e.coords.longitude
        }});
    })
}
handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    this.setAddress(value);
    this.setCoordinates(latLng);
  };
onMarkerClick=(e)=>{
    console.log(e)
}

// onrchange=(e)=>{
//     console.log(this.state.formdata.role.value)
//     const newformdata=this.state.formdata

//     newformdata['role'].value=e.target.value
//     this.setState({
//         formdata:newformdata,
//         value:e.target.value
//     })
    
//     this.setState({
//       value:1
//     })
//     console.log(this.state)
// }
    render() {
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
                        <p style={{fontSize:"30px"}}>NGO Donate</p>
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
                <div className="reg_row ">
                <div className="reg_col">
                            <FormFields
                            formdata={this.state.formdata.contact}
                            id={'contact'}
                            change={(event)=>{this.updateform(event)}}
                           />
                </div>
                        
                </div>
                <div className="reg_row ">
                <div className="reg_col">
                            <FormFields
                            formdata={this.state.formdata.additional}
                            id={'additional'}
                            change={(event)=>{this.updateform(event)}}
                           />
                </div>
                        
                </div>
                {/* <div className="reg_row">
                <div className="reg_col">
                <FormFields
                        formdata={this.state.formdata.password}
                        id={'password'}
                        change={(event)=>{this.updateform(event)}}
                    />
                </div>         
                </div>    */}
{/* 
                <Col>
                    <Row>
                        What is the location for service?
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.setAddress}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <p>Latitude: {this.state.coordinates.lat}</p>
                                <p>Longitude: {this.state.coordinates.lng}</p>

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
                    
                    </Col> */}
{/*                    
                <div className="reg_row">
                <div className="reg_col">
                <FormFields
                        formdata={this.state.formdata.confirmpassword}
                        id={'confirmpassword'}
                        change={(event)=>{this.updateform(event)}}
                    />
                </div>
                    
                </div> */}

                <div className="reg_row_img">
                <div className="reg_col">
                <fieldset>
                    <button id="contact-submit" style={{padding:"10px"}} onClick={(event)=> this.submitform(event)}>
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
//     apiKey: "AIzaSyDcZNMWnHrX60v-Vw3zDdClGn-avHIjsoI"
//   })(connect()(RegisterNgo));
export default connect()(RegisterNgo)