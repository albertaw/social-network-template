import React from 'react';

function Dropdown(props) {
    return (
        <li className="nav-item">
            <div className="dropdown-toggle nav-link" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="fas fa-user-circle fa-2x"></span>
            </div>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu">
                <li><button className="dropdown-item" onClick={props.onLogoutClick}>Logout</button></li>
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete account</button></li>
            </ul>
        </li>
    )
}

export default Dropdown;