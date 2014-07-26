var fs = require('fs');
var byline = require('byline');
var q = require('q');

module.exports = function(filename, process) {
  var p = q.defer();
  var stream = byline(fs.createReadStream(filename, { encoding: 'utf8' }));
  var buffer = [];
  var index = 0;
  stream.on('data', function(line) {
    buffer[index] = line;
    index = (index + 1) % 3;
    if (index == 0) {
      process(buffer[0], buffer[1], buffer[2]);
    }
  });
  stream.on('end', function() {
    p.resolve();
  });
  return p.promise;
};
