import React from 'react';
import { Button, Form, Nav, Navbar, Row } from 'react-bootstrap';
import './BuyerNavBar.css'

function BuyerNavBar({ page, setFilterText, filterText, filterBy, setFilterBy, onLogout }) {



    return (
        <Navbar className="buyer-navbar" expand="lg">
            <Navbar.Brand className="eng" href="#home">PaintsIL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="home" href="#home">עמוד הבית</Nav.Link>
                    <Nav.Link className="saved" href="#saved">התמונות ששמרתי</Nav.Link>
                </Nav>
                {page === "home" ?
                    <Form className="form-filter">
                        <Row>
                            <div className="filter-container col-md-6 col-12">
                                <Form.Control value={filterText} onChange={(e) => {
                                    setFilterText(e.target.value);
                                }} placeholder="מה לחפש?"></Form.Control>
                            </div>
                            <div className="select-container col-md-6 col-12">
                                <Form.Control value={filterBy} as="select" onChange={(e) => setFilterBy(e.target.value)}>
                                    <option value="userName">שם האומן</option>
                                    <option value="creationName">שם היצירה</option>
                                </Form.Control>
                            </div>
                        </Row>
                    </Form> : null}
                <Nav className="mr-auto">
                    <Nav.Link href="#" onClick={() => onLogout()}>התנתק</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default BuyerNavBar;