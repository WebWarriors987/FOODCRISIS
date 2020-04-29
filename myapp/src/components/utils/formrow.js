import React from 'react';
import '../register/register.css'
const FormRow = (props) => {
    return (
        <div className="formrow" key={props.j}>
            
          <label className="name">{props.name}</label> : <p className="value">{props.value}</p>  
       
        </div>
    );
};

export default FormRow;