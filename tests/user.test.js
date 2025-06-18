const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe("User Authentication", () => {
beforeAll(async () => {
await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
await mongoose.disconnect();
});

beforeEach(async () => {
// Clean the users collection before each test
await mongoose.connection.collection('users').deleteMany({});
});

it("should register a user successfully", async () => {
const userData = {
username: "testuser",
password: "testpass"
};

const res = await request(app)
.post("/api/users/register")
.send(userData);

expect(res.statusCode).toBe(200);
expect(res.body).toHaveProperty('username', userData.username);
expect(res.body).toHaveProperty('password');
});

it("should login a user failed", async () => {
const userData = {
username: "testuser",
password: "testpass"
};

const res = await request(app)
.post("/api/users/login")
.send(userData);

expect(res.statusCode).toBe(400);
expect(res.body).toHaveProperty('message');
});
});