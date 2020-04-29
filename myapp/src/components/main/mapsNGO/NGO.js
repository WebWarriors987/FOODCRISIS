import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import "./NGO.css"

const NGO = (props) => {
    const {detail}=props
    const initials=`${detail.name[0].toUpperCase()}${detail.lastname[0].toUpperCase()}`
    return (
        <Fragment>
            <Row className="ngo_main">
                <Col xs={2}>
                    <h2 className="ngo_init"><span className="ngo_init_name">{initials}</span></h2>
                </Col>
                <Col xs={7}>
                    <Row>
                        <Col>
    <h1 className="ngo_heading">{`${detail.name} ${detail.lastname}`} </h1>
                        
                        </Col>
                    </Row>
                    <Row>
                        <Col>
    <p className="ngo_detail">{`${detail.additionalinfo}`}</p>
                        </Col>
                    </Row>
    <Row><Col><span className="ngo_contact">Contact: {detail.contact}</span></Col><Col><span className="ngo_email">Email: {detail.email}</span></Col></Row>
                </Col>
                <Col xs={3}></Col>
            </Row>
        </Fragment>
    );
};

export default NGO;