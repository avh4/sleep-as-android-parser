module.exports = {
  header: function() {
    console.log('Timestamp,Event');
  },
  record: function(d) {
    d.events.forEach(function(d) {
      console.log(d.time + ',' + d.event);
    });
  }
};
