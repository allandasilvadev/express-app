const request = require('supertest');
const app = require('../../config/express')();

describe('Routes: index', () => {

    describe('GET /', () => {

        it('returns the API status', async () => {
            const response = await request(app).get('/').expect(200);

            // assert
            expect(response.status).toBe(200);
        });

        it('return message', async () => {
            const response = await request(app).get('/').expect(200);

            // assert
            expect(response.body).toEqual({
                "message": "Application is running"
            });
        });

    });
});