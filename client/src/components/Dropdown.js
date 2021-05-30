import React from 'react';
import { Link } from 'react-router-dom';

function Dropdown(props) {
    return (
        <li className="nav-item">
            <div className="dropdown-toggle nav-link" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="fas fa-user-circle fa-2x"></span>
            </div>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu">
                <li><Link className="dropdown-item" to="dashboard/profile">Edit profile</Link></li>
                <li><button className="dropdown-item" onClick={props.onLogoutClick}>Logout</button></li>
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete account</button></li>
            </ul>
        </li>
    )
}

export default Dropdown;