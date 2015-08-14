Title: StartMachine (POST /:login/machines/:id?action=start)
---
Text:

Allows you to boot up a machine.  POST to the machine name with an `action` of
`start`.

You can poll on [GetMachine](#GetMachine) until the state is `running`.

### Inputs

||action||String||Use the exact string "start"||

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||
||InvalidState||The machine is in the wrong state to be started||
||InvalidArgument||If `action` was invalid||
||MissingParameter||If `action` wasn't provided||

### CLI Command

    $ sdc-startmachine 75cfe125-a5ce-49e8-82ac-09aa31ffdf26

### Example Request

    POST /my/machines/75cfe125-a5ce-49e8-82ac-09aa31ffdf26 HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 12
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

    action=start

### Example Response

    HTTP/1.1 202 Accepted
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST, DELETE
    Server: SmartDataCenter
    Connection: close
    Date: Wed, 13 Apr 2011 23:35:25 GMT
    X-Api-Version: 7.0.0
    X-RequestId: F09F3674-2151-434B-9911-29DD188057F0
    X-Response-Time: 115
    Content-Length: 0

