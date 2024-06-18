const request = require('supertest');
const app = require('../../config/express')();
const Course = app.models.curso;

const Utils = require('../utils/db');
const mongoose = require('mongoose');

describe('Routes: courses', () => {

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

    describe('GET: /courses', () => {

        it('status 200', async () => {
            const response = await request(app).get('/courses').expect(200);

            // assert
            expect(response.status).toBe(200);
        });

        it('returns a list of courses', async () => {
            const response = await request(app).get('/courses').expect(200);

            // assert
            expect( Object.keys(response.body['courses']).length ).toEqual(2);

            expect(response.body).toEqual({
                courses: [
                  { name: 'Laravel 5', category: 'Back-End', price: 270 },
                  { name: 'Codeigniter 4', category: 'Back-End', price: 420 }
                ]
              }
          );
        });
    });

    describe('GET /courses/:id', () => {

        it('returns one course', async () => {
            const mock_courses = await Course.find().exec();

            const response = await request(app).get(`/courses/${mock_courses[1]._id}`).expect(200);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                course: {
                  _id: mock_courses[1]._id.toString(),
                  name: 'Codeigniter 4',
                  category: 'Back-End',
                  price: 420
                }
              }
          );
        });


        it('not found course', async () => {
            const course_id = new mongoose.Types.ObjectId('671dc7cd7b5e210f2f5b4caa');

            const response = await request(app).get(`/courses/${course_id}`).expect(404);

            expect(response.status).toBe(404);
            expect(response.body).toEqual({});
        });
    });
});