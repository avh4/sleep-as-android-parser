function startsWith(source, needle) {
  return source.slice(0, needle.length) == needle;
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

  var result = { };
  result.tags = unquote(line2.split(',')[7]).trim().split(' ').map(detag);
  return result;
};
