Title: DisableMachineFirewall (POST /:login/machines/:id?action=disable_firewall)
---
Text:

Allows you to completely disable firewall for a machine.

### Inputs

||action||String||Use the exact string "disable_firewall"||

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||
||InvalidState||The machine is the wrong state to disable firewall||
||InvalidArgument||If `action` was invalid||
||MissingParameter||If `action` wasn't provided||

### CLI Command

    $ sdc-disablemachinefirewall 75cfe125-a5ce-49e8-82ac-09aa31ffdf26

### Example Request

    POST /my/machines/75cfe125-a5ce-49e8-82ac-09aa31ffdf26 HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 12
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

    action=disable_firewall

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

