Title: DescribeAnalytics (GET /:login/analytics)
---
Text:

Supports retrieving the "schema" for instrumentations which can be created using
the analytics endpoint.

### Inputs

* None

### Returns

A large object that reflects the analytics available to you.

Each of the items listed below is an object; the keys in each are what can be
used. For example, in 'modules', you'll get something like:

    {
      "modules": {
        "cpu": { "label": "CPU" },
        "memory": { "label": "Memory" },
        ...
      },
      "fields": {
        "hostname": {
          "label": "server hostname",
          "type": "string"
        },
        "runtime": {
          "label": "time on CPU",
          "type": "time"
        },
        "zonename": {
          "label": "zone name",
          "type": "string"
        }
      },
      "types": {
        "string": {
          "arity": "discrete",
          "unit": ""
        },
        "size": {
          "arity": "numeric",
          "unit": "bytes",
          "abbr": "B",
          "base": 2,
        },
        "time": {
          "arity": "numeric",
          "unit": "seconds",
          "abbr": "s",
          "base": 10,
          "power": -9,
        }
      },
      "metrics": [ {
        "module": "cpu",
        "stat": "thread_executions",
        "label": "thread executions",
        "interval": "interval",
        "fields": [ "hostname", "zonename", "runtime" ],
        "unit": "operations"
      }, {
        "module": "memory",
        "stat": "rss",
        "label": "resident set size",
        "interval": "point",
        "fields": [ "hostname", "zonename" ],
        "type": "size"
      } ],
      "transformations": {
        "geolocate": {
          "label": "geolocate IP addresses",
          "fields": [ "raddr" ]
        },
        "reversedns": {
          "label": "reverse dns IP addresses lookup",
          "fields": [ "raddr" ]
        }
      }
    }

You can use `cpu`, `memory` as module parameters to the other APIs.

||**Field**||**Type**||
||modules||Object||
||fields||Object||
||types||Object||
||metrics||Object||
||transformations||Object||

Each of these objects is discussed below:

#### Modules

Each metric is identified by both a `module` and `stat` name.  Modules exist
as namespaces to organize metrics.  A module configuration looks like this:

    "modules": {
      "cpu": {
        "label": "CPU" },
        "memory": { "label": "Memory" },
        ...
      }

Each module has a name (its key in the "modules" structure), and an object with
a single field called `label`, which is its human-readable label.

#### Metrics

Metrics describe quantities which can be measured by the system.  Data is not
collected for metrics unless an instrumentation has been configured for it.

    "metrics": [ {
      "module": "cpu",
      "stat": "thread_executions",
      "label": "thread executions",
      "interval": "interval",
      "fields": [ "hostname", "zonename", "runtime" ],
      "unit": "operations"
    }, {
      "module": "memory",
      "stat": "rss",
      "label": "resident set size",
      "interval": "point",
      "fields": [ "hostname", "zonename" ],
      "type": "size"
    } ]

Each metric has the following properties:

||**Field**||**Type**||**Description**||
||module||String||With stat, a unique metric identifier||
||stat||String||With module, a unique metric identifier||
||label||String||A human-readable metric description||
||interval||String||either "interval" or "point", indicating whether the value of this metric covers activity over an *interval* of time or a snapshot of state at a particular *point* in time||
||fields||Array||a list of fields to be used for predicates and decompositions||
||type||String||type or unit used to display labels for values of this metric||

#### Fields

Fields represent metadata by which data points can be filtered or decomposed.

    "fields": {
      "pid": {
        "label": "process identifier",
        "type": "string"
      },
      "execname": {
        "label": "application name",
        "type": "string"
      },
      "psargs": {
        "label": "process arguments",
        "type": "string"
      },
      ...

Each field has the following properties:

||**Field**||**Type**||**Description**||
||label||String||human-readable description of the field||
||type||String||type of the field, which determines how to label it, as well as whether the field is numeric or discrete||

Fields are either numeric or discrete based on the "arity" of their type.

###### Numeric fields

* In predicates, values of numeric fields can be compared using numeric equality
  and inequality operators (=, <, >, etc).
* In decompositions, a numeric field yields a numeric decomposition (see
  "Numeric decompositions" above).

###### Discrete fields

* In predicates, values of discrete fields can only be compared using string
  equality.
* In decompositions, a discrete field yields a discrete decomposition (see
  "Discrete decompositions" above).

Note that some fields look like numbers but are used by software as identifiers,
and so are actually discrete fields.  Examples include process identifiers,
which are numbers, but don't generally make sense comparing using inequalities
or decomposing to get a numeric distribution.

#### Types

Types are used with both metrics and fields for two purposes: to hint to clients
at how to best label values, and to distinguish between numeric and discrete
quantities.

    "types": {
      "string": {
        "arity": "discrete",
        "unit": ""
      },
      "size": {
        "arity": "numeric",
        "unit": "bytes",
        "abbr": "B",
        "base": 2,
      },
      "time": {
        "arity": "numeric",
        "unit": "seconds",
        "abbr": "s",
        "base": 10,
        "power": -9,
       }
     }

Each type has the following properties:

||**Field**||**Type**||**Description**||
||arity||String||indicates whether values of this type are "discrete" (e.g. identifiers and other strings), or "numeric" (e.g. measurements)||
||unit||String||base unit for this type||
||abbr||String||(optional) abbreviation for this base unit for this type||
||base||Number||indicates that when labeled, this quantity is usually labeled with SI prefixes corresponding to powers of the specified base||
||power||Number||this indicates that the raw values of this type are expressed in units corresponding to base raised to power||

#### Transformations

Transformations are post-processing functions that can be applied to data when
it's retrieved.

    "transformations": {
      "geolocate": {
        "label": "geolocate IP addresses",
        "fields": [ "raddr" ]
      },
      "reversedns": {
        "label": "reverse dns IP addresses lookup",
        "fields": [ "raddr" ]
      }
    }

Each transformation has the following properties:

||**Field**||**Type**||**Description**||
||label||String||Human-readable string||
||fields||Array||List of field names that can be transformed||

The above transformations transform values of the "raddr" (remote address) field
of any metric to either an object with geolocation details, or an array of
reverse-DNS hostnames, respectively.

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||

### CLI Command

    $ sdc-describeanalytics

### Example Request

    GET /my/analytics HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Server: SmartDataCenter
    Connection: close
    Date: Wed, 13 Apr 2011 23:40:30 GMT
    X-Api-Version: 7.0.0
    X-RequestId: 83BB32FC-1F65-4FEB-871E-BABCD96D588D
    X-Response-Time: 285
    Content-Type: application/json
    Content-Length: 2806
    Content-MD5: M4mXJlxSgflBnhXPYYCp1g==

    {
      "modules": {
        "cpu": {
          "label": "CPU"
        },
        "fs": {
          "label": "Filesystem"
        },
        "node": {
          "label": "Node.js 0.4.x"
        }
      },
      // ....
    }

