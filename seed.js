var Promise = require('bluebird');
var { db, Product } = require('./server/db/models');

var data = {
  product: [
    {
      title: 'Happiness Potion',
      description: 'Use this potion for eternal happiness!',
      price: 1.5,
      inventoryQuantity: 27,
      category: ['Potion', 'Happiness'],
      img: 'http://soappotions.com/wp-content/uploads/2017/10/round.jpg'
    },
    {
      title: 'Puppy Potion',
      description: 'Use this potion for eternal puppies!',
      price: 5.75,
      inventoryQuantity: 15,
      category: ['Potion', 'Love'],
      img:
        'https://www.organicpavilion.com/products/puppy-potion-fresh-shampoo-500ml'
    },
    {
      title:
        'Your family tree must be a cactus ‘cause you’re all a bunch of pricks.',
      description:
        'Use this sassy comeback for temporary relief from prickery!',
      price: 3.33,
      inventoryQuantity: 40,
      category: ['Sass', 'Happiness'],
      img: 'https://i.pinimg.com/originals/03/5e/af/035eafc66394f26c94f2ef56095f90f9.jpg'
    }
  ]
};

db
  .sync({ force: true })
  .then(function() {
    console.log('Dropped old data, now inserting data');
    return Promise.map(Object.keys(data), function(name) {
      return Promise.map(data[name], function(item) {
        return db.model(name).create(item);
      });
    });
  })
  .then(function() {
    console.log('Finished inserting data');
  })
  .catch(function(err) {
    console.error('There was totally a problem', err, err.stack);
  })
  .finally(function() {
    db.close(); // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
    console.log('connection closed'); // the connection eventually closes, we just manually do so to end the process quickly
    return null; // silences bluebird warning about using non-returned promises inside of handlers.
  });
