// /* global describe beforeEach it */

// const { expect } = require("chai");
// const request = require("supertest");
// const db = require("../db");
// const app = require("../index");
// const User = db.model("product");

// describe("Product routes", () => {
//   beforeEach(() => {
//     return db.sync({ force: true });
//   });

//   describe("/api/products/", () => {
//     const codysEmail = "cody@puppybook.com";

//     beforeEach(() => {
//       return Product.create({
//         email: codysEmail
//       });
//     });

//     xit("GET /api/products", () => {
//       return request(app)
//         .get("/api/users")
//         .expect(200)
//         .then(res => {
//           expect(res.body).to.be.an("array");
//           expect(res.body[0].email).to.be.equal(codysEmail);
//         });
//     });
//   }); // end describe('/api/users')
// }); // end describe('User routes')
