import React from 'react';
import moment from 'moment';

function PostItem(props) {
	return (
		<li className="mb-3">
			<div className="card">
				<div className="card-body">
					<span className="card-title fw-bold">{props.name}</span>
					<p className="card-text mb-1 mt-1">{props.text}</p>
                    <span className="text-muted">{moment(props.createdAt).format('MMM D, YYYY')}</span>
				</div>
			</div>
		</li>
	)
}

export default PostItem;