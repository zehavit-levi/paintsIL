import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './../CreatorNavBar/CreatorNavBar.css'

function CreatorNavBar({ onLogout }) {
    return (
        <Navbar className="creator-navbar" expand="lg">
            <Navbar.Brand className="eng" href="#home">PaintsIL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="home" href="#home">הגלריה שלי</Nav.Link>
                    <Nav.Link className="profile" href="#update-details">הפרופיל האישי</Nav.Link>
                    <Nav.Link className="manage" href="#manage">ניהול הגלריה</Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link href="#" onClick={() => onLogout()}>התנתק</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CreatorNavBar;