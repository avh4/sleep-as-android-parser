This is a script to parse and simplify the data exported by the [Sleep as Android](https://play.google.com/store/apps/details?id=com.urbandroid.sleep&hl=en) sleep tracker app.  See the [documentation](https://sites.google.com/site/sleepasandroid/doc/backup) on how to export your data in the `sleep-export.csv` format for use with this script.

### Movement data

```
node main.js --csv-data sleep-export.csv
```

Example output:
```csv
Timestamp,Movement
2014-07-26T02:40-0700,1.7019926
2014-07-26T02:44-0700,0.29956794
2014-07-26T02:47-0700,0.27947846
2014-07-26T02:50-0700,0.2592457
```

### Events

```bash
node main.js --csv-events sleep-export.csv
```

Example output:
```csv
Timestamp,Event
2014-07-26T09:37:27.010Z,LIGHT_START
2014-07-26T09:40:47.276Z,LIGHT_END
2014-07-26T09:40:47.276Z,DEEP_START
2014-07-26T10:44:13.926Z,REM_START
```

