require('dotenv').config()
const request = require('supertest');
const { app } = require('../app');
const { server } = require('..');


describe('Ping API Routes', () => {
    it('Hello World Test', async () => {
        const response = await request(app).get('/ping');
        expect(response.status).toBe(200);
        expect(response.text).toBe('hello world');
    });
});
afterAll((done) => {
    server.close(done);
});