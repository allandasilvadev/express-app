const request = require('supertest');
const app = require('../../config/express')();
const Course = app.models.curso;

const Utils = require('../utils/db');
const mongoose = require('mongoose');
const { MongoMemoryReplSet } = require('mongodb-memory-server');

describe('Routes: index', () => {

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
            expect(response.text).toMatch(/R\$\s*420,00/);

            expect(response.text).toContain('Laravel 5');
            expect(response.text).toMatch(/R\$\s*270,00/);
        });

    });


    describe('GET /not-found', () => {
        it('status 404', async () => {
            const response = await request(app).get('/not-found');

            // assert
            expect(response.status).toBe(404);

            expect(response.text).toContain('Page not found');

        });
    });
});