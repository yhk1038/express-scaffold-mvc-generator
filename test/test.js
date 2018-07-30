'use strict';

var expect = require('chai').expect;

describe('#Module', function() {
  it('should be live', function() {
    require('../scaffold');
    expect(true).to.equal(true);
  });
});
