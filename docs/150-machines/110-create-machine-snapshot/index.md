Title: CreateMachineSnapshot (POST /:login/machines/:id/snapshots)
—
Text:

Allows you to take a snapshot of a machine.  Once you have one or more
snapshots, you can boot the machine from a previous snapshot.

Snapshots are not usable with other machines; they are a point in time snapshot
of the current machine. Snapshots can also only be taken of  machines that are
of type 'smartmachine'.

Since SmartMachines use a copy-on-write filesystem, snapshots take up increasing
amounts of space as the filesystem changes over time. There is a limit to how
much space snapshots are allowed to take. Plan your snapshots accordingly.

You can poll on [GetMachineSnapshot](#GetMachineSnapshot) until the `state` is
`success`.

### Inputs

||name||String||The name to assign to the new snapshot||

### Returns

||name||String||The name of this snapshot||
||state||String||The current state of the snapshot||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||
||InvalidArgument||If `name` was invalid||

### CLI Command

    $ sdc-createmachinesnapshot --name=just-booted 5e42cd1e-34bb-402f-8796-bf5a2cae47db

### Example Request

    POST /my/machines/5e42cd1e-34bb-402f-8796-bf5a2cae47db/snapshots HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 12
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

    name=just-booted

### Example Response

    HTTP/1.1 201 Created
    Location: /mark/machines/5e42cd1e-34bb-402f-8796-bf5a2cae47db/snapshots/just-booted
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Connection: close
    X-Api-Version: 7.0.0
    Date: Tue, 05 Jul 2011 17:19:26 GMT
    Server: SmartDataCenter
    X-Request-Id: 4bcf467e-4b88-4ab4-b7ab-65fad7464de9
    X-Response-Time: 754
    Content-Type: application/json
    Content-MD5: qKVbfrhXVqh7Oni6Pub9Pw==
    Content-Length: 116

    {
      "name": "just-booted",
      "state": "queued",
      "created": "2011-07-05T17:19:26+00:00",
      "updated": "2011-07-05T17:19:26+00:00"
    }


