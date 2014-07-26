var argv = require('minimist')(process.argv.slice(2), { boolean: ['csv-data', 'csv-events'] });

function showUsage() {
  console.log('Usage: main.js [--csv-data|--csv-events] <sleep-export.csv>');
}

if (argv._.length != 1) {
  showUsage();
} else {
  var chunker = require('./chunker');
  var parser = require('./parser');

  var output = {
    header: function() {},
    record: function(d) {
      console.log(d);
    }
  };

  if (argv['csv-data']) {
    output = {
      header: function() {
        console.log('Timestamp,Movement');
      },
      record: function(d) {
        d.data.forEach(function(d) {
          console.log(d.time + ',' + d.movement);
        });
      }
    };
  }

  if (argv['csv-events']) {
    output = {
      header: function() {
        console.log('Timestamp,Event');
      },
      record: function(d) {
        d.events.forEach(function(d) {
          console.log(d.time + ',' + d.event);
        });
      }
    };
  }

  output.header();
  chunker(argv._[0], function() {
    var result = parser.apply(null, arguments);
    output.record(result);
  });
}
