Title: RemoveNic (POST /:login/machines/:id/nics/:mac)
---
Text:

Removes a NIC on a machine belonging to a given account.

Like [AddNic](#AddNic) above, the NIC won't be removed from the machine
immediately. After the NIC is removed, it will start returning 404 through
CloudAPI.

*WARNING*: this causes the machine to reboot while removing the NIC.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login`, `:id` or `:mac` does not exist||
||InvalidArgument||If `:id` isn't a UUID||

### CLI

    $ sdc-nics delete 90:b8:d0:2f:b8:f9 76a533e9-aa3c-4fd4-a194-03fa05663e0e

#### Example Request

    DELETE /my/machine/76a533e9-aa3c-4fd4-a194-03fa05663e0e/nics/90b8d02fb8f9 HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    accept-version: ~7.1
    host: api.example.com
    connection: keep-alive

#### Example Response

    HTTP/1.1 204 No Content
    content-type: application/json
    content-length: 0
    date: Sat, 03 May 2014 13:37:36 GMT
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET, HEAD, DELETE
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    server: Joyent SmartDataCenter 7.1.1
    api-version: 7.2.0
    request-id: 6b8c5170-d45a-11e3-8db6-c7649670227d
    response-time: 183
    x-resource-count: 1
    x-request-id: 6b8c5170-d45a-11e3-8db6-c7649670227d
    x-api-version: 7.2.0
    x-response-time: 183

