Title: GetMachineTag (GET /:login/machines/:id/tags/:tag)
---
Text:

Returns the value for a single tag on this machine.

Note that this API is "special", as it returns content in `text/plain`; this
also means you must set the `Accept` header to `text/plain`.

### Inputs

* None

### Returns

Returns the value of `:tag` in plain text.

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login`, `:id` or `:tag` does not exist||

### CLI Command

    $ sdc-getmachinetag --tag=foo 5e42cd1e-34bb-402f-8796-bf5a2cae47db

### Example Request

    GET /my/machines/5e42cd1e-34bb-402f-8796-bf5a2cae47db/tags/foo HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: text/plain
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
    Content-Type: text/plain
    Content-MD5: qKVbfrhXVqh7Oni6Pub9Pw==
    Content-Length: 3

    bar

