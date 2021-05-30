import React from 'react';
import ProfileItem from './ProfileItem';

function ProfileList(props) {
    const profiles = props.profiles.map(profile =>
        <ProfileItem
            key={profile._id}
            name={profile.user.name}
            username={profile.username} />
    );

    return (
		<ul className="list-unstyled">{profiles}</ul>
	)
}

export default ProfileList;