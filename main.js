var argv = require('minimist')(process.argv.slice(2));

function showUsage() {
  console.log('Usage: main.js <sleep-export.csv>');
}

if (argv._.length != 1) {
  showUsage();
} else {
  var chunker = require('./chunker');
  var parser = require('./parser');

  chunker(argv._[0], function() {
    var result = parser.apply(null, arguments);
    console.log(result);
  });
}
