import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import { Button, Container, Col, Row } from 'react-bootstrap';
import {Map, InfoWindow, Marker,Circle, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import { alllist } from '../actions/recordactions';
import NGO from './mapsNGO/NGO';
  

export class Location extends Component {
    state={
        address:"",
        coordinates:{
            lat:null,
            lng:null
        },
        locations:"",
        locationsmod:[]
    }
    componentDidMount=()=>{

        this.props.dispatch(alllist()).then(res=>{
            this.setState({
              locations:res.payload  
            })
            for(var i=0;i<this.state.locations.length;i++){
        
                console.log(this.props)
                	
        const R = 6371e3; // metres
        const φ1 = this.state.locations[i].address.lat * Math.PI/180; // φ, λ in radians
        const φ2 = this.props.user.userData.address.lat * Math.PI/180;
        const Δφ = (this.props.user.userData.address.lat-this.state.locations[i].address.lat) * Math.PI/180;
        const Δλ = (this.props.user.userData.address.lng-this.state.locations[i].address.lng) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const dist = (R * c)/1000;  
                if(dist<1000){
                    var locationsmod=this.state.locationsmod
                   var locationsmod= locationsmod.concat(this.state.locations[i])
                   this.setState({
                       locationsmod:locationsmod
                   })
                }
             }
            console.log(this.state.locationsmod)
        }).catch(err=>{
            console.log(err)
        })   
    }
    setAddress=(val)=>{
        this.setState({address:val});
    }
    setCoordinates=(coord)=>{
        this.setState({coordinates:coord})
    }
    coords = { lat: this.props.user.userData.address.lat, lng: this.props.user.userData.address.lng };
   
    handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        this.setAddress(value);
        this.setCoordinates(latLng);
      };
    onMarkerClick=(e)=>{
        console.log(e)
    }
    render() {
        const style = {
            width: '90%',
            height: '100%'
          }
        return (
            <Fragment>
                <Container>
                    <Row>
                        
              <div className="reg_col">
                   <center>
                       <p style={{fontSize:"30px",textAlign:"center",fontFamily:"algerian"}}>LIST OF ALL NGO BASED ON YOUR LOCATION</p>
                </center>  
               </div>
                    </Row>
                    <Row >
                    <Col  >
                    {/* <Map style={style}
          initialCenter={{
            lat: 22.445237,
            lng:  88.416412
          }} google={this.props.google} zoom={14}>
                   
                            {
                                this.state.locationsmod?
                                this.state.locationsmod.map((e,i)=>(
                                    
                    <Marker onClick={this.onMarkerClick}
                    name={'Current location'}
                    position={{lat: e.address.lat, lng:e.address.lng}}
                    />
                                    )):null
                            }

                    {/* <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow> */}
                    {/* <Circle
        radius={1200}
        center={this.coords}
        onMouseover={() => console.log('mouseover')}
        onClick={() => console.log('click')}
        onMouseout={() => console.log('mouseout')}
        strokeColor='transparent'
        strokeOpacity={0}
        strokeWeight={5}
        fillColor='#FF0000'
        fillOpacity={0.2}
      />
                    </Map>
 */} 
                   
                   {
                                this.state.locationsmod?
                                this.state.locationsmod.map((e,i)=>(
                      <NGO detail={e} key={i}/>
                                    )):null
                            }
                    </Col>
                    
                    </Row>
                    
                    
                </Container>
                
                
            </Fragment>
        );
    }
}

const mapStateToProps=state=>{
    return{
        all:state.record.all,
        user:state.member
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        list:()=>{dispatch(alllist())}
    }
}

// export default GoogleApiWrapper({
//     apiKey: "AIzaSyDcZNMWnHrX60v-Vw3zDdClGn-avHIjsoI"
//   })(connect(mapStateToProps)(Location))
export default connect()(Location)