const supertest = require('supertest');
const app = require('../app');

describe("Testing the base API", () => {

    it("tests the base route and returns true for status", async () => {

        const response = await supertest(app).get('/');

        expect(response.status).toBe(200);
    });
    it("tests the post for login endpoint", async () => {

        const response = await supertest(app).post('/api/login').send({
            "username": 'test',
            "password": 'test',
        });

        expect(response.status).toBe(200);


    });
    it("Test the post for create endpoint", async () => {

        const response = await supertest(app).post('/api/login').send({
            "image": "https://picsum.photos/id/1001/367/267"
        });

        expect(response.status).toBe(200);


    });

});
