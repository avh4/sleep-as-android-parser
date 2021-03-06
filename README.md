[![Build Status](https://secure.travis-ci.org/avh4/sleep-as-android-parser.svg)](http://travis-ci.org/avh4/sleep-as-android-parser)

This is a script to parse and simplify the data exported by the [Sleep as Android](https://play.google.com/store/apps/details?id=com.urbandroid.sleep&hl=en) sleep tracker app.  See the [documentation](https://sites.google.com/site/sleepasandroid/doc/backup) on how to export your data in the `sleep-export.csv` format for use with this script.

### Movement data

```
node main.js --csv-data sleep-export.csv
```

Example output:
```csv
Timestamp,Movement,Noise
2014-07-26T02:40-0700,1.7019926,4314.405
2014-07-26T02:44-0700,0.29956794,446.9163
2014-07-26T02:47-0700,0.27947846,425.9386
2014-07-26T02:50-0700,0.2592457,443.99234
```

### Events

```bash
node main.js --csv-events sleep-export.csv
```

Example output:
```csv
Timestamp,Event
2014-07-26T02:37:27.010-0700,LIGHT_START
2014-07-26T02:40:47.276-0700,LIGHT_END
2014-07-26T02:40:47.276-0700,DEEP_START
2014-07-26T03:44:13.926-0700,REM_START
```

