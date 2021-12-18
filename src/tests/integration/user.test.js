require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;

const userId = new ObjectId();

const user = {
        _id: userId,
        name: 'Mark Zuckerberg',
        email: 'zuck@gmail.co.uk',
        password: 'zuckerman',
        tokens: [
                {
                        token: jwt.sign({ _id: userId }, process.env.JWT_SECRET),
                },
        ],
};

beforeEach(async () => {
        await User.deleteMany();
        await new User(user).save();
});

test('Should sign in a user', async () => {
        const response = await request(app)
                .post('/api/v1/auth/users/register')
                .send({
                        name: 'Michael Trojan',
                        email: 'michealokoh@gmail.com',
                        password: 'mikey234',
                })
                .expect(201);

        const user = await User.findById(response.body.data.user._id);

        expect(user).not.toBeNull();

        // expect(response.body.data)
        expect(response.body.status).toBe('success');

        expect(response.statusCode).toBe(201);

        expect(response.body.data).toMatchObject({
                user: {
                        name: 'Michael Trojan',
                        email: 'michealokoh@gmail.com',
                },
                token: user.tokens[0].token,
        });

        expect(user.password).not.toBe('mikey234');
});

test('Should login a user', async () => {
        const response = await request(app)
                .post('/api/v1/auth/users/sign-in')
                .send({
                        email: user.email,
                        password: user.password,
                })
                .expect(200);

        const loggedInUser = await User.findById(response.body.data.user._id);

        expect(loggedInUser).not.toBeNull();

        expect(response.body.data.token).toBe(loggedInUser.tokens[1].token);
});

test('Should not login a user with a wrong password', async () => {
        await request(app)
                .post('/api/v1/auth/users/sign-in')
                .send({
                        email: user.email,
                        password: 'password123',
                })
                .expect(400);
});

test('Should not login a user that does not exist', async () => {
        await request(app)
                .post('/api/v1/auth/users/sign-in')
                .send({
                        email: 'omolola.king@gmail.com',
                        password: user.password,
                })
                .expect(400);
});

test('Should get authenticated user profile', async () => {
        await request(app)
                .get('/api/v1/auth/users/me')
                .set('Authorization', `Bearer ${user.tokens[0].token}`)
                .send()
                .expect(200);
});

test('Should not get profile for users not authenticated', async () => {
        await request(app).get('/api/v1/auth/users/me').set('Authorization', '').send().expect(401);
});

test('Should delete account for authenticated user', async () => {
        const response = await request(app)
                .delete('/api/v1/auth/users/me')
                .set('Authorization', `Bearer ${user.tokens[0].token}`)
                .send()
                .expect(204);

        const deletedUser = await User.findById(userId);
        expect(response.body).toEqual({});
        expect(deletedUser).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
        await request(app).delete('/api/v1/auth/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
        await request(app)
                .post('/api/v1/auth/users/me/avatar')
                .set('Authorization', `Bearer ${user.tokens[0].token}`)
                .attach('avatar', 'tests/fixtures/test_small.jpg')
                .expect(200);
});
