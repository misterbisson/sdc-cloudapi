Title: RenameMachine (POST /:login/machines/:id?action=rename)
---
Text:

Allows you to rename a machine.  POST to the machine `id` with an action of
`rename`.  You must additionally include a new name for the machine.

### Inputs

||action||String||Use the exact string "rename"||
||name||String||The new "friendly" name for this machine||

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||
||InvalidState||The machine is in the wrong state to be stopped||
||InvalidArgument||If `action` was invalid, or `name` wasn't a valid name||
||MissingParameter||If `action` or `name` wasn't provided||

### CLI Command

    $ sdc-renamemachine --name=new_friendly_name 75cfe125-a5ce-49e8-82ac-09aa31ffdf26

### Example Request

    POST /my/machines/75cfe125-a5ce-49e8-82ac-09aa31ffdf26 HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 12
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

    action=rename&name=new_friendly_name

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

