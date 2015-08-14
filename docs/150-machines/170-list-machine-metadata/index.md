Title: ListMachineMetadata (GET /:login/machines/:id/metadata)
---
Text:

Returns the complete set of metadata associated with this machine.

### Inputs

||**Field**||**Type**||**Description**||
||credentials||Boolean||Whether or not to return machine credentials. Defaults to false.||

### Returns

Returns the current metadata object

||**Field**||**Type**||**Description**||
||$name||Object||Your metadata||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

    $ sdc-listmachinemetadata cf055959-d776-482e-bd71-ca510a04bdd7

### Example Request

    GET /my/machines/cf055959-d776-482e-bd71-ca510a04bdd7/metadata?credentials=true HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 Ok
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
      "foo": "bar",
      "group": "test",
      "credentials": {
        "root": "s8v9kuht5e",
        "admin": "mf4bteqhpy"
      }
    }

