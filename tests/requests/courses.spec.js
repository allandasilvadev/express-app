const request = require('supertest');
const app = require('../../config/express')();
const Course = app.models.curso;

const Utils = require('../utils/db');
const mongoose = require('mongoose');
const { MongoMemoryReplSet } = require('mongodb-memory-server');

describe('Routes: courses', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryReplSet.create({
            replSet: { count: 1 }
        });
        
        const uri = mongoServer.getUri();
        
        await mongoose.connect(uri);
    });

    async function clear_database(session) {
        const collections = mongoose.connection.collections;
      
        for( const key in collections ) 
        {
            const collection = collections[key];
            await collection.deleteMany({}, { session });
        }
    }
    
    beforeEach(async () => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await clear_database(session);

            await Course.insertMany([
                { name: 'Laravel 5', category: 'Back-End', price: 270 },
                { name: 'Codeigniter 4', category: 'Back-End', price: 420 }
            ], { session });

            await session.commitTransaction();
        } catch (error) {            
            await session.abortTransaction();
            console.log(`Clear database error: ${error.message}`);
        } finally {
            session.endSession();
        }
    });
    
    afterAll(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
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

    describe('POST /courses', () => {

        it('returns success', async () => {
            const new_course = {
                "name": "PHP 8",
                "category": "Back-End",
                "price": 580
            };

            const response = await request(app).post('/courses').send(new_course).expect(201);
            new_course['_id'] = response.body._id;

            // assert
            expect(response.status).toBe(201);
            expect(response.body).toEqual(new_course);
        });

        it('no send content', async () => {
            const new_course = {};

            const response = await request(app).post('/courses').send({}).expect(400);

            // assert
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                "message": "Required data not provided: 'name', 'category' and 'price' are missing."
            });
        });

    });


    describe('PATCH /courses', () => {
        it('return sucess', async () => {
            // get course from database
            var course = await Course.findOne({}, 'name category price').exec();

            // get id
            var courseId = course._id.toString();

            // patch request
            const response = await request(app)
                                .patch(`/courses/${courseId}`)
                                .send({ name: "Laravel 12", price: 320 });

            // assert
            expect(response.status).toBe(200);

            // remove key from response object
            delete response.body.__v;

            expect(response.body).toEqual({
                "_id": response.body._id,
                "name": "Laravel 12",
                "price": 320,
                "category": course.category
            });

        });

        it('throws error when course not exists', async () => {
            const course_id = new mongoose.Types.ObjectId('671dc7cd7b5e210f2f5b4caa');

            const response = await request(app).patch(`/courses/${course_id}`).expect(404);

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                "message": `Course with id ${course_id} not found.`
            });

        });
    });


    describe('DELETE /courses', () => {
        it('return success', async () => {
            // get course from database
            var course = await Course.findOne({}, 'name category price').exec();

            // get id
            var courseId = course._id.toString();

            // delete request
            const response = await request(app).delete(`/courses/${courseId}`);

            // get all courses
            var courses = await Course.find();

            // assert
            expect(response.status).toBe(200);

            expect(courses.length).toBe(1);

            expect(response.body).toEqual({
                message: "Course deleted with successfully."
            });
        });

        it('throws error when course not exists', async () => {
            const course_id = new mongoose.Types.ObjectId('671dc7cd7b5e210f2f5b4caa');

            const response = await request(app).delete(`/courses/${course_id}`);

            // assert
            expect(response.status).toBe(404);
            expect(response.body).toEqual({
               "message": `Course with id ${course_id} not found.` 
            });
        });
    });
});