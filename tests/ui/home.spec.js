const request = require('supertest');
const app = require('../../config/express')();
const Course = app.models.curso;

const Utils = require('../utils/db');

describe('Routes: index', () => {

    beforeAll(async () => {
        Utils.open_connection();
    });
    
    beforeEach(async () => {
        Utils.clear_database();

        await Course.insertMany([
            { name: 'Laravel 5', category: "Back-End", price: 270},
            { name: 'Codeigniter 4', category: 'Back-End', price: 420}
        ]);
    });

    afterEach(async () => {
        Utils.clear_database();
    });
    
    afterAll(async () => {
        Utils.close_connection();
    });

    describe('GET /', () => {
        afterEach(async () => {
            Utils.clear_database();
        });

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
            expect(response.text).toMatch(/R\$\s*420,00/);

            expect(response.text).toContain('Laravel 5');
            expect(response.text).toMatch(/R\$\s*270,00/);
        });

    });
});