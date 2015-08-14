Title: Building blocks: metrics, instrumentations, and fields
---
Text:

A **metric** is any quantity that can be instrumented using CA.  For examples:

* Disk I/O operations
* Kernel thread executions
* TCP connections established
* MySQL queries
* HTTP server operations
* System load average

Each metric also defines which **fields** are available when data is collected.
These fields can be used to filter or decompose data.  For example, the Disk I/O
operations metric provides the fields "hostname" (for the current server's
hostname) and "disk" (for the name of the disk actually performing an
operation), which allows users to filter out data from a physical server or
break out the number of operations by disk.

You can list the available metrics using the
[DescribeAnalytics](#DescribeAnalytics) API. E.g.:

    {
      "metrics": [
        {
          "module": "fs",
          "stat": "logical_ops",
          "label": "logical filesystem operations",
          "interval": "interval",
          "fields": ["pid","execname",...,"fstype","optype","latency"],
          "unit": "operations"
        }, ...  ], ...
    }

The `module` and `stat` properties together identify a metric.

When you want to actually gather data for a metric, you create an
**instrumentation**.  The instrumentation specifies:

* which metric to collect
* an optional **predicate** based on the metric's fields (e.g. only collect
  data from certain hosts, or data for certain operations)
* an optional **decomposition** based on the metric's fields (e.g. break down
  the results by server hostname)
* how frequently to aggregate data (e.g. every second, every hour, etc.)
* how much data to keep (e.g. 10 minutes' worth, 6 months' worth, etc.)
* other configuration options

Continuing the above example, if the system provides the metric "FS Operations"
with fields "optype" and "latency", an example instrumentation might specify:

* to collect data for the "FS Operations" metric (the *metric*)
* to collect only data for read operations (a *predicate*)
* to break out the results by latency (a *decomposition*)

    $ sdc-createinstrumentation --module=fs --stat=logical_ops --decomposition=latency --predicate='{"eq": ["optype","read"]}'

When we create an instrumentation, the system dynamically instruments the
relevant software and starts gathering data.  The data is made available
immediately in real-time.  To get the data for a particular point in time, you
retrieve the **value** of the instrumentation for that time:

    $ sdc-getinstrumentation --value 4
    {
      "value": [
        [ [ 17000, 17999 ], 12 ],
        [ [ 18000, 18999 ], 12 ],
        ...
      ],
      "transformations": {},
      "start_time": 1309383598,
      "duration": 1,
      "nsources": 1,
      "minreporting": 1,
      "requested_start_time": 1309383598,
      "requested_duration": 1,
      "requested_end_time": 1309383599
    }

To summarize: *metrics* define what data the system is capable of reporting.
*Fields* enhance the raw numbers with additional metadata about each event that
can be used for filtering and decomposition.  *Instrumentations* specify which
metrics to actually collect, what additional information to collect from each
metric, and how to store that data.  When you want to retrieve that data, you
query the service for the *value* of the instrumentation.

