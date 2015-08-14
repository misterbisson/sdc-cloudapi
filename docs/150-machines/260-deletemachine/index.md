Title: DeleteMachine (DELETE /:login/machines/:id)
--- 
Text:

Allows you to completely destroy a machine.  Machine must be in the `stopped`
state first.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||
||InvalidState||The machine is the wrong state to be deleted||

### CLI Command

    $ sdc-deletemachine 75cfe125-a5ce-49e8-82ac-09aa31ffdf26

### Example Request

    DELETE /my/machines/75cfe125-a5ce-49e8-82ac-09aa31ffdf26 HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

#### Example Response

    HTTP/1.1 204 No Content
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST, DELETE
    Server: SmartDataCenter
    Connection: close
    Date: Wed, 13 Apr 2011 23:38:03 GMT
    X-Api-Version: 7.0.0
    X-RequestId: 762C3F37-8ACA-4A49-AF10-84CEC8137B1D
    X-Response-Time: 72
    Content-Length: 0

