// /* global describe beforeEach it */

// const {expect} = require('chai')
// const db = require('../index')
// const User = db.model('user')

// describe('User model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   //Testing the admin models:
//   describe('admin users', () => {
//     let cody
//     let amy

//     beforeEach(() => {
//       return User.create({
//         email: 'cody@puppybook.com',
//         password: 'bones'
//       })
//         .then(user => {
//           cody = user
//         })
//         .then(() => {
//            return User.create({
//             email: 'amy@amy.com',
//             password: 'puppy',
//             isAdmin: true})})
//         .then(user => {
//            amy = user})
//     })

//     it('should not make users admins by default', function (){
//       expect(cody.isAdmin).to.equal(false)
//     })

//     it('should be able to have admin users', () => {
//       expect(amy.isAdmin).to.be.equal(true)
//     })

//   })

//   describe('instanceMethods', () => {
//     describe('correctPassword', () => {
//       let cody

//       beforeEach(() => {
//         return User.create({
//           email: 'cody@puppybook.com',
//           password: 'bones'
//         })
//           .then(user => {
//             cody = user
//           })
//       })

//       it('returns true if the password is correct', () => {
//         expect(cody.correctPassword('bones')).to.be.equal(true)
//       })

//       it('returns false if the password is incorrect', () => {
//         expect(cody.correctPassword('bonez')).to.be.equal(false)
//       })
//     }) // end describe('correctPassword')
//   }) // end describe('instanceMethods')
// }) // end describe('User model')
