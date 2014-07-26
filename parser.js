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
  var baseTime = moment(unquote(tokens2[2]), 'DD. MM. YYYY h:mm');

  var result = { events: [], data: [] };
  result.tags = unquote(tokens2[7]).trim().split(' ').map(detag);
  for (var i = 0; i < tokens1.length; i++) {
    if (tokens1[i] === '"Event"') {
      var d = unquote(tokens2[i]).split('-');
      result.events.push({
        time: moment.utc(parseInt(d[1])).format('YYYY-MM-DDThh:mm:ss.SSS\\Z'),
        event: d[0]
      });
    } else if (tokens1[i].match(/"\d:\d\d"/)) {
      var d = unquote(tokens1[i]).split(':');
      var time = baseTime.clone();
      time.hour(d[0]);
      time.minute(d[1]);
      result.data.push({
        time: time.format('YYYY-MM-DDThh:mmZZ'),
        movement: parseFloat(unquote(tokens2[i]))
      });
    }
  }
  return result;
};
