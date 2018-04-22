const { expect } = require("chai");
const request = require("supertest");
const db = require("../db");
const app = require("../index");
const Cart = db.model('Cart');
const SessionCart = db.model('SessionCart')
const User = db.model('user')
const Product = db.model('product');
const Session = db.model('session')
import supertest from 'supertest';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);

describe("Cart routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let products = [{title: 'HELLO MY BABY', price: 3.99, description: 'best song', inventoryQuantity: 34, category: 'Song'}, {title: 'HELLO MY HONEY', price: 8.76, description: 'best song', inventoryQuantity: 34, category: 'Song'}, {title: 'HELLO MY RAGTIME GAL', price: 2.27, description: 'best song', inventoryQuantity: 34, category: 'Song'}, {title: 'SEND ME A KISS BY WIRE', price: 9.99, description: 'best song', inventoryQuantity: 34, category: 'Song'}, {title: 'BABY MY HEART\'S ON FIRE', price: 9.99, description: 'best song', inventoryQuantity: 34, category: 'Song'}, {title: 'IF YOU REFUSE ME', price: 20.00, description: 'best song', inventoryQuantity: 34, category: 'Song'}]




  describe('HTTP server', () => {
    let agent;
    let myUser;
    let mySession, productOne, productTwo, productThree, productFour, productFive, productSix

    beforeEach('Set up agent for testing', () => {
      agent = supertest(app);
    })
    beforeEach('seed products', () => {
      return Product.bulkCreate(products, {returning: true})
      .then(createdProducts => {
        productOne = createdProducts[0].id;
        productTwo = createdProducts[1].id;
        productThree = createdProducts[2].id;
        productFour = createdProducts[3].id;
        productFive = createdProducts[4].id;
        productSix = createdProducts[5].id;
      })
    })

    beforeEach('seed users', () => {
      return User.create({email: 'someEmail@email.com', password: '123'})
      .then(user => {
        myUser = user
      })
    })

    beforeEach('seed sessions', () => {
      return Session.create({sessionId: 'gdk356sdfsas'})
      .then(session => {
        mySession = session
      })
    })

    describe('add product to cart', () => {
      xit('successfully adds a product to that user\'s cart', () => {
        myUser.addProduct

      })
    })




  })
})
