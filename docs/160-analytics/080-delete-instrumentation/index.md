Title: DeleteInstrumentation (DELETE /:login/analytics/instrumentations/:id)
---
Text: 

Destroys an instrumentation.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI

    $ sdc-deleteinstrumentation 1

#### Example Request

    DELETE /my/analytics/instrumentations/1 HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

#### Example Response

    HTTP/1.1 204 No Content
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, DELETE
    Server: SmartDataCenter
    Connection: close
    Date: Wed, 13 Apr 2011 23:56:29 GMT
    X-Api-Version: 7.0.0
    X-RequestId: E4DD448D-F491-4A88-9237-DAF6C4DC782C
    X-Response-Time: 49
    Content-Length: 0



