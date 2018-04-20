/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { OrderList } from './OrderList';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('OrderList', () => {
  let orderList;

  beforeEach(() => {
    orderList = shallow(<UserHome email={'cody@email.com'} />);
  });

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com');
  });
});
