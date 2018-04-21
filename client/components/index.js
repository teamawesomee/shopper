/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as UserHome} from './UserHome'
export {default as EditProduct} from './Products/EditProduct'
export {default as AddProduct} from './Products/AddProduct'
export {Login, Signup} from './AuthForm'
export { default as ProductList } from './Products/ProductList.jsx';
export { default as ProductPage } from './Products/ProductPage.jsx';
export { default as AdminProductPage } from './Products/AdminPages/AdminProductPage.jsx'
export { default as OrderList } from './Orders/OrderList.jsx';
export { default as CartDetails } from './Cart/CartDetails.jsx';
export { default as CartIcon } from './Cart/CartIcon.jsx';

