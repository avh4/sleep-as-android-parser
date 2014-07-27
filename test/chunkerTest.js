var subject = require('../src/chunker');
var sinon = require('sinon');

describe('chunker', function() {
  it('should process the file in groups of 3 lines', function() {
    var process = sinon.spy();
    return subject('./test/chunkerTest.csv', process).then(function() {
      sinon.assert.callCount(process, 3);
      sinon.assert.calledWith(process, 'Id,LINE 1', 'LINE 2', 'LINE 3');
      sinon.assert.calledWith(process, 'Id,LINE 4', 'LINE 5');
      sinon.assert.calledWith(process, 'Id,LINE 6', 'LINE 7', 'LINE 8');
    });
  });
});