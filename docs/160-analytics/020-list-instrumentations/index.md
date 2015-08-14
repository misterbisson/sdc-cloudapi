Title: ListInstrumentations (GET /:login/analytics/instrumentations)
---
Text:

Retrieves all currently created instrumentations.

### Inputs

* None

### Returns

An array of instrumentations:

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

### CLI

    $ sdc-listinstrumentations

### Example Request

    GET /my/analytics/instrumentations HTTP/1.1
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
    Date: Wed, 13 Apr 2011 23:49:40 GMT
    X-Api-Version: 7.0.0
    X-RequestId: 99839114-1B59-4733-AC64-A93144CA7D8B
    X-Response-Time: 48
    Content-Type: application/json
    Content-Length: 1062
    Content-MD5: 8dSboZrGVMsaRYWGFbq88A==

    [
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
        "crtime": 1309457451143,
        "value-scope": "interval",
        "id": "42",
        "uris": [{
          "uri": "/admin/analytics/instrumentations/42/value/raw",
          "name": "value_raw"
        }]
      }
    }

