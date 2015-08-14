Title: ResizeMachine (POST /:login/machines/:id?action=resize)
--- 
Text:

Resize a machine to a new [package](#packages) (a.k.a. instance type).

**Note:** Resizing is only supported for SmartMachines (machines with
`type=smartmachine`, also known as 'zones').  KVM virtual machines
(`type=virtualmachine`) cannot be resized.

### Inputs

||action||String||Use the exact string "resize"||
||package||String||A package id, as returned from [ListPackages](#ListPackages)||

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||
||InvalidState||The machine is in the wrong state to be resized||
||InvalidArgument||If `action` was invalid, or `package` wasn't a valid id or name||
||MissingParameter||If `action` or `package` wasn't provided||

### CLI Command

    $ sdc-resizemachine --package=4dad8aa6-2c7c-e20a-be26-c7f4f1925a9a 75cfe125-a5ce-49e8-82ac-09aa31ffdf26

### Example Request

    POST /my/machines/75cfe125-a5ce-49e8-82ac-09aa31ffdf26 HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 12
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

    action=resize&package=4dad8aa6-2c7c-e20a-be26-c7f4f1925a9a

### Example Response

    HTTP/1.1 202 Accepted
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST, DELETE
    Connection: close
    x-api-version: 7.0.0
    Date: Sat, 11 Jun 2011 18:31:14 GMT
    Server: SmartDataCenter
    x-request-id: 3974ead1-0f1d-49ed-974c-1abfd13d6087
    x-response-time: 161
    Content-Length: 0

