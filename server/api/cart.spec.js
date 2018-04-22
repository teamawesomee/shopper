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
  let agent;
  let myUser;
  let mySession, productOne, productTwo, productThree, productFour, productFive, productSix, authenticatedUser
  let userOne, userTwo, userThree, userFour, userFive, userSix
  beforeEach(() => {
    return db.sync({ force: true });
  });
  beforeEach('Seed products', () => {


    const products = [
      {
        title: 'Happiness Potion',
        description: 'Use this potion for eternal happiness!',
        price: 1.5,
        inventoryQuantity: 27,
        category: ['Potion', 'Happiness'],
        img: 'http://soappotions.com/wp-content/uploads/2017/10/round.jpg'},
      {
        title: 'Puppy Potion',
        description: 'Use this potion for eternal puppies!',
        price: 5.75,
        inventoryQuantity: 15,
        category: ['Potion', 'Love'],
        img:
          'https://tailybuddy.com/products/2669/13680811_1112873898787196_1865386740556005539_n.jpg'},
      {
        title:
          'Your family tree must be a cactus ‘cause you’re all a bunch of pricks.',
        description:
          'Use this sassy comeback for temporary relief from prickery!',
        price: 3.33,
        inventoryQuantity: 40,
        category: ['Sass', 'Happiness'],
        img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'},
      {
        title:
          'I’d tell you how I really feel, but I wasn’t born with enough middle fingers to express myself in this case.',
        description:
          'Use this sassy comeback for temporary relief from prickery!',
        price: 3.33,
        inventoryQuantity: 40,
        category: ['Sass', 'Happiness'],
        img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'},
      {
        title:
          'I’m trying my absolute hardest to see things from your perspective, but I just can’t get my head that far up my ass.',
        description:
          'Use this sassy comeback for temporary relief from prickery!',
        price: 8.79,
        inventoryQuantity: 40,
        category: ['Sass', 'Happiness'],
        img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'},
      {
        title:
          'You only annoy me when you’re breathing, really.',
        description:
          'Use this sassy comeback when someone just won\'t stop breathing!',
        price: 3.33,
        inventoryQuantity: 40,
        category: ['Sass', 'Happiness'],
        img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'},
      {
        title:
          'Do your hear that? It’s the sound of no one caring.',
        description:
          'Use this sassy comeback for temporary relief from prickery!',
        price: 3.33,
        inventoryQuantity: 40,
        category: ['Sass', 'Happiness'],
        img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'},
      {
        title:
          'You’re about as useful as a screen door on a submarine.',
        description:
          'Use this sassy comeback for temporary relief from prickery!',
        price: 3.33,
        inventoryQuantity: 40,
        category: ['Sass', 'Happiness'],
        img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'},
    ];
    return Product.bulkCreate(products, {returning: true})
      .then(createdProducts => {
          productOne = createdProducts[0]
          productTwo = createdProducts[1]
          productThree = createdProducts[2]
          productFour = createdProducts[3]
          productFive = createdProducts[4]
          productSix = createdProducts[5]
      })
  })

  beforeEach('Seed Users', () => {
    const users = [
      {email: 'cody@email.com', password: '123'},
      {email: 'murphy@email.com', password: '123'},
      {email: 'amy@email.com', password: '123', isAdmin: true},
      {email: 'testAdmin@test.com', password: '123', isAdmin: true},
      {email: 'normalUser@email.com', password: '123'}
    ]

    return User.bulkCreate(users, {returning: true})
      .then(createdUsers => {
        userOne = createdUsers[0];
        userTwo = createdUsers[1];
        userThree = createdUsers[2];
        userFour = createdUsers[3];
        userFive = createdUsers[4];
        userSix = createdUsers[5];
      })
  })





  describe('HTTP server', () => {


    before('Set up agent for testing', function(done){
      agent = supertest(app);
      authenticatedUser = request.agent(app)
      authenticatedUser
        .post('/login')
        .send(myUser)
        .end(function(err, response){
          expect(response.statusCode).to.equal(200);
          expect('Location', 'user/home');
          done();
        });
    });
    describe('products accurately seeded', () => {
      it('productOne should be an object', () => {
        expect(productOne).to.be.an('object');
      })
      it('should have a title of "Happiness Potion"', () => {
        expect(productOne.title).to.be.equal('Happiness Potion');
      })
    })


    describe('add product to cart', () => {
      it('successfully adds a product to that user\'s cart', () => {
        return authenticatedUser.post('/api/cart')
          .send(productOne)
          .expect(200)
          .then(res => {
            const cartItem = res.body[0][0].dataValues;
            console.log("I am in the first 'then")
            return cartItem
          })
          .then(foundItem => {
            expect(foundItem.title)
            .to.be.equal(productOne.title)
          })


      })
    })




  })
})
