import db from '../index.js';
/* const User = db.model('user');
const Message = db.model('message'); */
import app from '../../../index.js';

import fsMisc from 'fs-misc';
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
import supertest from 'supertest';
import sinon from 'sinon';

describe('▒▒▒ Reviews Tests ▒▒▒', () => {

    describe('HTTP Server', () => {

        let agent;
        beforeEach('Set up agent for testing', () => {
            agent = supertest(app);
        });

        describe('api routes', () => {

            describe('reviews', () => {

                it('serves up all reviews on request to GET /', () => {
                    return agent
                        .get('/reviews')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('object');
                        });
                });

            });

            describe('creates a new review with the appropriate associations', () => {
                
                it('', () => {
                    return agent
                    .post('/reviews')
                    .send({rating: 5, message: 'what a great product!', userId: 1, productId: 1})
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('object');
                    });
                })
            })

        });

    });

});
