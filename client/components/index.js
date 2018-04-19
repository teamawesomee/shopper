/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as EditProduct} from './products/EditProduct'
export {Login, Signup} from './auth-form'
export { default as ProductList } from './products/ProductList.jsx';
export { default as ProductPage } from './products/ProductPage.jsx';
export { default as AdminProductPage } from './products/AdminPages/AdminProductPage.jsx'
export { default as OrderList } from './Orders/OrderList.jsx';

