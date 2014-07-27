var fs = require('fs');
var byline = require('byline');
var q = require('q');

module.exports = function(filename, process) {
  var p = q.defer();
  var stream = byline(fs.createReadStream(filename, { encoding: 'utf8' }));
  var buffer = [];
  function sendBuffer() {
    if (buffer.length > 0)
      process(buffer[0], buffer[1], buffer[2]);
      buffer = [];
  }
  stream.on('data', function(line) {
    if (line.slice(0, 3) == 'Id,') sendBuffer();
    buffer.push(line);
  });
  stream.on('end', function() {
    sendBuffer();
    p.resolve();
  });
  return p.promise;
};
