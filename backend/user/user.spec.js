const axios = require('axios');
const User = require('./user.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { boot, shutdown, port } = require('../../server');
const url = 'http://localhost:' + port;

beforeAll(async () => {
	await boot();
	await mongoose.connection.dropDatabase();
});

afterEach(async () => {
	await User.deleteMany({});
	await Post.deleteMany({});
});

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await shutdown();
});

describe('User module', () => {
	it('POST /api/users/', async () => {
		const response = await axios.post(`${url}/api/users`, {
			name: 'Test User',
			email: 'test@example.com',
			password: 'password',
			password2: 'password'
		});

		expect(response.data.name).toEqual('Test User');
		expect(response.data.email).toEqual('test@example.com');
	});

	it('POST /api/users/ passwords do not match error', async () =>	{
		expect.assertions(2);

		try {
			await axios.post(`${url}/api/users`, {
				name: 'Test User',
				email: 'test@example.com',
				password: 'password',
				password2: 'testpassword'
			});
		} catch (error) {
			expect(error.response.status).toEqual(400);
			expect(error.response.data.password2).toEqual('Passwords must match');
		}
	});

	it('POST /api/users/ email exists error', async () => {
		expect.assertions(2);
		
		try {
			await axios.post(`${url}/api/users`, {
				name: 'Test User',
				email: 'test@example.com',
				password: 'password',
				password2: 'password'
			});

			await axios.post(`${url}/api/users`, {
				name: 'Second User',
				email: 'test@example.com',
				password: 'password',
				password2: 'password'
			});
		} catch (error) {
			expect(error.response.status).toEqual(400);
			expect(error.response.data.email).toEqual('Email already exists');
		}
	}); 

	it('POST /api/users/ error bad email format', async () => {
		expect.assertions(2);
		
		try {
			await axios.post(`${url}/api/users`, {
				name: 'Test User',
				email: 'example.com',
				password: 'password',
				password2: 'password'
			});
		} catch (error) {
			expect(error.response.status).toEqual(400);
			expect(error.response.data.email).toEqual('Email is invalid');
		}
	});

	it('POST /api/users/login', async () => {
		await axios.post(`${url}/api/users`, {
			name: 'Test User',
			email: 'test@example.com',
			password: 'password',
			password2: 'password'
		});

		const response = await axios.post(`${url}/api/users/login`, {
			email: 'test@example.com',
			password: 'password'
		});

		expect(response.data.success).toBeTruthy();
	});

	it('POST /api/users/login error incorrect email', async () => {
		expect.assertions(2);

		try {
			await axios.post(`${url}/api/users`, {
				name: 'Test User',
				email: 'test@example.com',
				password: 'password',
				password2: 'password'
			});

			await axios.post(`${url}/api/users/login`, {
				email: 'bad@example.com',
				password: 'password'
			});
		} catch (error) {
			expect(error.response.status).toEqual(404);
			expect(error.response.data.email).toEqual('Email or password is incorrect');
		}
	});

	it('POST /api/users/login error incorrect password', async () => {
		expect.assertions(2);

		try {
			await axios.post(`${url}/api/users`, {
				name: 'Test User',
				email: 'test@example.com',
				password: 'password',
				password2: 'password'
			});

			await axios.post(`${url}/api/users/login`, {
				email: 'test@example.com',
				password: 'badpassword'
			});
		} catch (error) {
			expect(error.response.status).toEqual(404);
			expect(error.response.data.password).toEqual('Email or password is incorrect');
		}
	});

	it('GET /api/user', async () => {
		const user = await axios.post(`${url}/api/users`, {
			name: 'Test User',
			email: 'test@example.com',
			password: 'password',
			password2: 'password'
		});

		const login = await axios.post(`${url}/api/users/login`, {
			email: 'test@example.com',
			password: 'password'
		});

		const response = await axios({
			method: 'get',
			url: `${url}/api/user`,
			headers: {
				'Authorization': login.data.token
			}
		});
			 
		expect(response.data.id).toEqual(user.data._id);
		expect(response.data.name).toEqual(user.data.name);
		expect(response.data.email).toEqual(user.data.email);
	});

	it('DELETE /api/user', async () => {
		const user = await axios.post(`${url}/api/users`, {
			name: 'Test User',
			email: 'test@example.com',
			password: 'password',
			password2: 'password'
		});

		const login = await axios.post(`${url}/api/users/login`, {
			email: 'test@example.com',
			password: 'password'
		});

		const response = await axios({
			method: 'delete',
			url: `${url}/api/user`,
			headers: {
				'Authorization': login.data.token
			}
		});

		expect(response.status).toEqual(204);
		const checkUser = await User.findById(user._id);
		expect(checkUser).toBeNull();
	});

	it('GET /api/users/:id/posts', async () => {
		const user = await axios.post(`${url}/api/users`, {
			name: 'Test User',
			email: 'test@example.com',
			password: 'password',
			password2: 'password'
		});

		const login = await axios.post(`${url}/api/users/login`, {
			email: 'test@example.com',
			password: 'password'
		});

		const id = user.data._id;

		const post1 = {
			user: id,
			text: 'Post 1'
		}

		const post2 = {
			user: new ObjectId,
			text: 'Post 2'
		}
	
		await Post.insertMany([post1, post2]);

		const response = await axios.get(`${url}/api/users/${id}/posts`);

		expect(response.data.length).toEqual(1);
		expect(response.data[0].text).toEqual('Post 1');
	});

	it('DELETE /api/user/posts', async () => {
		const user = await axios.post(`${url}/api/users`, {
			name: 'Test User',
			email: 'test@example.com',
			password: 'password',
			password2: 'password'
		});

		const login = await axios.post(`${url}/api/users/login`, {
			email: 'test@example.com',
			password: 'password'
		});

		const id = user.data._id;

		const post1 = {
			user: id,
			text: 'Post 1'
		}

		const post2 = {
			user: new ObjectId,
			text: 'Post 2'
		}
	
		await Post.insertMany([post1, post2]);

		const response = await axios.delete(`${url}/api/user/posts`, {
			headers: {
				'Authorization': login.data.token
			}
		});

		expect(response.status).toEqual(204);
		const userPosts = await Post.find({user: id});
		expect(userPosts.length).toEqual(0);
		const allPosts = await Post.find({});
		expect(allPosts.length).toEqual(1);
		expect(allPosts[0].text).toEqual('Post 2');
	});
});