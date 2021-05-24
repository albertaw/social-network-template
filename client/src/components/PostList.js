import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostItem from './PostItem';

function PostList(props) {

	const posts = props.posts.map((post) =>
		<PostItem
			key={post._id}
            createdAt={post.createdAt}
			name={post.name}
			text={post.text} />
	);

	return (
		<ul className="list-unstyled">{posts}</ul>
	)
	
}

export default PostList;