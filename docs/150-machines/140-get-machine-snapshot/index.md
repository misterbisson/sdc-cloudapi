Title: GetMachineSnapshot (GET /:login/machines/:id/snapshots/:name)
---
Text:


Gets the state of the named snapshot.

### Inputs

* None

### Returns

||name||String||The name of this snapshot||
||state||String||The current state of the snapshot (poll until it's "created")||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login`, `:id` or `:name` does not exist||

### CLI Command

    $ sdc-getmachinesnapshot --snapshot=just-booted 5e42cd1e-34bb-402f-8796-bf5a2cae47db

### Example Request

    GET /my/machines/5e42cd1e-34bb-402f-8796-bf5a2cae47db/snapshots/just-booted HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 0
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST, DELETE
    Connection: close
    X-Api-Version: 7.0.0
    Date: Tue, 05 Jul 2011 17:26:56 GMT
    Server: SmartDataCenter
    X-Request-Id: af79d9cd-68c5-4002-95c6-af4c3ff0f1e4
    X-Response-Time: 297
    Content-Type: application/json
    Content-MD5: VoPeS9cac4YMBIs8gUkd/A==
    Content-Length: 117

    {
      "name": "just-booted",
      "state": "queued",
      "created": "2011-07-05T17:19:26+00:00",
      "updated": "2011-07-05T17:19:26+00:00"
    }


