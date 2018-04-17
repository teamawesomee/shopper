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
const {User, Product} = require('../server/db/models')

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
        'https://www.organicpavilion.com/products/puppy-potion-fresh-shampoo-500ml'}),
    Product.create({
      title:
        'Your family tree must be a cactus ‘cause you’re all a bunch of pricks.',
      description:
        'Use this sassy comeback for temporary relief from prickery!',
      price: 3.33,
      inventoryQuantity: 40,
      category: ['Sass', 'Happiness'],
      img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'})
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
        'https://www.organicpavilion.com/products/puppy-potion-fresh-shampoo-500ml'}),
    Product.create({
      title:
        'Your family tree must be a cactus ‘cause you’re all a bunch of pricks.',
      description:
        'Use this sassy comeback for temporary relief from prickery!',
      price: 3.33,
      inventoryQuantity: 40,
      category: ['Sass', 'Happiness'],
      img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`);
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
