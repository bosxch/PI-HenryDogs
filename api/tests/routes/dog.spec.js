/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Raza, conn } = require('../../src/db.js');
const request = require('supertest');

const agent = session(app);


describe('Dogs routes', () => {
  it('should return status 200 to get dogs', async () => {
    const res = await request(app).get('/dogs');
    expect(res.statusCode).to.be.equal(200);
    done=Function
   done()
  });

})
