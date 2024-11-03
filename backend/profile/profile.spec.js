const axios = require('axios');
const Profile = require('./Profile.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { boot, shutdown, port } = require('../../server');
const url = 'http://localhost:' + port;
let user;
let login;

beforeAll(async () => {
	await boot();
	await mongoose.connection.dropDatabase();
	user = await axios.post(`${url}/api/users`, {
			name: 'Test User',
			email: 'test@example.com',
			password: 'password',
			password2: 'password'
		});

		login = await axios.post(`${url}/api/users/login`, {
			email: 'test@example.com',
			password: 'password'
		});
});

afterEach(async () => {
	await mongoose.connection.dropCollection('profiles');
})

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await shutdown();
});

describe('Profile module', () => {
	it('POST /api/profiles', async () => {
		const response = await axios({
			method: 'post',
			url: `${url}/api/profiles`, 
			data: {
				username: 'test',
				bio: 'hello world',
				skills: ['coding', 'writing']
			},
			headers: {
				'Authorization': login.data.token
			}
		});

		expect(response.data.user).toEqual(user.data._id);
		expect(response.data.username).toEqual('test');
		expect(response.data.bio).toEqual('hello world');
		expect(response.data.skills).toEqual(['coding', 'writing']);
	});

	it('GET /api/profiles/:id', async () => {
		const profile = await Profile.create({
			user: new ObjectId(user.data._id),
			username: 'admin',
			bio: 'I am a coder',
			skills: ['python', 'java']
		});
		const id = profile._id;
		
		const response = await axios.get(`${url}/api/profiles/${id}`);

		expect(response.data.user.name).toEqual('Test User');
		expect(response.data.username).toEqual('admin');
		expect(response.data.bio).toEqual('I am a coder');
		expect(response.data.skills).toEqual(['python', 'java']);
	});

	it('GET /api/profiles/username/:username', async () => {
		const profile = await Profile.create({
			user: new ObjectId(user.data._id),
			username: 'user1',
			bio: 'I am a coder',
			skills: ['python', 'java']
		});

		const response = await axios.get(`${url}/api/profiles/username/user1`)
		
		expect(response.data.username).toEqual('user1');
		expect(response.data.bio).toEqual('I am a coder');
		expect(response.data.skills).toEqual(['python', 'java']);
		expect(response.data.user.name).toEqual('Test User');
	});

	it('GET /api/profiles', async () => {
		const profile = await Profile.create({
			user: new ObjectId,
			username: 'profile1',
			bio: 'I am a coder',
			skills: ['javascript']
		});
		const profile2 = await Profile.create({
			user: new ObjectId,
			username: 'profile2',
			bio: 'I am a a data scientist',
			skills: ['python']
		});

		const response = await axios.get(`${url}/api/profiles`);

		expect(response.data.length).toEqual(2);
	});

	it('GET /api/profile', async () => {
		const userProfile = await Profile.create({
			user: new ObjectId(user.data._id),
			username: 'me',
			bio: 'hello world',
			skills: ['python', 'java']
		});

		const otherProfile = await Profile.create({
			user: new ObjectId,
			username: 'you',
			bio: 'I am a coder',
			skills: ['javascript']
		});

		const response = await axios({
			method: 'get',
			url: `${url}/api/profile`,
			headers: {
				'Authorization': login.data.token
			}
		});

		expect(response.data.user.name).toEqual('Test User');
		expect(response.data.username).toEqual('me');
		expect(response.data.bio).toEqual('hello world');
		expect(response.data.skills).toEqual(['python', 'java']);
	});

	it('DELETE /api/profile', async () => {
		const userProfile = await Profile.create({
			user: new ObjectId(user.data._id),
			username: 'me',
			bio: 'hello world',
			skills: ['python', 'java']
		});

		const response = await axios({
			method: 'delete',
			url: `${url}/api/profile`,
			headers: {
				'Authorization': login.data.token
			}
		});

		const profile = await Profile.findById(userProfile._id);

		expect(profile).toBe(null);
	});
});