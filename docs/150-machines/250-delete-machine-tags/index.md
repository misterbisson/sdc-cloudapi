Title: DeleteMachineTags (DELETE /:login/machines/:id/tags)
---
Text:

Deletes all tags from a machine.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

    $ sdc-deletemachinetag --tag='*'' 5e42cd1e-34bb-402f-8796-bf5a2cae47db

If you're running in a Unix-like environment, you may need to quote the wildcard
to keep the shell from matching files in the current directory.

### Example Request

    DELETE /my/machines/5e42cd1e-34bb-402f-8796-bf5a2cae47db/tags HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: text/plain
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 204 No Content
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST, DELETE
    Connection: close
    X-Api-Version: 7.0.0
    Date: Tue, 05 Jul 2011 17:19:26 GMT
    Server: SmartDataCenter
    X-Request-Id: 4bcf467e-4b88-4ab4-b7ab-65fad7464de9
    X-Response-Time: 754
    Content-Length: 0

