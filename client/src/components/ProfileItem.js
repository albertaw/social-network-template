import React from 'react';
import { Link } from 'react-router-dom';

function ProfileItem(props) {
    return (
        <li className="mb-3">
            <h6>{props.name}</h6>
            <Link className="text-decoration-none" to={'/users/' + props.username}><span>@{props.username}</span> </Link>
        </li>
    )
}

export default ProfileItem;