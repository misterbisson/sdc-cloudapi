Title: GetMachineMetadata (GET /:login/machines/:id/metadata/:key)
--- 
Text:

Returns a single metadata entry associated with this machine.

### Inputs

||**Field**||**Type**||**Description**||
||key||String||Name of metadata value to retrieve.||

### Returns

Returns metadata value as string.

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login`, `:id` or `:key` does not exist||

### CLI Command

    $ sdc-getmachinemetadata --metadataId=foo cf055959-d776-482e-bd71-ca510a04bdd7

### Example Request

    GET /my/machines/cf055959-d776-482e-bd71-ca510a04bdd7/metadata/foo HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 Ok
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Connection: close
    X-Api-Version: 7.2.0
    Date: Tue, 05 Jul 2014 17:19:26 GMT
    Server: SmartDataCenter
    X-Request-Id: 4bcf467e-4b88-4ab4-b7ab-65fad7464de9
    X-Response-Time: 754
    Content-Type: application/json
    Content-MD5: qKVbfrhXVqh7Oni6Pub9Pw==
    Content-Length: 4

    bar


