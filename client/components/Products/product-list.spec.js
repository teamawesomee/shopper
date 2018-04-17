import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ProductList } from './ProductList.jsx'
import { ProductBox } from './ProductBox.jsx';

const adapter = new Adapter()
enzyme.configure({adapter})

//product Box tests

describe('ProductBox', () => {
  let productBox

  beforeEach(() => {
    productBox = render(<ProductBox name={'A Rock'} quantity={3} description={'Between a rock and a'} price={3.99} />)
  })

  it('renders a div with a class of product', () => {
    expect(productBox.find('div').className()).to.be.equal('product')
  });
  it('renders the information from the product within the div', () => {
    expect(productList.find('h3').text())
    .to.be.equal('A Rock')
  })
})
