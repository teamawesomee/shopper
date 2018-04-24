Possible routes

## Users:
  get Users '/api/users/'
  get one user '/api/users/:id'
  get orders by user  '/api/users/:id/orders'
    (including products column)

## Products:
  get products '/api/products/'
  add product  (post) 'api/products'
  get single product '/api/:productId'
  edit product (put) '/api/:productId'
  delete product (delete) '/api/:productId'

## Orders:
  all orders '`/api/orders/'`
      (including products AND user columns, must be admin)
  single order `'/api/orders/:orderId'`
      (including products and user column)
  Get order by user `/api/orders/:userId`
  submit cart to order (post) `'/api/orders/'`
  Update order status (put) `/api/orders/:orderId/updateStatus`
      (for admins only)
      (The three available statuses are 'Pending', 'In Transit', and 'Completed')
  Update order info (put) `/api/orders/:orderId/updateInfo`
      (For the user only, and only if the order has not yet been shipped)


##Cart:

  get user/session's Cart `'/api/cart'`
  add product to cart (post) `'/api/cart/'`
    --returns product
  delete product from cart (delete) `'/api/cart/'`
    -- returns 204 status
  submit cart to orders (which deletes the cart) -- (post) `'/api/orders/'`
