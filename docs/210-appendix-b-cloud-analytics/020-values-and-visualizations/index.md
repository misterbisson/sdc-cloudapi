Title: Values and visualizations
---
Text:


We showed above how fields can be used to decompose results.  Let's look at that
in more detail.  We'll continue using the "FS Operations" metric with
fields "optype".

### Scalar values

Suppose we create an instrumentation with no filter and no decomposition.  Then
the value of the instrumentation for a particular time interval might look
something like this:

    {
      start_time: 1308789361,
      duration: 1,
      value: 573
      ...
    }

In this case, `start_time` denotes the start of the time interval in Unix time,
`duration` denotes the length of the interval in seconds, and `value` denotes
the actual value.  This means that 573 FS operations completed on all
systems for a user in the cloud between times 1308789361 and 1308789362.

### Discrete decompositions

Now suppose we create a new instrumentation with a decomposition by `execname`.
Then the raw value might look something like this:

    {
      start_time: 1308789361,
      duration: 1,
      value: {
        ls: 1,
        cat: 49,
        ...
      }
      ...
    }

We call the decomposition by `execname` a **discrete decomposition** because the
possible values of execname ("ls", "cat", ...) are not numbers.

### Numeric decompositions

It's useful to decompose some metrics by numeric fields.  For example, you might
want to view FS operations decomposed by latency (how long the operation
took).  The result is a statistical *distribution*, which groups nearby
latencies into buckets and shows the number of disk I/O operations that fell
into each bucket. The result looks like this:

    {
      "start_time": 1308863061,
      "duration": 1,
      "value": [
        [ [ 53000, 53999 ], 4 ],
        [ [ 54000, 54999 ], 4 ],
        [ [ 55000, 55999 ], 7 ],
        ...
        [ [ 810000, 819999 ], 1 ]
      ]
    }

That data indicates that at time 1308863061, the system completed:

* 4 requests with latency between 53 and 54 microseconds,
* 4 requests with latency between 54 and 55 microseconds,
* 7 requests between 55 and 56 microseconds, and so on, and finally
* 1 request with latency between 810 and 820 microseconds.

This type of instrumentation is called a **numeric decomposition**.

### Combining decompositions

It's possible to combine a single discrete and numeric decomposition to produce
an object mapping discrete key to numeric distribution, whose value looks like
this:

    {
      "start_time": 1308863799,
      "duration": 1,
      "value": {
        "ls": [
          [ [ 110000, 119999 ], 1 ],
          [ [ 120000, 129999 ], 1 ],
          ...
          [ [ 420000, 429999 ], 1 ],
          [ [ 25000000, 25999999 ], 1 ]
        ]
      }
    }

As we will see, this data allows clients to visualize the distribution of I/O
latency, and then highlight individual programs in the distribution (or whatever
field you broke it down along).

### Value-related properties

We can now explain several of the instrumentation properties shown previously:

* `value-dimension`: the number of dimensions in returned values, which is
  the number of decompositions specified in the instrumentation, plus 1.
  Instrumentations with no decompositions have dimension 1 (scalar values).
  Instrumentations with a single discrete or numeric decomposition have value 2
  (vector values).  Instrumentations with both a discrete and numeric
  decomposition have value 3 (vector of vectors).
* `value-arity`: describes the format of individual values
    * `scalar`: the value is a scalar value (a number)
    * `discrete-decomposition`: the value is an object mapping discrete keys to
      scalars
    * `numeric-decomposition`: the value is either an object (really an array of
      arrays) mapping buckets (numeric ranges) to scalars, or an object mapping
      discrete keys to such an object.  That is, a numeric decomposition is one
      which contains at the leaf a distribution of numbers.

The arity serves as a hint to visualization clients: scalars are typically
rendered as line or bar graphs, discrete decompositions are rendered as stacked
or separate line or bar graphs, and numeric decompositions are rendered as
heatmaps.

### Predicate Syntax

Predicates allow you to filter out data points based on the *fields* of a
metric.  For example, instead of looking at FS operations for your whole
cloud, you may only care about operations with latency over 100ms, or on a
particular machine.

Predicates are represented as JSON objects using an LISP-like syntax.  The
primary goal for predicate syntax is to be very easy to construct and parse
automatically, making it easier for people to build tools to work with them.

The following leaf predicates are available:

`{ eq: [ fieldname, value ] }`: equality (string or number, as appropriate).
`{ ne: [ fieldname, value ] }`: inequality (string or number, as appropriate).
`{ le: [ fieldname, value ] }`: less than or equal to (numbers only).
`{ lt: [ fieldname, value ] }`: less than (numbers only).
`{ ge: [ fieldname, value ] }`: greater than or equal to (numbers only).
`{ gt: [ fieldname, value ] }`: greater than (numbers only).

Additionally, the following compound predicates are available:

`{ and: [ predicate, ... ] }`: all of subpredicates must be true.
`{ or: [ predicate, ... ] }`: at least one of subpredicates must be true.

All of these can be combined to form complex filters for drilling down.  For
example, this predicate:

    {
      and: {
        { eq: [ "execname", "mysqld" ] }
        { gt: [ "latency", 100000000 ] },
        { or: [
          { eq: [ "hostname", "host1" ] },
          { eq: [ "hostname", "host2" ] },
          { eq: [ "hostname", "host3" ] }
        ] },
      }
    }

This predicate could be used with the "logical filesystem operations" metric to
identify file operations performed by MySQL on machines "host1", "host2", or
"host3" that took longer than 100ms.

### Heatmaps

Up to this point we have been showing **raw values**, which are JSON
representations of the data exactly as gathered by Cloud Analytics. However, the
service may provide other representations of the same data.  For numeric
decompositions, the service provides several **heatmap** resources that generate
heatmaps, like this one:

<img src="media/img/heatmap.png" />

Like raw values, heatmap values are returned using JSON, but instead of
specifying a `value` property, they specify an `image` property whose contents
are a base64-encoded PNG image.  For details, see the API reference.  Using the
API, it's possible to specify the size of the image, the colors used, which
values of the discrete decomposition to select, and many other properties
controlling the final result.

Heatmaps also provide a resource for getting the details of a particular heatmap
bucket, which looks like this:

    {
      "start_time": 1308865184,
      "duration": 60,
      "nbuckets": 100,
      "width": 600,
      "height": 300,
      "bucket_time": 1308865185,
      "bucket_ymin": 10000,
      "bucket_ymax": 19999,
      "present": {
        "ls": 5,
        "cat": 57
      },
      "total": 1,
    }

This example indicates the following about the particular heatmap bucket we
clicked on:

* the time represented by the bucket is 1308865185
* the bucket covers a latency range between 10 and 20 microseconds
* at that time and latency range, program `ls` completed 5 operations and
  program `cat` completed 57 operations.

This level of detail is critical for understanding hot spots or other patterns
in the heatmap.

