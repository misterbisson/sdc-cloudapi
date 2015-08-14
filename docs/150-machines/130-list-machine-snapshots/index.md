Title: ListMachineSnapshots (GET /:login/machines/:id/snapshots)
---
Text:

Lists all snapshots taken for a given machine.  There are no filtration
parameters for this API.

### Inputs

* None

### Returns

An array of snapshots:

||name||String||The name of this snapshot||
||state||String||The current state of the snapshot||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

    $ sdc-listmachinesnapshots 5e42cd1e-34bb-402f-8796-bf5a2cae47db

### Example Request

    GET /my/machines/5e42cd1e-34bb-402f-8796-bf5a2cae47db/snapshots HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 0
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 Ok
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Connection: close
    X-Api-Version: 7.0.0
    Date: Tue, 05 Jul 2011 17:19:26 GMT
    Server: SmartDataCenter
    X-Request-Id: 06a57272-9238-4276-951b-4123fbfdb948
    X-Response-Time: 66
    Content-Type: application/json
    Content-MD5: UYdtqgRjRZVikfCM5Uf4XQ==
    Content-Length: 119

    [
      {
        "name": "just-booted",
        "state": "queued",
        "created": "2011-07-05T17:19:26+00:00",
        "updated": "2011-07-05T17:19:26+00:00"
      }
    ]

