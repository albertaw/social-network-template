const axios = require('axios');
const Post = require('./post.model');
const User = require('../user/user.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { boot, shutdown, port } = require('../../server');
const url = 'http://localhost:' + port;
let userId;
let token;
let postId;
let postId2;

beforeAll(async () => {
	await boot();
	await mongoose.connection.dropDatabase();

	const user = await axios.post(`${url}/api/users`, {
		name: 'Test User',
		email: 'test@example.com',
		password: 'testpassword',
		password2: 'testpassword'
	});
	userId = user.data._id;

	const response = await axios.post(`${url}/api/users/login`, {
		email: 'test@example.com',
		password: 'testpassword'
	});
	token = response.data.token;	
});

beforeEach(async () => {
	const post = {
			user: userId,
			text: 'Post 1'
		}
	const res = await Post.create(post);
	postId = res._id;

	const post2 = {
		user: userId,
		text: 'Post 2'
	}
	const res2 = await Post.create(post2);
	postId2 = res2._id;
});

afterEach(async () => {
	await mongoose.connection.dropCollection('posts');
})

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await shutdown();
});

describe('Post module', () => {
	it('GET /api/posts', async () => {
		const response = await axios.get(`${url}/api/posts`);
		const post1 = response.data.find(el => el._id == postId);
		const post2 = response.data.find(el => el._id == postId2);
		
		expect(response.data.length).toEqual(2);
		expect(post1.text).toEqual('Post 1');
		expect(post1.user.name).toEqual('Test User');
		expect(post2.text).toEqual('Post 2');
		expect(post2.user.name).toEqual('Test User');
	});

	it('POST /api/posts', async () => {
		const response = await axios({
			method: 'post',
			headers: { 'Authorization': token },
			url: `${url}/api/posts`, 
			data: {
				user: userId,
				text: 'Post 3'
			}
		});

		const posts = await Post.find({});
		expect(posts.length).toEqual(3);
		expect(response.data.text).toEqual('Post 3');

	});

	it('POST /api/posts invalid post', async () => {
		expect.assertions(2);
		try {
			await axios({
				method: 'post',
				headers: { 'Authorization': token },
				url: `${url}/api/posts`, 
				data: {
					user: userId,
					text: ' '
				}
			})
		} catch (error) {		
			expect(error.response.status).toEqual(400);
			expect(error.response.data.text.message).toEqual('Post must be between 1 and 82 characters');
		}
				
	});

	it('GET /api/posts/:id', async () => {
		const response = await axios.get(`${url}/api/posts/${postId}`);

		expect(response.data.text).toEqual('Post 1');
		expect(response.data.user.name).toEqual('Test User');
	});

	it('GET /api/posts/:id not found', async () => {
		expect.assertions(2);
		try {
			await axios.get(`${url}/api/posts/123`);
		} catch (error) {
			expect(error.response.status).toEqual(404);
			expect(error.response.data.message).toEqual('No post found with that id');
		}
	});

	it('DELETE /api/posts/:id', async () => {
		const response = await axios({
			method: 'delete',
			headers: { 'Authorization': token },
			url: `${url}/api/posts/${postId}`
		})

		const posts = await Post.find({});
		expect(posts.length).toEqual(1);
		expect(posts[0]._id).toEqual(postId2);
		expect(response.data.success).toEqual(true);
	});

	it('DELETE /api/posts/:id not found', async () => {
		expect.assertions(3);
		try {
			await axios({
				method: 'delete',
				headers: { 'Authorization': token },
				url: `${url}/api/posts/123`
			});
		} catch (error) {
			const posts = await Post.find({});
			expect(posts.length).toEqual(2);
			expect(error.response.status).toEqual(404);
			expect(error.response.data.message).toEqual('No post found with that id');
		}
	}); 
});