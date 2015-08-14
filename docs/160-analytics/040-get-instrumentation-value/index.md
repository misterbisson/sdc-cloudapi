Title: GetInstrumentationValue (GET /:login/analytics/instrumentations/:id/value/raw)
--- 
Text:

Retrieves the data associated with an instrumentation for point(s) in time.

### Inputs

* None

### Returns

||**Field**||**Type**||
||value||Object||
||transformations||Object||
||start_time||Number||
||duration||Number||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI

    $ sdc-getinstrumentation --value 1

### Example Request

    GET /my/analytics/instrumentations/1/value/raw
    Host: api.example.com
    Authorization: ...
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
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


