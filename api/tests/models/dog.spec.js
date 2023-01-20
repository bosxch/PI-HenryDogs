const { Raza, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Raza.sync({ force: true }));
    describe('name', () => {
     
      it('should work when its a valid name', () => {
        Raza.create({ name: 'Pug' });
      });
    });
  });
});
