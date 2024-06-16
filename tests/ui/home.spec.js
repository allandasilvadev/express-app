const request = require('supertest');
const app = require('../../config/express')();

describe('Routes: index', () => {

    describe('GET /', () => {

        it('status 200', async () => {
            const response = await request(app).get('/').expect(200);

            // assert
            expect(response.status).toBe(200);
        });

        it('return message', async () => {
            const response = await request(app).get('/').expect(200);

            // assert
            expect(response.text).toContain("Hi, friends");

            expect(response.text).toContain('Codeigniter 4');
            expect(response.text).toContain('PHP 8');
        });

    });
});