const { expect } = require('chai')
const db = require('../index');
const Order = db.model('order');
const User = db.model('user');
const Product = db.model('product');

describe('Order model', () => {
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



  let myOrder;
  beforeEach(() => {
    myOrder = Order.build({
      address: submittedOrder.address,
      email: submittedOrder.email
    })
    myOrder.addUser(User.findById({
      where: {
        id: submittedOrder.userId,
      }
    }));
    const prods = submittedOrder.products
    prods.forEach((productId) => {
      myOrder.addProducts(Product.findById({
        where: {
          id: productId
        }
      }))
    })

  }) // end of myOrder.build
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
      expect(db.model('lineItems')).to.exist
    })
    })
  })



})

