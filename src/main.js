var argv = require('minimist')(process.argv.slice(2), { boolean: ['csv-data', 'csv-events'] });

function showUsage() {
  console.log('Usage: main.js [--csv-data|--csv-events] <sleep-export.csv>');
}

if (argv._.length != 1) {
  showUsage();
} else {
  var chunker = require('./chunker');
  var parser = require('./parser');

  var output;

  if (argv['csv-data']) {
    output = require('./output/csv-data');
  } else if (argv['csv-events']) {
    output = require('./output/csv-events');
  } else {
    output = require('./output/default')
  }

  output.header();
  chunker(argv._[0], function() {
    var result = parser.apply(null, arguments);
    output.record(result);
  });
}
