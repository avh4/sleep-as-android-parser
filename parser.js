var moment = require('moment');

function startsWith(source, needle) {
  return source.slice(0, needle.length) == needle;
}

function splitLine(line) {
  return line.split(',');
}

function unquote(string) {
  return string.slice(1, -1);
}

function detag(string) {
  return string.slice(1);
}

module.exports = function(line1, line2, line3) {
  if (!startsWith(line1, 'Id,Tz,From,To,Sched,Hours,Rating,Comment,Framerate,Snore,Noise,Cycles,DeepSleep,LenAdjust,Geo')) {
    throw new Error('invalid file');
  }

  var tokens1 = splitLine(line1);
  var tokens2 = splitLine(line2);

  var result = { events: [] };
  result.tags = unquote(tokens2[7]).trim().split(' ').map(detag);
  for (var i = 0; i < tokens1.length; i++) {
    if (tokens1[i] === '"Event"') {
      var d = unquote(tokens2[i]).split('-');
      result.events.push({
        time: moment.utc(parseInt(d[1])).format('YYYY-MM-DDThh:mm:ss.SSS\\Z'),
        event: d[0]
      });
    }
  }
  return result;
};
