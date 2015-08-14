Title: Data granularity and data retention
---
Text:

By default, CA collects and saves data each second for ten minutes.  So if you
create an instrumentation for FS operations, the service will save the
per-second number of FS operations going back for the last ten minutes.  These
parameters are configurable using the following instrumentation properties:

* `granularity`: how frequently to aggregate data, in seconds.  The default is
  one second.  For example, a value of 300 means to aggregate every five
  minutes' worth of data into a single data point.  The smaller this value, the
  more space the raw data takes up.  `granularity` cannot be changed after an
  instrumentation is created.
* `retention-time`: how long, in seconds, to keep each data point.  The default
  is 600 seconds (ten minutes).  The higher this value, the more space the raw
  data takes up.  `retention-time` can be changed after an instrumentation is
  created.

These values affect the space used by the instrumentation's data.  For example,
all things being equal, the following all store the same amount of data:

* 10 minutes' worth of per-second data (600 data points)
* 50 minutes' worth of per-5-second data
* 25 days' worth of per-hour data
* 600 days' worth of per-day data

The system imposes limits on these properties so that each instrumentation's
data cannot consume too much space.  The limits are expressed internally as a
number of data points, so you can adjust granularity and retention-time to match
your needs.  Typically, you'll be interested in either per-second data for live
performance analysis, or an array of different granularities and retention-times
for historical usage patterns.


