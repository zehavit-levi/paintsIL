import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import './BuyerNavBar.css'

function BuyerNavBar(props) {



    return (
        <Navbar className="buyer-navbar" bg="light" expand="lg">
            <Navbar.Brand href="/">PaintsIL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto col-lg-6">
                    <Nav.Link href="#home">עמוד הבית</Nav.Link>
                    <Nav.Link href="#saved">התמונות ששמרתי</Nav.Link>
                </Nav>
                <Form className="form-filter col-lg-6">
                    <Row>
                        <div className="filter-container col-md-6 col-12">
                            <Form.Control value={props.filterText} onChange={(e) => {
                                props.setFilterText(e.target.value);
                            }} placeholder="מה לחפש?"></Form.Control>
                        </div>
                        <div className="select-container col-md-6 col-12">
                            <Form.Control value={props.filterBy} as="select" onChange={(e) => props.setFilterBy(e.target.value)}>
                                <option value="fName">שם פרטי של האומן</option>
                                <option value="lName">שם משפחה של האומן</option>
                                <option value="creationName">שם היצירה</option>
                                <option value="size">גודל</option>
                            </Form.Control>
                        </div>
                        {/* <div className="search-btn" >
                            <Form.Control>
                                <button onClick={() =>props.onClick()}>חפש</button>
                            </Form.Control>
                        </div> */}
                    </Row>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default BuyerNavBar;