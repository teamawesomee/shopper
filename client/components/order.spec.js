/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrderList from './Orders/OrderList';
import OrderBox from './Orders/OrderBox';


const adapter = new Adapter();
enzyme.configure({ adapter });

// describe('OrderList', () => {
//   let orderList;

//   beforeEach(() => {
//     orderList = shallow(<OrderList orders={[{
//       address: '123 Test St',
//       email: 'test1@gmail.com'
//     }, {
//       address: '123 Order St',
//       email: 'test2@gmail.com'
//     },{
//       address: '123 Product St',
//       email: 'test3@gmail.com'
//     }]} />);
//   });

//   it('renders the email in an h3', () => {
//     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com');
//   });
// });

describe('OrderBox', () => {
  let orderBox;

  beforeEach(() => {
    orderBox = shallow(<OrderBox order={{ id: '1', address: '123 Test St', email: 'test1@gmail.com', products: [{ id: '1', title: 'product1', price: '1.25', img: 'placeholder' }, { id: '2', title: 'product2', price: '2.50', img: 'placeholder2' }] }} />);
  });

  it('renders the order info correctly', () => {
    expect(orderBox.find('.id').text()).to.be.equal('Order Id: 1');
    expect(orderBox.find('.address').text()).to.be.equal('Address: 123 Test St');
    expect(orderBox.find('.email').text()).to.be.equal('Email: test1@gmail.com');
  });
  //add test about products
});
