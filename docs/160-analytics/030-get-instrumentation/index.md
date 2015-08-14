Title: GetInstrumentation (GET /:login/analytics/instrumentations/:id)
---
Text:


Retrieves the configuration for an instrumentation.

### Inputs

* None

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
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI

    $ sdc-getinstrumentation 1

### Example Request

    GET /my/analytics/instrumentations/1 HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Location: /my/analytics/instrumentations/1
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, DELETE
    Server: SmartDataCenter
    Connection: close
    Date: Wed, 13 Apr 2011 23:53:29 GMT
    X-Api-Version: 7.0.0
    X-RequestId: E79B48A2-EC5B-475E-A473-1AF0053FCF4F
    X-Response-Time: 60
    Content-Type: application/json
    Content-Length: 530
    Content-MD5: kOuwnsK6U9yQY7MpN3lEvQ==

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
          "uri": "/my/analytics/instrumentations/2/value/raw",
          "name": "value_raw"
        }
      ]
    }

