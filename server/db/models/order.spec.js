const { expect } = require('chai')
const db = require('../index');
const Order = db.model('order');
const User = db.model('user');
const Product = db.model('product');
const LineItem = db.model('LineItem');

describe('Order model', () => {
  let myOrder;
  before(() => {
    return db.sync({force: true})
  })
  let submittedOrder = {
    userId: 9,
    products: [1, 2, 3, 4, 5, 6, 7],
    address: '180 something drive',
    email: 'anybody@something.com',
    total: 375
  }


  beforeEach(() => {
    Order.addNewOrder(submittedOrder)
  }


    // Wowzers! We can even `await` on the right-hand side of the assignment operator
    // and store the result that the promise resolves to in a variable! This is nice!
    // console.log(`seeded ${users.length} users`)
    // console.log(`seeded ${products.length} products`);
    // console.log(`seeded successfully`)


  describe('attributes', () => {


    it('includes `address` and `email` fields', () => {
      return myOrder.save()
      .then((savedOrder) => {
        expect(savedOrder.email).to.equal('anybody@something.com');
        expect(savedOrder.address).to.equal('180 something drive');
      })
    }) // end of includes address and email fields

    it('is associated with a user', () => {
      return myOrder.save()
      .then((savedOrder) => {
        expect(savedOrder.userId).to.equal(9)
      })
    })

    it('is associated with products through a join table called LineItems', () => {
      expect(db.model('LineItem')).to.exist;
      expect(LineItem.findOne({
        where: {
          productId: 7
        }
      })).to.exist;
      expect(LineItem.findOne({
        where: {
          productId: 7
        }
      })).to.include({orderId: myOrder.id})
    }) //end associations test

  }) //end attributes describe block
})



