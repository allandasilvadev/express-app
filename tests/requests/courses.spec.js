const request = require('supertest');
const app = require('../../config/express')();

describe('Routes: courses', () => {

    describe('GET: /courses', () => {
        it('status 200', async () => {
            const response = await request(app).get('/courses').expect(200);

            // assert
            expect(response.status).toBe(200);
        });

        it('returns a list of courses', async () => {
            const response = await request(app).get('/courses').expect(200);

            // assert
            expect(response.body.courses.length).toEqual(2)
            expect(response.body).toEqual({
                "courses": [
                    {
                        "id": 1,
                        "name": "Codeigniter 4",
                        "category": "Back-End",
                        "price": 420
                    },
                    {
                        "id": 2,
                        "name": "PHP 8",
                        "category": "Back-End",
                        "price": 560
                    }
                ]
            });
        });
    });

    describe('GET /courses/:id', () => {

        it('returns one course', async () => {
            const response = await request(app).get('/courses/1').expect(200);

            // assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                "id": 1,
                "name": "Codeigniter 4",
                "category": "Back-End",
                "price": 420
            });
        });
    });
});