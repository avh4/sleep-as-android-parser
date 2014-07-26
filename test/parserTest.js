var subject = require('../parser');
var sinon = require('sinon');
var assert = require('assert');

var line1 = 'Id,Tz,From,To,Sched,Hours,Rating,Comment,Framerate,Snore,Noise,Cycles,DeepSleep,LenAdjust,Geo,"2:40","2:44","2:47","2:50","2:54","2:57","3:00","3:04","3:07","3:10","3:14","3:17","3:20","3:24","3:27","3:30","3:34","3:37","3:40","3:44","3:47","3:50","3:54","3:57","4:00","4:04","4:07","4:10","4:14","4:17","4:20","4:24","4:27","4:30","4:34","4:37","4:40","4:44","4:47","4:50","4:54","4:57","5:00","5:04","5:07","5:10","5:14","5:17","5:21","5:24","5:27","5:31","5:34","5:37","5:41","5:44","5:47","5:51","5:54","5:57","6:01","6:04","6:07","6:11","6:14","6:17","6:21","6:24","6:27","6:31","6:34","6:37","6:41","6:44","6:47","6:51","6:54","6:57","7:01","7:04","7:07","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event"';
var line2 = '"1406367447010","America/Los_Angeles","26. 07. 2014 2:37","26. 07. 2014 7:07","07. 08. 2014 3:17","4.510","3.5"," #home #early ","10000","0","0.2737098","5","0.8148148","0","","1.7019926","0.29956794","0.27947846","0.2592457","0.29145876","0.26944992","0.27359548","0.29962385","0.3029902","0.2856252","0.31056795","0.26258627","0.27254656","0.2828097","0.30299032","0.2669466","0.3073135","0.31468654","0.25924557","0.39228058","0.39228064","0.2789349","0.27893493","0.27010056","0.31051558","0.31051645","0.8598852","0.86054164","0.6504931","0.6533142","2.29201","2.0996964","0.5540514","0.26944995","0.30299","0.29145876","0.2625861","0.30731282","0.307313","0.3073132","0.36041322","0.4259029","0.28562468","0.25534377","0.29956827","0.2553437","0.28280938","0.28280944","0.30731285","0.30731305","0.28280932","0.42253086","0.29956818","0.2735957","0.28280962","0.29501337","0.2914592","0.3199313","0.29956815","0.35628584","0.34401515","0.5038168","0.28562492","0.3029904","0.6708068","0.3177428","0.3294771","0.3359201","0.2828101","0.28781503","0.30731326","0.35098282","0.35758412","0.38216153","0.28280964","0.29145914","0.3249409","0.35517806","0.363077","0.32027382","1.7145246","LIGHT_START-1406367447010","LIGHT_END-1406367647276","DEEP_START-1406367647276","REM_START-1406371453926","REM_END-1406372653926","LIGHT_START-1406372653926","DEEP_END-1406372653926","LIGHT_END-1406374055788","DEEP_START-1406374055788","LIGHT_START-1406375657916","DEEP_END-1406375657916","LIGHT_END-1406375858182","DEEP_START-1406375858182","LIGHT_START-1406377660576","DEEP_END-1406377660576","LIGHT_END-1406377860842","DEEP_START-1406377860842","LIGHT_START-1406379663236","DEEP_END-1406379663236","LIGHT_END-1406380464300","DEEP_START-1406380464300","REM_START-1406382468563","TRACKING_STOPPED_BY_USER-1406383668515","REM_END-1406383668563","DEEP_END-1406383668563"';
var line3 = ',,,,,,,,,,,,,"20643.813","20733.506","4314.405","446.9163","425.9386","443.99234","557.84314","554.77057","4259.033","4278.44","885.9585","639.7414","660.9701","2118.4678","2312.229","2313.6267","2319.1794","2319.0525","2309.7002","2309.448","2392.7588","2373.205","2373.003","1470.6777","472.65518","483.45752","1675.9434","536.37463","803.35986","811.39795","5680.9004","5682.2495","1789.5466","4607.03","4606.9053","29770.81","29773.521","27592.824","566.9559","381.41763","393.43604","402.29706","323.94064","335.87048","454.12872","465.91785","379.78726","407.48013","388.34134","451.84985","386.01178","526.6788","608.9271","388.156","427.59433","380.87344","367.50653","451.73172","420.1178","587.3663","816.9205","14983.483","14983.402","16493.697","16493.693","16324.945","16324.878","16642.494","16803.664","16803.684","16858.477","16858.465","16925.238","16925.234","23966.395","20642.33","20643.129","20642.477","20642.457","20641.99","20641.98","20642.025","20641.953","20641.957","20642.693","20642.742","20642.043","20642.033","20642.033","20641.955","20642.059","20662.545","20662.545","26007.271"';

describe('parser', function() {
  it('should validate the file format', function() {
    assert.throws(function() {
      subject('BAD');
    }, /invalid file/);
  });

  describe('with valid data', function() {
    var result;

    beforeEach(function() {
      result = subject(line1, line2, line3);
    });

    it('parses the tags', function() {
      assert.deepEqual(result.tags, ['home', 'early']);
    });
  });
});