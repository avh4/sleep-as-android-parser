var subject = require('../chunker');
var sinon = require('sinon');

describe('chunker', function() {
  it('should process the file in groups of 3 lines', function() {
    var process = sinon.spy();
    return subject('./test/chunkerTest.csv', process).then(function() {
      sinon.assert.calledTwice(process);
      sinon.assert.calledWith(process, 'LINE 1', 'LINE 2', 'LINE 3');
      sinon.assert.calledWith(process, 'LINE 4', 'LINE 5', 'LINE 6');
    });
  });
});