Title: Transformations
---
Text:


Transformations are post-processing functions that can be applied to data when
it's retrieved.  You do not need to specify transformations when you create an
instrumentation; you need only specify them when you retrieve the value.
Transformations map values of a discrete decomposition to something else.  For
example, a metric that reports HTTP operations decomposed by IP address supports
a transformation that performs a reverse-DNS lookup on each IP address so that
you can view the results by hostname instead.  Another transformation maps IP
addresses to geolocation data for displaying incoming requests on a world map.

Each supported transformation has a name, like "reversedns".  When a
transformation is requested for a value, the returned value includes a
`transformations` object with keys corresponding to each transformation (e.g.,
"reversedns").  Each of these is an object mapping keys of the discrete
decomposition to transformed values.  For example:

    {
      "value": {
        "8.12.47.107": 57
      },
      "transformations": {
        "reversedns": {
          "8.12.47.107": [ "joyent.com" ]
        }
      },
      "start_time": 1308863799,
      "duration": 1,
      "nsources": 1,
      "minreporting": 1,
      "requested_start_time": 1308863799,
      "requested_duration": 1,
      "requested_end_time": 1308863800
    }

Transformations are always performed asynchronously and the results cached
internally for future requests.  So the first time you request a transformation
like "reversedns", you may see no values transformed at all.  As you retrieve
the value again, the system will have completed the reverse-DNS lookup for
addresses in the data and they will be included in the returned value.



