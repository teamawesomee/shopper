const { expect } = require("chai");
const chai = require('chai')
const request = require("supertest");
const supertest = require('supertest')
const db = require("../db");
const { User, Product, Cart, SessionCart, Session } = require("../db/models")
const app = require("../index");
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);

describe("Cart routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });






  describe('HTTP server', () => {
    let agent;
    let myUser;
    let mySession, productOne, productTwo, productThree, productFour, productFive, productSix, authenticatedUser



    beforeEach('Set up agent for testing', () => {
      agent = supertest(app);
      authenticatedUser = request.agent(app)
    })

    before(function(done){
      authenticatedUser
        .post('/login')
        .send(myUser)
        .end(function(err, response){
          expect(response.statusCode).to.equal(200);
          expect('Location', 'user/home');
          console.log(err)
          done();
        });
    });

    describe('add product to cart', () => {
      it('successfully adds a product to that user\'s cart', () => {
        return authenticatedUser.post('/api/cart/')
          .send(productOne)
          .expect(201)
          .then(res => {
            const cartItem = res.body;
            return Cart.findById(cartItem.id)
          })
          .then(foundItem => {
            expect(foundItem.title)
            .to.be.equal(productOne.title)
          })


      })
    })




  })
})
