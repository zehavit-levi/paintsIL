import React from 'react';
import { Link } from 'react-router-dom';
import './MyButton.css';

function MyButton(props) {
    return (
        <Link to={props.href}>
        <button className="my-button" onClick={() => props.onClick? props.onClick(props.isCreator):null}>
            <span>{props.text}</span>
        </button>
        </Link>
    );
}

export default MyButton;