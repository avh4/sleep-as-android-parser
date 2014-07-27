module.exports = {
  header: function() {
    console.log('Timestamp,Movement,Noise');
  },
  record: function(d) {
    d.data.forEach(function(d) {
      console.log(d.time + ',' + d.movement + ',' + (d.noise || ''));
    });
  }
};
