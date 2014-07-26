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
    throw new Error('invalid file: ' + line1);
  }

  var tokens1 = splitLine(line1);
  var tokens2 = splitLine(line2);
  var tokens3 = line3 ? splitLine(line3) : [];
  var baseTime = moment(unquote(tokens2[2]), 'DD. MM. YYYY H:mm');
  var lastTime = baseTime.clone();

  var result = { events: [], data: [] };
  result.tags = unquote(tokens2[7]).trim().split(' ').map(detag);
  for (var i = 0; i < tokens1.length; i++) {
    if (tokens1[i] === '"Event"') {
      var d = unquote(tokens2[i]).split('-');
      result.events.push({
        time: moment(parseInt(d[1])).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
        event: d[0]
      });
    } else if (tokens1[i].match(/"\d?\d:\d\d"/)) {
      var d = unquote(tokens1[i]).split(':');
      var time = lastTime.clone();
      time.hour(d[0]);
      time.minute(d[1]);
      if (time.isBefore(lastTime)) {
        time.add('days', 1);
      }
      lastTime = time;
      result.data.push({
        time: time.format('YYYY-MM-DDTHH:mmZZ'),
        movement: parseFloat(unquote(tokens2[i])),
        noise: tokens3[i] ? parseFloat(unquote(tokens3[i])) : undefined
      });
    }
  }
  return result;
};
