/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Product, Order, LineItem} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'amy@email.com', password: '123', isAdmin: true}),
    User.create({email: 'testAdmin@test.com', password: '123', isAdmin: true}),
    User.create({email: 'normalUser@email.com', password: '123'})
  ])

 const products = await Promise.all([
    Product.create({
      title: 'Happiness Potion',
      description: 'Use this potion for eternal happiness!',
      price: 1.5,
      inventoryQuantity: 27,
      category: ['Potion', 'Happiness'],
      img: 'http://soappotions.com/wp-content/uploads/2017/10/round.jpg'}),
    Product.create({
      title: 'Puppy Potion',
      description: 'Use this potion for eternal puppies!',
      price: 5.75,
      inventoryQuantity: 15,
      category: ['Potion', 'Love'],
      img:
        'https://tailybuddy.com/products/2669/13680811_1112873898787196_1865386740556005539_n.jpg'}),
    Product.create({
      title:
        'Your family tree must be a cactus ‘cause you’re all a bunch of pricks.',
      description:
        'Use this sassy comeback for temporary relief from prickery!',
      price: 3.33,
      inventoryQuantity: 40,
      category: ['Sass', 'Happiness'],
      img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'}),
    Product.create({
      title:
        'I’d tell you how I really feel, but I wasn’t born with enough middle fingers to express myself in this case.',
      description:
        `Use this sassy comeback when there aren't enough fingers in the world!`,
      price: 3.33,
      inventoryQuantity: 40,
      category: ['Sass', 'Happiness'],
      img: 'https://data.whicdn.com/images/170393266/large.jpg'}),
    Product.create({
      title:
        'I’m trying my absolute hardest to see things from your perspective, but I just can’t get my head that far up my ass.',
      description:
        'Use this sassy comeback for temporary relief from ass-heads!',
      price: 8.79,
      inventoryQuantity: 40,
      category: ['Sass', 'Happiness'],
      img: 'https://download.manycam.com/effects/get?f=l&i=2640&v=2.0'}),
    Product.create({
      title:
        'You only annoy me when you’re breathing, really.',
      description:
        'Use this sassy comeback when someone just won\'t stop breathing!',
      price: 3.33,
      inventoryQuantity: 40,
      category: ['Sass', 'Happiness'],
      img: 'http://www.relatably.com/m/img/sassy-cat-memes/64911318.jpg'}),
    Product.create({
      title:
        'Do your hear that? It’s the sound of no one caring.',
      description:
        'Use this sassy comeback in lieu of caring!',
      price: 3.33,
      inventoryQuantity: 40,
      category: ['Sass', 'Happiness'],
      img: 'http://hopeandjoynetwork.weebly.com/uploads/4/3/3/4/4334057/wearing-sassy-pants_orig.jpg'}),
    Product.create({
      title:
        'You’re about as useful as a screen door on a submarine.',
      description:
        'Use this sassy comeback when dealing with persistant irrelevance!',
      price: 3.33,
      inventoryQuantity: 40,
      category: ['Sass', 'Happiness'],
      img: 'http://www.lovethispic.com/uploaded_images/206054-Sassy-Starfish.jpg'}),
  ])

  const orders = await Promise.all([
    Order.create({
      address: '123 Test Ave',
      email: 'cody@email.com',
      phone: 5555555,
      orderStatus: 'Pending',
      adminInCharge: 3,
    }),
    Order.create({
      address: '123 Order Ave',
      email: 'murphy@email.com',
      phone: 5555555,
      orderStatus: 'In Transit',
      adminInCharge: 3,
      }),
    Order.create({
     address: '123 Fancy Ave',
      email: 'amy@email.com',
      phone: 5555555,
      orderStatus: 'Completed',
      adminInCharge: 3,
    }),
  ])

  const lineItems = await Promise.all([
    LineItem.create({quantity: 2, productId: 1, orderId: 1}),
    LineItem.create({quantity: 1, productId: 2, orderId: 3}),
    LineItem.create({quantity: 3, productId: 3, orderId: 1}),
    LineItem.create({quantity: 1, productId: 4, orderId: 2})
  ])


  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded ${lineItems.length} lineItems`);
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
