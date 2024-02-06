import React from 'react';
import { Link } from 'react-router-dom';

function Dropdown(props) {
    return (
        <li className="nav-item">
            <div className="dropdown-toggle nav-link" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            </div>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu">
                <li><Link className="dropdown-item" to="/dashboard/profile">Edit profile</Link></li>
                <li><button className="dropdown-item" onClick={props.onLogoutClick}>Logout</button></li>
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete account</button></li>
            </ul>
        </li>
    )
}

export default Dropdown;