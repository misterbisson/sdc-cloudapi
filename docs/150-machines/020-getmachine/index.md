Title: GetMachine (GET /:login/machines/:id)
---
Text:

Gets the details for an individual machine.

### Inputs

* None

### Returns

||id||String||Unique identifier for this machine||
||name||String||The "friendly" name for this machine||
||type||String||The type of machine (virtualmachine or smartmachine)||
||state||String||The current state of this machine (e.g. running)||
||dataset||URN||The dataset urn this machine was provisioned with (for new images without a URN, this value will be the image id)||
||memory||Number||The amount of RAM this machine has (in MiB)||
||disk||Number||The amount of disk this machine has (in MiB)||
||ips||Array[String]||The IP addresses this machine has||
||metadata||Object[String => String]||Any additional metadata this machine has||
||created||Date (ISO8601)||When this machine was created||
||updated||Date (ISO8601)||When this machine was last updated||
||package||String||The id or name of the package used to create this machine||
||image||String||The image id this machine was provisioned with||
||credentials||Boolean||Whether to include the generated credentials for machines, if present. Defaults to false.||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

Get the details for the machine with id 75cfe125-a5ce-49e8-82ac-09aa31ffdf26:

    $ sdc-getmachine 75cfe125-a5ce-49e8-82ac-09aa31ffdf26

### Example Request

    GET /my/machines/75cfe125-a5ce-49e8-82ac-09aa31ffdf26 HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST, DELETE
    Server: SmartDataCenter
    Connection: close
    Date: Tue, 28 Jun 2011 23:14:34 GMT
    X-Api-Version: 7.0.0
    X-RequestId: 4A8C4694-03C3-484D-80E0-ACBA9FEE6C7C
    X-Response-Time: 174
    Content-Type: application/json
    Content-Length: 261
    Content-MD5: oDccU7ZWZrOkdl/pGZ4oNA==

    {
      "id": "75cfe125-a5ce-49e8-82ac-09aa31ffdf26",
      "name": "getting-started",
      "type": "smartmachine",
      "state": "running",
      "dataset": "sdc:sdc:smartos:1.3.15",
      "image": "01b2c898-945f-11e1-a523-af1afbe22822",
      "ips": [
        "10.88.88.51"
      ],
      "memory": 128,
      "disk": 5120,
      "metadata": {},
      "created": "2011-06-27T23:50:49+00:00",
      "updated": "2011-06-28T00:09:37+00:00"
    }

