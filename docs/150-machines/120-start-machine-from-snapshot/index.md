Title: StartMachineFromSnapshot (POST /:login/machines/:id/snapshots/:name)
---
Text:


If a machine is in the 'stopped' state, you can choose to start the machine from
the referenced snapshot. This is effectively a means to roll back machine state.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login`, `:id` or `:name` does not exist||

### CLI Command

    $ sdc-startmachinefromsnapshot --snapshot=just-booted 5e42cd1e-34bb-402f-8796-bf5a2cae47db

### Example Request

    POST /my/machines/5e42cd1e-34bb-402f-8796-bf5a2cae47db/snapshots/just-booted HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 0
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 202 Accepted
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST, DELETE
    Connection: close
    X-Api-Version: 7.0.0
    Date: Tue, 05 Jul 2011 17:26:56 GMT
    Server: SmartDataCenter
    X-Request-Id: af79d9cd-68c5-4002-95c6-af4c3ff0f1e4
    X-Response-Time: 297
    Content-Length: 0

