Title: CreateInstrumentation (POST /:login/analytics/instrumentations)
---
Text:


Creates an instrumentation.  Note you can clone an existing instrumentation
by passing in the parameter `clone`, which should be a numeric id of an
existing instrumentation.

### Inputs

||**Field**||**Type**||**Description**||
||clone||Number||An existing instrumentation to duplicate (optional)||
||module||String||The CA module||
||stat||String||The CA stat||
||predicate||String||Must be a JSON string||
||decomposition||String||An array of arrays||
||granularity||Number||Number of seconds between data points (default is 1)||
||retention-time||Number||How long to keep this instrumentation's data for||
||persist-data||Boolean||Whether or not to store this for historical analysis||
||idle-max||Number||Number of seconds after which, if the instrumentation or its data has not been accessed via the API, the service may delete the instrumentation and its data||

### Returns

||**Field**||**Type**||
||module||String||
||stat||String||
||predicate||String||
||decomposition||Array||
||value-dimension||Number||
||value-arity||String||
||retention-time||Number||
||granularity||Number||
||idle-max||Number||
||transformations||Array||
||persist-data||Boolean||
||crtime||Number||
||value-scope||String||
||id||String||
||uris||Array||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||
||InvalidArgument||If input values were incorrect||
||MissingParameter||If parameter values were missing||

### CLI

    $ sdc-createinstrumentation --module=syscall --stat=syscalls

### Example Request

    POST /my/analytics/instrumentations HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0
    Content-Length: 12
    Content-Type: application/x-www-form-urlencoded

    module=syscall&stat=syscalls

### Example Response

    HTTP/1.1 201 Created
    Location: https://api.example.com/my/analytics/instrumentations/2
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Server: SmartDataCenter
    Connection: close
    Date: Wed, 13 Apr 2011 23:43:24 GMT
    X-Api-Version: 7.0.0
    X-RequestId: F4238406-ED7D-4938-937B-4E3D0F93D924
    X-Response-Time: 1508
    Content-Type: application/json
    Content-Length: 544
    Content-MD5: CrcS3CTR5mwpOvJEx60s1g==

    {
      "module": "syscall",
      "stat": "syscalls",
      "predicate": {},
      "decomposition": [],
      "value-dimension": 1,
      "value-arity": "scalar",
      "enabled": true,
      "retention-time": 600,
      "idle-max": 3600,
      "transformations": {},
      "nsources": 1,
      "granularity": 1,
      "persist-data": false,
      "crtime": 1309374801692,
      "value-scope": "interval",
      "id": "2",
      "uris": [
        {
          "uri": "/mark/analytics/instrumentations/2/value/raw",
          "name": "value_raw"
        }
      ]
    }


