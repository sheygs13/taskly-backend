// require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');

const user = {
        name: 'Olusegun Ekoh',
        email: 'sheygs@gmail.co.uk',
        password: 'sheygs',
};

beforeEach(async () => {
        await User.deleteMany();

        await new User(user).save();
});

test('Should sign in a user', async () => {
        await request(app)
                .post('/api/v1/auth/users/register')
                .send({
                        name: 'Michael Trojan',
                        email: 'michealokoh@gmail.com',
                        password: 'mikey234',
                })
                .expect(201);
});

test('Should login a user', async () => {
        await request(app)
                .post('/api/v1/auth/users/sign-in')
                .send({
                        email: user.email,
                        password: user.password,
                })
                .expect(200);
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
